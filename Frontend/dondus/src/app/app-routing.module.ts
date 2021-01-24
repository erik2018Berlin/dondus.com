import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from "./pages/services/services.component";
import { AccountComponent } from "./pages/account/account.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

import { AuthGuard } from './_helpers';

const routes: Routes = [
  {path: 'services',component: ServicesComponent},
  {path: 'calendar',component: CalendarComponent, canActivate: [AuthGuard]},
  {path: 'account',component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  { path: '', pathMatch: 'full', redirectTo: '/services' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
