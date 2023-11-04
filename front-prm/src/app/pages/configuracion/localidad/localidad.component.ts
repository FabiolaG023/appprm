import { Component,  OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PredefinidosService } from 'src/app/services/predefinidos.service';
import { LanguageApp } from 'src/app/pages/language-datatable';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { identifierName } from '@angular/compiler';


/// BUSCAR UNA FORMA PARA PODER EDITAR LAS LOCALIDADES DESDE UN MODAL


@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styleUrls: ['./localidad.component.scss']
})
export class LocalidadComponent implements OnInit {

  localidad: any=[]
  localidadForm: FormGroup
  updateForm: FormGroup

  zonas: any=[]
  idData: any
  user: any =[]
  token: any = {} ;
  municipios:any
  list: any=[];

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private predefinido: PredefinidosService,){

    this.localidadForm = fb.group({
      nombre: (''),
      idmunicipio: (''),
      idzona: ('')
    })

    this.updateForm = fb.group({
      nombre: (''),
      idmunicipio: (''),
      idzona: ('')
    })

    }



  ngOnInit(): void {

    this.token = this.auth.getToken();
    let decodetoken: any = {};
    decodetoken = decode(this.token);


    this.predefinido.getMunicipiosXProvincia(decodetoken.idprovincia).subscribe((res:any)=>{ this.municipios = res})

    this.predefinido.allZona().subscribe((res:any)=>{this.zonas = res})

    this.predefinido.allLocalidad().subscribe((res:any)=>{this.localidad = res

    setTimeout(()=>{
      $('#datatableLocalidad').DataTable( {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 15, 10, 25],
      language: LanguageApp.spanish_datatables,
      autoWidth: true,
    } );}, 1);
  })

  }

  verificarElemento(elemento: any): boolean {
    for (let i = 0; i < this.localidad.length; i++) {
      const element = this.localidad[i].nombre;
      this.list.push(element)
    }

    return this.list.includes(elemento);
      }

    //-----ZONA----
    addLocalidad(){
      let data = this.localidadForm.value
       if(this.verificarElemento(data.nombre)==true ){
         Swal.fire({
           icon: 'warning',
           title: 'Localidad Existente!',
           text: 'No es posible agregar la Localidad,  ya existe!',
           showConfirmButton: false,
           timer: 3000
         })
       }else{
         this.predefinido.addLocalidad(this.localidadForm.value).subscribe((res:any)=>{
          this.predefinido.allLocalidad().subscribe((res:any)=>{this.localidad = res})
        })
       }
     }

   async  selectData(id: number){


      this.predefinido.readLocalidad(id).subscribe((res:any)=>{
        this.idData = res.id
        console.log(res)
        this.updateForm.patchValue({
          nombre: res['nombre'],
          idzona: res['idzona'].id,
          idmunicipio: res['idmunicipio'].id
        })
      })

     }

     updateData(id: number){
      this.predefinido.updateLocalidad(id, this.updateForm.value).subscribe(()=>{
        this.predefinido.allLocalidad().subscribe((res:any)=>{this.localidad = res})
      })
     }

     deleteData(id: number){
      Swal.fire({
        title: 'Esta seguro?',
        text: "No podrás revertir, al eleminar esta localidad!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Elimiar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.predefinido.deleteLocalidad(id).subscribe((res: any)=>{
            Swal.fire(
              'Eliminado!',
              'Esta localidad ha sido eliminado!',
              'success'
            )

            this.predefinido.allLocalidad().subscribe((res:any)=>{this.localidad = res})

          })

        }
      })

    }




}
