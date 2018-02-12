import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, Toast} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../providers/api/api";
import {LocalStorage} from "ngx-webstorage";
import {User} from "../../model/user/user.model";
import {HelloIonicPage} from "../hello-ionic/hello-ionic";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @LocalStorage() user: User;
  loginForm: FormGroup;
  toastRef: Toast = null;
  error = false;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private fb: FormBuilder,
              public api: ApiProvider) {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if (this.user !== null) {
      this.navCtrl.push(HelloIonicPage);
    }
  }

  login(): void {
    console.log('trying to login ...');
    console.log(this.loginForm.value);
    this.error = false;

    this.api.APIPost('login', this.loginForm.value).toPromise().then(
      val => {

        this.user = val;

        if (this.toastRef !== null) {
          this.toastRef.dismissAll();
        }

        this.navCtrl.push(HelloIonicPage);
      },
      error => {
        this.user = null;
        this.error = true;
        this.presentToastError(error.error.error);
      }
    );
  }

  presentToastError(message: string): void {
    this.toastRef = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'toast-error'
    });

    this.toastRef.onDidDismiss(() => {
      console.log('Dismissed toast');
      this.toastRef = null;
    });

    this.toastRef.present();
  }

}
