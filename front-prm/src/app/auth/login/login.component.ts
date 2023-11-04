import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


 loginForm: FormGroup;

  constructor( private fb: FormBuilder, private auth: AuthService, private router: Router){
    this.loginForm = fb.group({
      usuario: new FormControl(''),
      password: new FormControl('')
    })
  }



  login(){
 this.auth.login(this.loginForm.value).subscribe((res: any)=>{
  this.router.navigate(['/formulario-Coordinacion']);
   localStorage.setItem('access_token', res.access_token)
 })


  }



}
