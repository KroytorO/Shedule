/**
 * Created by Admin on 13.04.2018.
 */
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

import {Observable} from "rxjs/Observable";


@Injectable()
  export class UserService{
  private serverApi = environment.apiUrl;
    constructor(private http: HttpClient){}

  // Метод post для формы логин
  postUserDataByLogin(formData):Observable<any>{
    return this.http.post<any>(`${this.serverApi}/api/json/postUserDataByLogin`,formData)
  }

  // Метод post для формы регистрации
  postUserDataByRegistration(formDataReg):Observable<any>{
    return this.http.post<any>(`${this.serverApi}/api/json/postUserDataByRegistration`,formDataReg)
  }

  }
