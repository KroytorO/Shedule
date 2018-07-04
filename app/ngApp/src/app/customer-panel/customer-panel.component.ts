import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {FormControl, FormGroup} from "@angular/forms";
import {Eventsdb} from "../shared/models/events";
import {AppService} from "../services/app.service";

@Component({
  selector: 'app-customer-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.css'],
  providers:[AppService]
})
export class CustomerPanelComponent implements OnInit {



  eventsdb: Eventsdb [] =[];
  formEvent: FormGroup = new FormGroup({
    name: new FormControl(''),/**добавляем асинхронный валидатор checkForEmail отдельно*/
    data: new FormControl('',),
    time: new FormControl('')
  });


  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  editedEvents: Eventsdb;
  isNewRecord: boolean;
  flag: boolean;


  constructor(private router:Router,
              private cookieService: CookieService,private serv: AppService
  ) { }

  ngOnInit() {
  }

// загрузка событий
  loadEvents(){
    this.serv.getEvents().subscribe((evenDB: Eventsdb[]) => {
      this.eventsdb = evenDB;
      //console.log(evenDB);
    });
  }


  // добавление событий
  onSubmit() {
    const formEvents = this.formEvent.value;

    this.serv.addEvents(formEvents).subscribe((response) => {
      this.isNewRecord = true;
      this.loadEvents();

    });

  }

  // редактирование пользователя
  editEvents(event: Eventsdb) {
    this.editedEvents = event;
    //console.log(this.editedEvents);
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

  // сохраняем пользователя
  saveUser() {
    this.serv.updateEvents(this.editedEvents).subscribe(data => {
      this.loadEvents();
    });
    this.editedEvents = null;

  }

  // // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    // if (this.isNewRecord) {
    //   this.eventsdb.pop();
    //   this.isNewRecord = false;
    // }

    this.editedEvents = null;
  }

  //удаление событий
  deleteEvents(event: Eventsdb) {
    this.serv.deleteEvents(event).subscribe((data) => {
      this.loadEvents();
    });
  }

  onLogout(){
    //ЛОГИКА В СЛУЧАЕ ЕСЛИ АДМИН ИЛИ ПОЛЬЗОВАТЕЛЬ
    this.router.navigateByUrl('/app');
    //Удаляем  куку,если он есть
    this.cookieService.deleteAll();
  }

}
