import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import {UserService} from "./shared/services/users.service";
import {AppService} from "./services/app.service";
import { CustomerPanelComponent } from './customer-panel/customer-panel.component';

//import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    CustomerPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    AppService,
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
