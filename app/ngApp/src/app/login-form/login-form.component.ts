import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../shared/services/users.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Message} from "../shared/models/message.models";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers:[UserService]
})
export class LoginFormComponent implements OnInit {
  cookieValue = 'default';

  /**Создаем переменую form и определяем её тип*/
  login_form: FormGroup;
message: Message;
  constructor(private userService:UserService,
              private router:Router,
              private cookieService: CookieService) {
  }
  /**Инцилизируем форму, т.е.указать как она связанна с шаблоном, какие поля есть в ней*/
  ngOnInit() {
    this.message = new Message('danger', '');
    /**Создаем форму*/
    this.login_form = new FormGroup({

      login_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[A-z0-9@.]*$/)]),/**добавляем асинхронный валидатор checkForEmail отдельно*/
      login_pass: new FormControl('', [Validators.required, Validators.minLength(5)])
      /**передаем наш валидатор this.checkForLength, добавляем this,поскольку данный метод присущ классу  LoginFormComponent */

    });
  }
//
  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    //Установим setTimeout чтобы информация об ошибки не висела постоянно
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  /**Обработчик события при нажатии на кнопку submit.
   *  Инцилизируем в шаблоне с помощью события (ngSubmit)="onSubmit()", передаем нашу функцию обработчик*/
  onSubmit() {
    const formData = this.login_form.value;

    /**post */
    this.userService.postUserDataByLogin(formData).subscribe((response)=>{
      //console.log(response);
      /**Проверка возвращаемого статуса*/
      if(response.error){
        // console.log('ОШИБКА ');
        this.showMessage('Не корректно указан логин или пароль');
      }

      /**Реддирект на страницу регистрации. Не забываем импортировать модуль Router и добавить в конструктор,т.е.  private router:Router*/
      else if(response.status)
      {

        //Задаём  пользователю куку,если он есть
        this.cookieService.set('data',JSON.stringify(response.data));
        // this.cookieValue = this.cookieService.get('data');
        //ЛОГИКА В СЛУЧАЕ ЕСЛИ АДМИН ИЛИ ПОЛЬЗОВАТЕЛЬ

          this.router.navigateByUrl('/app/customer_panel');


      }
     // console.log('i formdata login'+' '+  formData.status);
    })

  }


}
