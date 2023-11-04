import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { PredefinidosService } from 'src/app/services/predefinidos.service';
import { LanguageApp } from 'src/app/pages/language-datatable';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-circunscripcion',
  templateUrl: './circunscripcion.component.html',
  styleUrls: ['./circunscripcion.component.scss']
})
export class CircunscripcionComponent implements OnInit {

  circuns: any=[]
  circunsForm: FormGroup
  updateForm: FormGroup
  idData: any

  list: any=[]
  user: any =[]
  token: any = {} ;
  municipios:any

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private predefinido: PredefinidosService,){

    this.circunsForm = fb.group({
      numero: (''),
      idmunicipio: ('')
    })

    this.updateForm = fb.group({
      numero: (''),
      idmunicipio: ('')
    })




    }



  ngOnInit(): void {

    this.token = this.auth.getToken();
    let decodetoken: any = {};
    decodetoken = decode(this.token);

    this.auth.getUserProfile(decodetoken.id).subscribe((res: any)=>{this.user = res})
    this.predefinido.getMunicipiosXProvincia(decodetoken.idprovincia).subscribe((res:any)=>{ this.municipios = res})
    this.predefinido.allCircuns().subscribe((res:any)=>{
      this.circuns = res
      setTimeout(()=>{
        $('#datatableCircuns').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu : [5, 15, 10, 25],
        language: LanguageApp.spanish_datatables,
        autoWidth: true,

      } );}, 1);
        })

  }

  verificarElemento(elemento: any): boolean {
    for (let i = 0; i < this.circuns.length; i++) {
      const element = this.circuns[i].numero;
      this.list.push(element)
    }

    return this.list.includes(elemento);
      }


    addCircuns(){
      let data = this.circunsForm.value
       if(this.verificarElemento(data.numero)==true ){
         Swal.fire({
           icon: 'warning',
           title: 'Circunscripcion Existente!',
           text: 'No es posible agregar la Circunscripcion,  ya existe!',
           showConfirmButton: false,
           timer: 3000
         })
       }else{
         this.predefinido.addCircuns(this.circunsForm.value).subscribe(()=>{
          this.predefinido.allCircuns().subscribe((res:any)=>{this.circuns = res})
        })
       }
     }



     selectData(id: number){
      this.predefinido.readCircuns(id).subscribe((res:any)=>{
        this.idData = res.id
        this.updateForm.patchValue({
          numero: res['numero'],
          idmunicipio: res['idmunicipio'].id
        })
      })

     }

     updateData(id: number){
      this.predefinido.updateCircuns(id, this.updateForm.value).subscribe(()=>{
        this.predefinido.allCircuns().subscribe((res:any)=>{this.circuns = res})
      })
     }

     deleteData(id: number){
      Swal.fire({
        title: 'Esta seguro?',
        text: "No podrás revertir, al eleminar esta Circunscripcion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Elimiar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.predefinido.deleteCircuns(id).subscribe((res: any)=>{
            Swal.fire(
              'Eliminado!',
              'Esta Circunscripcion ha sido eliminado!',
              'success'
            )

            this.predefinido.allCircuns().subscribe((res:any)=>{this.circuns = res})

          })

        }
      })

    }



}
