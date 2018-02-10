import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CONFIG} from "../../config/config";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  APIGet(table: string, input?: any): Observable<any>{
    let route: string = `${CONFIG.api_url}/${table}`;
    return this.http.get(route);
  }

  APIPost(table: string, input?: any): Observable<any>{
    let route: string = `${CONFIG.api_url}/${table}`;

    return this.http.post(route, input || null);
  }

}
