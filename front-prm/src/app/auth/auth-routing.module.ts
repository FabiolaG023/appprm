import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { SingupComponent } from './singup/singup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'singup', component: SingupComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
