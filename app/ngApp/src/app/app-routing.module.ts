import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomePageComponent} from "./home-page/home-page.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import {CustomerPanelComponent} from "./customer-panel/customer-panel.component";



  let defaultRoot = 'app';

const routes: Routes = [
  {path: defaultRoot + '', component: HomePageComponent},
  {path:defaultRoot + '/login-form', component:LoginFormComponent },
  {path:defaultRoot + '/registration-form', component:RegistrationFormComponent },
  {path:defaultRoot + '/customer_panel', component:CustomerPanelComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
