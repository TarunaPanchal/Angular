import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard'
import { from } from 'rxjs';
import { AuthService } from './auth.service';
import {UserService } from './user.service';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component'
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/reducers';

  @NgModule({
    declarations: [
      AppComponent,
      LoginComponent,      
      HomeComponent,
      LogoutComponent,
      DashboardComponent,
      RegisterComponent,
      HeaderComponent
    ],
    imports: [
      BrowserModule,
      HttpClientModule,
      StoreModule.forRoot( reducers , {}),
      RouterModule.forRoot([
      
        {
          path:'login',
          component: LoginComponent
        },
        {
          path:'logout',
          component: LogoutComponent          
        },
        {
          path:'dashboard',
          component: DashboardComponent,
          canActivate: [AuthGuard]
        },
        {
          path:'register',
          component: RegisterComponent
        },
        {
          path:'',
          component: HomeComponent
        }
      ])
    ],
    providers: [AuthService ,UserService,AuthGuard],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
