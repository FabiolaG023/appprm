import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LiderService } from 'src/app/services/lider.service';
import { PredefinidosService } from 'src/app/services/predefinidos.service';

import { JceapiService } from 'src/app/services/jceapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lider',
  templateUrl: './lider.component.html',
  styleUrls: ['./lider.component.scss']
})
export class LiderComponent implements OnInit {
dataLider: any

formLider: FormGroup;
updateForm: FormGroup
formJCE: FormGroup;
public fotoBase64: any;

cedula: any
foto: any = null
imageSrc: any;
imagenJCE: any


statusRes: any

imageUrl: string | ArrayBuffer | null = null;

selectedProvince: any;
// tomar informacion de jce para crear lider
isValid: any
dataJCE: any=[]
dataProvincia: any[]=[]
dataMunicipio: any
idMunicipio: any
idProvincia: any
list: any[]=[]
listCedula:any[]=[]
nombreMuni: any
nombreProv: any

provincias: any[]=[];
municipios: any[]=[];
candidaturas: any[]=[];

idMuni: any

constructor(
  private fb: FormBuilder,
   private router: Router,
   private jce: JceapiService,
   private liderService: LiderService,
   private predefinido: PredefinidosService,

   ){
  this.formLider = fb.group({
    nombre: (''),
    idcandidatura: (''),
    idprovincia: (''),
    idmunicipio:(''),
  })
  this.updateForm = fb.group({
    nombre: (''),
    idcandidatura: (''),
    idprovincia: (''),
    idmunicipio:(''),
  })

  this.formJCE = fb.group({
    idcandidatura: (''),

  })

}
//SUBIR FOTO DE LIDER EN BASE
// HACER QUE EL LIDER SEA UNICO

ngOnInit(): void {
  this.liderService.selectLider(1).subscribe((res:any)=>{
   // console.log(res)
    this.statusRes = res.status
    if (res.status == 302) {
      this.dataLider = res.data
    this.imageSrc = this.dataLider.foto
     this.selectData()
    }
    if (res.status == 404) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        text: 'Cree un Lider o Movimiento!',
        showConfirmButton: false,
        timer: 3000
      })
    }

  })
 this.predefinido.getProvincias().subscribe((res:any)=>{this.provincias = res})
  this.predefinido.getCandidatura().subscribe((res:any)=>{this.candidaturas = res})
}

 getMunicipiosXProvincia(){
 this.predefinido.getMunicipiosXProvincia(this.selectedProvince).subscribe((res:any)=>{this.municipios = res })
  }

   // Función para manejar la carga de la foto

   async getDataJCE(cedula: number){

    this.jce.getJCEData(cedula).subscribe((res: any)=>{
          this.dataJCE = res[0],
           this.idMunicipio = this.dataJCE.IdMunicipio;
           this.idProvincia = this.dataJCE.IdProvincia;
           this.isValid = this.dataJCE.existe
           if (this.isValid) {
            this.predefinido.getProvincia(this.idProvincia).subscribe((res:any)=>{this.nombreProv = res.descripcion})
            this.predefinido.getMunicipio(this.idMunicipio).subscribe((res:any)=>{this.nombreMuni = res.municipio})
            this.jce.getJCEPhoto(cedula).subscribe((res:any)=>{
              this.imagenJCE = 'data:image/png;base64,' +  res.Imagen
            });
           }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Esta Cedula: ${cedula} no es valida, ingrese otra!`,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload()
              }
            })
           }
          });
       }


    verificarCedula(elemento: any): boolean {
      for (let i = 0; i < this.list.length; i++) {
        const element = this.list[i].cedula;
        this.listCedula.push(element)
      }
      return this.listCedula.includes(elemento);
        }



   onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file: File | null = inputElement?.files ? inputElement.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        const base64String: string = reader.result?.toString() || '';
        this.fotoBase64 = base64String
      };
      reader.readAsDataURL(file);
    }
  }


addLider(){
   if (this.statusRes == 404) {

    let formData ={
      id: 1,
      foto: this.fotoBase64
    }
     formData = {...formData, ...this.formLider.value}

    this.liderService.addlider(formData).subscribe((res:any)=>{

      let tipo_Candidatura = res.idcandidatura

    if (tipo_Candidatura == 8) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${res.nombre}, fue creado como Movimiento`,
        showConfirmButton: false,
        timer: 1500
      })
    }

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${res.nombre}, fue creado como Lider`,
        showConfirmButton: false,
        timer: 1500
      })
    })
   }else{
    if (this.statusRes == 302) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        text: 'Ya existe un Lider o Movimiento!',
        showConfirmButton: false,
        timer: 3000
      })
    }
   }

 //  console.log(formData)

}

addLiderJCE(){
  let formData ={
    id: 1,
    idprovincia: this.dataJCE.IdProvincia ,
    idmunicipio: this.dataJCE.IdMunicipio,
    foto: this.imagenJCE
  }
   formData = {...formData, ...this.formJCE.value}

 this.liderService.addlider(formData).subscribe((res:any)=>{

  let tipo_Candidatura = res.idcandidatura

if (tipo_Candidatura == 8) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `${res.nombre}, fue creado como Movimiento`,
    showConfirmButton: false,
    timer: 1500
  })
}

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `${res.nombre}, fue creado como Lider`,
    showConfirmButton: false,
    timer: 1500
  })
 })
}

selectData(){
 this.liderService.selectLider(1).subscribe((res:any)=>{
  let resp = res.data
  this.predefinido.getMunicipiosXProvincia(resp['idprovincia'].id).subscribe((res:any)=>{this.municipios = res })
    this.updateForm.patchValue({
      nombre: resp['nombre'],
      idcandidatura: resp['idcandidatura'].id,
      idprovincia: resp['idprovincia'].id,
      idmunicipio: resp['idmunicipio'].id,
    })

  })
 }

 updateData(){
  let formData ={
    foto: this.fotoBase64
  }
   formData = {...formData, ...this.updateForm.value}
  // console.log(formData)
  this.liderService.updateLider(1,formData).subscribe(()=>{
    window.location.reload()
  })
 }







}
