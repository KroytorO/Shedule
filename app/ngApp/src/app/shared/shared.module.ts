import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports:[
    ReactiveFormsModule,
    FormsModule
  ],
  //'Экспортируем что-бы другие модули видели модуль шаред
  exports:[
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule{}
