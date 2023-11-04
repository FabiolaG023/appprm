import { Component,  OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PredefinidosService } from 'src/app/services/predefinidos.service';
import { LanguageApp } from 'src/app/pages/language-datatable';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-colegio',
  templateUrl: './colegio.component.html',
  styleUrls: ['./colegio.component.scss']
})
export class ColegioComponent implements OnInit {

  colegios: any=[]
  colegiosForm: FormGroup
  updateForm: FormGroup
  idData: any

recintos: any=[]

  zonas: any=[]

  user: any =[]
  token: any = {} ;
  municipios:any
  list: any=[];

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private predefinido: PredefinidosService,){

    this.colegiosForm = fb.group({
      colegio: (''),
      idrecinto: ('')
    })

    this.updateForm = fb.group({
      colegio: (''),
      idrecinto: ('')
    })

    }



  ngOnInit(): void {

    this.token = this.auth.getToken();
    let decodetoken: any = {};
    decodetoken = decode(this.token);


    this.predefinido.getMunicipiosXProvincia(decodetoken.idprovincia).subscribe((res:any)=>{ this.municipios = res})



    this.predefinido.allRecinto().subscribe((res:any)=>{this.recintos = res})

    this.predefinido.allColegio().subscribe((res:any)=>{this.colegios = res

    setTimeout(()=>{
      $('#datatableColegio').DataTable( {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 15, 10, 25],
      language: LanguageApp.spanish_datatables,
      autoWidth: true,
    } );}, 1);
  })

  }



  verificarElemento(elemento: any): boolean {
    for (let i = 0; i < this.colegios.length; i++) {
      const element = this.colegios[i].colegio;
      this.list.push(element)
    }

    return this.list.includes(elemento);
      }

    //-----ZONA----
    addcolegios(){
      let data = this.colegiosForm.value
      console.log(data)
       if(this.verificarElemento(data.colegio)==true ){
         Swal.fire({
           icon: 'warning',
           title: 'colegios Existente!',
           text: 'No es posible agregar la colegios,  ya existe!',
           showConfirmButton: false,
           timer: 3000
         })
       }else{
        this.predefinido.addColegio(this.colegiosForm.value).subscribe((res:any)=>{
         this.predefinido.allColegio().subscribe((res:any)=>{this.colegios = res})
        })
       }
     }


     selectData(id: number){
      this.predefinido.readColegio(id).subscribe((res:any)=>{
        this.idData = res.id
        this.updateForm.patchValue({
          colegio: res['colegio'],
          idrecinto: res['idrecinto'].id
        })
      })

     }

     updateData(id: number){
      this.predefinido.updateColegio(id, this.updateForm.value).subscribe(()=>{
        this.predefinido.allColegio().subscribe((res:any)=>{this.colegios = res})
      })
     }

     deleteData(id: number){
      Swal.fire({
        title: 'Esta seguro?',
        text: "No podrás revertir, al eleminar este Colegio!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Elimiar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.predefinido.deleteColegio(id).subscribe((res: any)=>{
            Swal.fire(
              'Eliminado!',
              'Este Colegio ha sido eliminado!',
              'success'
            )

            this.predefinido.allColegio().subscribe((res:any)=>{this.colegios = res})

          })

        }
      })

    }



}
