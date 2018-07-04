import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AppService} from "../services/app.service";

import {FormControl, FormGroup} from "@angular/forms";
import {Eventsdb} from "../shared/models/events";


// interface Eventsdb{
//   name: String,
//   data: String,
//   time:String,
//   id: String
// }

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers:[AppService]
})
export class HomePageComponent implements OnInit {

  eventsdb: Eventsdb [] =[];
  formEvent: FormGroup = new FormGroup({
    name: new FormControl(''),/**добавляем асинхронный валидатор checkForEmail отдельно*/
    data: new FormControl('',),
    time: new FormControl('')
  });


  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedEvents: Eventsdb;
  flag: boolean;


  constructor(private serv: AppService) {
  }

  ngOnInit() {

  }

// загрузка событий
  loadEvents(){
    this.serv.getEvents().subscribe((evenDB: Eventsdb[]) => {
      this.eventsdb = evenDB;
      //console.log(evenDB);
    });
  }


  // загружаем один из двух шаблонов
  loadTemplate(event: Eventsdb) {
    if (this.editedEvents  ) {
      this.flag = false;
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }





}
