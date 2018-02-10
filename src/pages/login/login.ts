import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FormBuilder, public api: ApiProvider) {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(): void {
    console.log('trying to login ...');
    console.log(this.loginForm.value);
    this.api.APIPost('login', this.loginForm.value).toPromise().then(
      val => {
        this.user = val;
        this.navCtrl.push(HelloIonicPage);
      },
      error => {
        this.user = null;
      }
    );
  }

}
