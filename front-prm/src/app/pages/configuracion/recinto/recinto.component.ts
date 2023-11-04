import {  Component,  OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PredefinidosService } from 'src/app/services/predefinidos.service';
import { LanguageApp } from 'src/app/pages/language-datatable';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recinto',
  templateUrl: './recinto.component.html',
  styleUrls: ['./recinto.component.scss']
})
export class RecintoComponent implements OnInit {

 recintos: any=[]
 recintoForm: FormGroup
 updateForm: FormGroup
 idData: any

 list:any=[]



 constructor(
  private auth: AuthService,
  private fb: FormBuilder,
  private predefinido: PredefinidosService,){

  this.recintoForm = fb.group({
    recinto: (''),
    nombre: ('')
  })


  this.updateForm = fb.group({
    recinto: (''),
    nombre: ('')
  })





  }

  ngOnInit(): void {

    this.predefinido.allRecinto().subscribe((res:any)=>{
      this.recintos = res
      setTimeout(()=>{
        $('#datatableRecintos').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu : [5, 15, 10, 25],
        language: LanguageApp.spanish_datatables,
        autoWidth: true,

      } );}, 1);
    })

  }



  verificarElemento(elemento: any): boolean {
    for (let i = 0; i < this.recintos.length; i++) {
      const element = this.recintos[i].recinto;
      this.list.push(element)
    }

    return this.list.includes(elemento);
      }

      addRecinto(){
        let data = this.recintoForm.value
         if(this.verificarElemento(data.recinto)==true ){
           Swal.fire({
             icon: 'warning',
             title: 'Recinto Existente!',
             text: 'No es posible agregar el recinto,  ya existe!',
             showConfirmButton: false,
             timer: 3000
           })
         }else{
           this.predefinido.addRecinto(this.recintoForm.value).subscribe(()=>{
            this.predefinido.allRecinto().subscribe((res:any)=>{this.recintos = res})

          })
         }
       }


       selectData(id: number){
        this.predefinido.readRecinto(id).subscribe((res:any)=>{
          this.idData = res.id
          this.updateForm.patchValue({
            recinto: res['recinto'],
            nombre: res['nombre']
          })
        })
       }



     updateData(id: number){
      this.predefinido.updateRecinto(id, this.updateForm.value).subscribe(()=>{
        this.predefinido.allRecinto().subscribe((res:any)=>{this.recintos = res})
      })
     }

     deleteData(id: number){
      Swal.fire({
        title: 'Esta seguro?',
        text: "No podrás revertir, al eleminar este recinto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Elimiar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.predefinido.deleteZona(id).subscribe((res: any)=>{
            Swal.fire(
              'Eliminado!',
              'Este recinto ha sido eliminado!',
              'success'
            )

            this.predefinido.allRecinto().subscribe((res:any)=>{this.recintos = res})

          })

        }
      })

    }







}
