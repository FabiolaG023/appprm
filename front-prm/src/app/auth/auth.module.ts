import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';
import { UserService } from '../services/user.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SingupComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers:[UserService]
})
export class AuthModule { }
