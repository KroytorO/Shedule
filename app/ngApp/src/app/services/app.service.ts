/** Cвязан с файлом home-page.component.ts*/

import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from 'rxjs';
import {User} from "../shared/models/user.model";


@Injectable()
export class AppService {

  private url = environment.apiUrl;

  constructor (private http: HttpClient){}

  /**Любой методы http возращают Observable<any>  объект  или стрим. Зная это, необходимо добавить к методу возврат, т.е. return.
   * Тогда метод вернет getUsers вернет Observable<any>  объект*/
//Получения данных о товаре с БД

  getEvents(){
    //функция get принимает url,по которому мы долджны забрать наши данные
    return this.http.get(`${this.url}/events/mongodb/getEvents`)
  }


  // Метод post для добавления события
  addEvents(formEvents):Observable<any>{
    return this.http.post<any>(`${this.url}/api/json/addEvents`,formEvents)
  }

  updateEvents(event: any) {
    return this.http.post(`${this.url}/api/json/updateEvents`, event);
  }

  deleteEvents(event: any){
    return this.http.post(`${this.url}/api/json/deleteEvents`,event);
  }
}


