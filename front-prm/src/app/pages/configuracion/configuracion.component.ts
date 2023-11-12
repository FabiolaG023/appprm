import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PredefinidosService } from 'src/app/services/predefinidos.service';

@Component({
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  configForm: FormGroup
  provincias: any[]=[]
  selectprovincia: any
  municipios: any[]=[]
  idprovincia: any


  constructor(
    private fb: FormBuilder,
    private predefinido: PredefinidosService
    ){
      this.configForm = this.fb.group({
       idprovincia: new FormControl(''),
       idmunicipio: new FormControl('')
      })
    }


    ngOnInit(): void {
   //   this.predefinido.getMunicipiosXProvincia(1).subscribe((res:any)=>{console.log(res)})

     this.predefinido.getProvincias().subscribe((res:any)=>{this.provincias = res})


   // this.predefinido.readConfig(1).subscribe((res:any)=>{console.log(res)})
    }


    getMunicipiosXProvincia(){
      this.predefinido.getProvincia(this.idprovincia).subscribe((res: any)=> {
        this.selectprovincia = res.descripcion,
        console.log(this.selectprovincia)
      })
      this.predefinido.getMunicipiosXProvincia(this.idprovincia).subscribe((res:any)=>{ this.municipios = res,   console.log(this.municipios)})

       }


    add(){
      //this.predefinido.getProvincias().subscribe((res:any)=>{this.provincias = res})
      console.log(this.configForm.value)
    // this.predefinido.addConfig(this.configForm.value).subscribe((res:any)=>{console.log(res)})
    }






}
