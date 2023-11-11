import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoordMunicipalService } from 'src/app/services/coord-municipal.service';
import { JceapiService } from 'src/app/services/jceapi.service';
import Swal from 'sweetalert2';
import { LanguageApp } from '../language-datatable';
import { PredefinidosService } from 'src/app/services/predefinidos.service';
import { map } from 'rxjs';





@Component({
  selector: 'app-coord-municipal',
  templateUrl: './coord-municipal.component.html',
  styleUrls: ['./coord-municipal.component.scss'],


})
export class CoordMunicipalComponent implements OnInit {

  data:any;

formCreate : FormGroup;
formEdit: FormGroup;

list: any[]=[]
listCedula:any[]=[]

cedula: any
apodo: any
foto: any
coordM: any=[]

nombreMuni: any
nombreProv: any

imageSrc: any;

dataProvincia: any[]=[]
dataMunicipio: any
idMunicipio: any
idProvincia: any
nameRecinto: any

isValid: any

dataJCE: any=[]
coordMuni: any=[]



provincias: any[]=[];
municipios: any[]=[];




constructor(
  private service: CoordMunicipalService,
  private jce: JceapiService,
  private fb: FormBuilder,
  private predefinido: PredefinidosService ){

    this.formEdit = this.fb.group({
      apodo: (''),
      telefono: (''),
    })

    // INPUTS EN MAYUSCULA

    this.formEdit.get('apodo')!.valueChanges.pipe(map((value: any)=> value.toUpperCase()))
    .subscribe((newValue: any)=>{  this.formEdit.get('apodo')!.setValue(newValue, { emitEvent: false });});


   this.formCreate = this.fb.group({
    apodo: new FormControl(''),
    telefono: new FormControl(''),
   })
    // INPUTS EN MAYUSCULA
    this.formCreate.get('apodo')!.valueChanges.pipe(map((value: any)=> value.toUpperCase()))
    .subscribe((newValue: any)=>{  this.formCreate.get('apodo')!.setValue(newValue, { emitEvent: false });});


}

  ngOnInit(): void {
  this.predefinido.getProvincias().subscribe((res:any)=>{this.provincias = res})
   this.service.allCoordMuni().subscribe((res: any)=>{
    this.list = res;
    setTimeout(()=>{
    var t=  $('#datatable').DataTable( {
        pagingType: 'full_numbers', //pagingType: 'numbers',
        pageLength: 15,
        processing: true,
        lengthMenu : [5, 15, 10, 25],
        language: LanguageApp.spanish_datatables,
        columnDefs: [ { searchable: false, orderable: false, targets: 0 }],
        order: [[1, 'asc']]
    } );
    t.on('order.dt search.dt', function () {
        let i = 1;
        t.cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {this.data(i++); });}).draw();
    }, 1);
  })
  }




 async getDataJCE(cedula: number){

  this.jce.getJCEData(cedula).subscribe((res: any)=>{
        this.dataJCE = res[0],
         this.idMunicipio = this.dataJCE.IdMunicipio;
         this.idProvincia = this.dataJCE.IdProvincia;
         this.nameRecinto = this.dataJCE.CodigoRecinto;

         this.isValid = this.dataJCE.existe
         if (this.isValid) {
          this.predefinido.getProvincia(this.idProvincia).subscribe((res:any)=>{this.nombreProv = res.descripcion})
          this.predefinido.getMunicipio(this.idMunicipio).subscribe((res:any)=>{this.nombreMuni = res.municipio})

          this.jce.getJCEPhoto(cedula).subscribe((res:any)=>{
            this.imageSrc = 'data:image/png;base64,' +  res.Imagen
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

  addData(){

    let data = this.dataJCE
      if(this.verificarCedula(this.cedula)==true || this.isValid == false){
        Swal.fire({
          icon: 'warning',
          title: 'Coordinador Municipal Registrado',
          text: 'No es posible agregar, la cedula ya existe!',
          showConfirmButton: false,
          timer: 3000,
          didClose: () => {
            // Esta función se ejecutará después de que se cierre el SweetAlert
            window.location.reload(); // Recarga la página
          }
        })
      }else{
        // FALTAN LAS CIRCUNSCRIPCIONES Y COLEGIOS
        let objDataJCE = {
          nombre: data.NombresPlastico ,
          apellido: data.ApellidosPlastico ,
          idprovincia: data.IdProvincia,
          idmunicipio: data.IdMunicipio ,
          cedula:  data.Cedula,
          idcircunscripcion: data.CodigoCircunscripcion,
          idrecinto: data.CodigoRecinto,
          idcolegio: data.colegio,
          foto: this.imageSrc,
        }
      // combinacion de los datos del api y los formulario
      objDataJCE = {...objDataJCE, ...this.formCreate.value }
      this.service.addCoordMuni(objDataJCE).subscribe(()=>{
        window.location.reload()
      })
    }

  }

  updateData(id: number){
    this.service.updateCoordMuni(id, this.formEdit.value).subscribe(()=> {
      window.location.reload()
    })
  }

  selecctData(id: number){
    this.service.getCoordMuni(id).subscribe((res:any)=>{
    console.log(res)
     this.coordMuni = res
     this.foto = res.foto

      this.formEdit.patchValue({
        apodo: res['apodo'],
        telefono: res['telefono'],
        idcircunscripcion: res['idcircunscripcion'],
        idcolegio: res['idcolegio'],
        idrecinto: res['idrecinto'].id,
        iddistrito: res['iddistrito']


      })
      this.coordM = res
    })
  }

deleteData(id: number){
  Swal.fire({
    title: 'Esta seguro?',
    text: "No podrás revertir, al eleminar este Coordinador Municipal!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Elimiar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.service.deleteCoordMuni(id).subscribe((res: any)=>{
       
        Swal.fire(
          'Eliminado!',
          'Este Coordinador Municipal ha sido eliminado!',
          'success'
        )

       window.location.reload()

      })

    }
  })

}


}
