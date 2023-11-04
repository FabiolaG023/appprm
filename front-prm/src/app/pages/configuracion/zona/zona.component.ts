import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { PredefinidosService } from 'src/app/services/predefinidos.service';
import { LanguageApp } from 'src/app/pages/language-datatable';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.scss']
})
export class ZonaComponent implements OnInit {

  zonas: any=[]
  idData: any
  zonaForm: FormGroup
  updateForm: FormGroup

  zonasAbc: any
  listZonaCreate: any=[]
  user: any =[]
  token: any = {} ;
  municipios:any

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private predefinido: PredefinidosService,){

    this.zonaForm = fb.group({
      zona: (''),
      idmunicipio: ('')
    })

    this.updateForm = fb.group({
      zona: (''),
      idmunicipio: ('')
    })


    }



  ngOnInit(): void {
    this.token = this.auth.getToken();
    let decodetoken: any = {};
    decodetoken = decode(this.token);

    this.auth.getUserProfile(decodetoken.id).subscribe((res: any)=>{this.user = res})
    this.predefinido.allabc().subscribe((res:any)=>{this.zonasAbc = res})
    this.predefinido.getMunicipiosXProvincia(decodetoken.idprovincia).subscribe((res:any)=>{ this.municipios = res})



  this.predefinido.allZona().subscribe((res:any)=>{this.zonas = res

      setTimeout(()=>{
        $('#datatableZonas').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu : [5, 15, 10, 25],
        language: LanguageApp.spanish_datatables,
        autoWidth: true,

      } );}, 1);

  })

  }
  verificarElemento(elemento: any): boolean {
    for (let i = 0; i < this.zonas.length; i++) {
      const element = this.zonas[i].zona;
      this.listZonaCreate.push(element)
    }

    return this.listZonaCreate.includes(elemento);
      }

    addZona(){
      let zonaName = this.zonaForm.value
       if(this.verificarElemento(zonaName.zona)==true ){
         Swal.fire({
           icon: 'warning',
           title: 'Zona Existente!',
           text: 'No es posible agregar la Zona,  ya existe!',
           showConfirmButton: false,
           timer: 3000
         })
       }else{
         this.predefinido.addZona(this.zonaForm.value).subscribe((res:any)=>{
          this.predefinido.allZona().subscribe((res:any)=>{this.zonas = res})
        })
       }
     }



     selectData(id: number){

      this.predefinido.readZona(id).subscribe((res:any)=>{
        this.idData = res.id
        this.updateForm.patchValue({
          zona: res['zona'],
          idmunicipio: res['idmunicipio'].id
        })
      })

     }

     updateData(id: number){
      this.predefinido.updateZona(id, this.updateForm.value).subscribe(()=>{
        this.predefinido.allZona().subscribe((res:any)=>{this.zonas = res})
      })
     }

     deleteData(id: number){
      Swal.fire({
        title: 'Esta seguro?',
        text: "No podrás revertir, al eleminar esta zona!",
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
              'Esta zona ha sido eliminado!',
              'success'
            )

          this.predefinido.allZona().subscribe((res:any)=>{this.zonas= res})

          })

        }
      })

    }




}
