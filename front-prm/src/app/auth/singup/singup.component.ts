import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LiderService } from 'src/app/services/lider.service';
import { PredefinidosService } from 'src/app/services/predefinidos.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {


  provincias: any[]=[];
  municipios: any[]=[];

  selectedProvince: number = 0;

 newform: FormGroup;

  constructor(
    private userServices: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private liderService: LiderService,
    private predefinido: PredefinidosService
    )
    {
     this.newform = fb.group({
      nombre: new FormControl ('', Validators.required),
      apellido:  new FormControl ('', Validators.required),
      usuario: new FormControl ('', Validators.required),
      password: new FormControl ('', Validators.required),
      role: new FormControl ('', Validators.required),
      idprovincia: new FormControl ('', Validators.required),
      idmunicipio: new FormControl ('', Validators.required)
     })
     // CONVERTIR EN MAYUSCULAS
     this.newform.get('nombre')!.valueChanges.pipe(map((value: any)=> value.toUpperCase()))
     .subscribe((newValue: any)=>{  this.newform.get('nombre')!.setValue(newValue, { emitEvent: false });});

     this.newform.get('apellido')!.valueChanges.pipe(map((value: any)=> value.toUpperCase()))
     .subscribe((newValue: any)=>{  this.newform.get('apellido')!.setValue(newValue, { emitEvent: false });});
    }

    ngOnInit(): void {

      this.predefinido.getProvincias().subscribe((res:any)=>{this.provincias = res})
     }

     getMunicipiosXProvincia(){
      this.predefinido.getMunicipiosXProvincia(this.selectedProvince).subscribe((res:any)=>{ this.municipios = res })
       }


    singup(){
    this.auth.singup(this.newform.value).subscribe((res: any)=>{
      console.log(res)
      this.router.navigate(['formulario-Coordinacion/inicio']);
    })
    }



}
