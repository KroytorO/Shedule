import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../shared/services/users.service";
import {Message} from "../shared/models/message.models";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  charsCount=5;
  constructor(private userService:UserService,
              private router:Router) { }
  /**Создаем переменую form и определяем её тип*/
  form: FormGroup;
  message: Message;
  /**Инцилизируем форму, т.е.указать как она связанна с шаблоном, какие поля есть в ней*/
  ngOnInit() {
    this.message = new Message('danger', '');
    /**Создаем форму*/
    this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),/**добавляем асинхронный валидатор checkForEmail отдельно*/
        pass: new FormControl('', [Validators.required, this.checkForLength.bind(this)]),
        passConf: new FormControl('', [Validators.required, this.checkForLength.bind(this)]),
        name: new FormControl('')
        /**передаем наш валидатор this.checkForLength, добавляем this,поскольку данный метод присущ классу  RegistrationFormComponent */
    });
  }

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
    const formDataReg = this.form.value;
    if (formDataReg.pass == formDataReg.passConf){
        formDataReg.status = 'customer';
        this.userService.postUserDataByRegistration(formDataReg).subscribe((response) => {
          // console.log(response);

          /**Проверка возвращаемого статуса*/
          if(response.error){
            // console.log('ОШИБКА ');
            this.showMessage('Пользователь с таким email-адресом, уже авторизован');
          }

          /**Реддирект на страницу регистрации. Не забываем импортировать модуль Router и добавить в конструктор,т.е.  private router:Router*/
          else if(response.status)
          {

            //Задаём  пользователю куку,если он есть
            // this.cookieService.set('data',JSON.stringify(response.data));
            // this.cookieValue = this.cookieService.get('login');
            //ЛОГИКА В СЛУЧАЕ ЕСЛИ АДМИН ИЛИ ПОЛЬЗОВАТЕЛЬ
            this.router.navigateByUrl('/app/login-form');

          }
          // console.log('i formdata login'+' '+  formDataReg.status);

        })
    }
    else{
      this.showMessage('Пароли не совпадают');
    }
    // console.log('i am formreg'+' '+ formDataReg.name);
    // console.log('Submited!', this.form);
  }

  /**Создание собственного валидатора*/
  /**метод checkForLength, принимает в себя некоторый контрол,который является типом FormControl*/
  /**метод checkForLength, должен возвращать либо ничего либо объект
   //{'errorCode':true}
   //null undefined
   */
  checkForLength(control: FormControl) {
    /**control.value.length -обращаемся к значению контрола, к текущей длине значению, которое находится в input*/
    if (control.value.length <=this.charsCount) {
      return {
        'lengthError': true
      };
    }
    return null;
  }

  /**THE END Создание собственного валидатора*/


  /**Создаем асинхронный валидатор*/
  /**Метод возвращает промисс*/
  checkForEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@mail.ru') {
          resolve({
            'emailIsUsed': true /**ключ emailIsUsed является кодом ошибки*/
          });
        } else {
          resolve(null);/**ничего не возвращаем если ошибки нет*/
        }
      }, 3000);
    });
  }

  /**The end Создаем асинхронный валидатор*/

}
