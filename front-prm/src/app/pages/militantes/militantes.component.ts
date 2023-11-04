import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoordMunicipalService } from 'src/app/services/coord-municipal.service';
import { JceapiService } from 'src/app/services/jceapi.service';
import Swal from 'sweetalert2';
import { LanguageApp } from '../language-datatable';
import { PredefinidosService } from 'src/app/services/predefinidos.service';
import { MilitantesService } from 'src/app/services/militantes.service';
import { CoordComiteService } from 'src/app/services/coord-comite.service';


@Component({
  selector: 'app-militantes',
  templateUrl: './militantes.component.html',
  styleUrls: ['./militantes.component.scss']
})
export class MilitantesComponent {

  data:any;

formCreate : FormGroup;
formCedula: FormGroup;
formEdit: FormGroup;

list: any[]=[]
listCedula: any[]=[]

listCoordComite: any[]=[]
listLocalidad: any[]=[]
listZonas: any[]=[]
listDist: any[]=[]


cedula: any

foto: any
dataM: any=[]

nombreMuni: any
nombreProv: any

imageSrc: any;

dataProvincia: any[]=[]
dataMunicipio: any
idMunicipio: any
idProvincia: any

isValid: any

dataJCE: any=[]
dataMili: any=[]





constructor(
  private service: MilitantesService,
  private coordComiteService: CoordComiteService,
  private jce: JceapiService,
  private fb: FormBuilder,
  private predefinido: PredefinidosService ){

    this.formCreate = this.fb.group({
      apodo: (''),
      telefono: (''),
      idcoordcomite: new FormControl(null, Validators.required),
      idzona:(''),
      idlocalidad:(''),
      iddistrito: (''),
      nombre: (''),
      apellido:(''),
      cedula:(''),

     })

     this.formCedula = this.fb.group({
      apodo: (''),
      telefono: (''),
      idcoordcomite: new FormControl(null, Validators.required),
      idzona:(''),
      idlocalidad:(''),
      iddistrito: (''),
     })



    this.formEdit = this.fb.group({
      apodo: (''),
      telefono: (''),
      idcoordcomite: (''),
      idzona:(''),
      idlocalidad:(''),
      iddistrito: (''),
      idcircunscripcion: (''),
      idcolegio: (''),
      idrecinto: ('')
    })



}

  ngOnInit(): void {
    //DISTRITOS
    this.predefinido.allDist().subscribe((res:any)=>{this.listDist = res})
    // COLEGIO

    //CIRCUNSCRIPCION
    //RECINTO

    //ZONAS
    this.predefinido.allZona().subscribe((res:any)=>{this.listZonas = res})

    this.coordComiteService.allCoordComite().subscribe((res:any)=>{this.listCoordComite = res})

    this.predefinido.allLocalidad().subscribe((res:any)=>{this.listLocalidad = res})
   this.service.allMilitantes().subscribe((res: any)=>{
    this.list = res;
    setTimeout(()=>{
  var   t=  $('#datatable').DataTable( {
        pagingType: 'full_numbers',
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
    // VERIFICA SI LA CEDULA EXISTE EN LA LISTA DE MILITANTES Y SI EXISTE EN EL API DE LA JCE
      if(this.verificarCedula(this.cedula)==true || this.isValid == false){
        Swal.fire({
          icon: 'warning',
          title: 'Militante Registrado',
          text: 'No es posible agregar, la cedula ya existe!',
          showConfirmButton: false,
          timer: 3000,
          didClose: () => {
            window.location.reload();
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

          /*

          idcolegio:(''),
          idrecinto:(''),
          idcircunscripcion:('')
      */
        }
      objDataJCE = {...objDataJCE, ...this.formCedula.value }
      this.service.addMilitantes(objDataJCE).subscribe(()=>{
        this.service.allMilitantes().subscribe((res: any)=>{ this.list = res})
      })
    }

  }

  addDataManual(){
// VERIFICA SI LA CEDULA EXISTE EN LA LISTA DE MILITANTES
    if(this.verificarCedula(this.cedula) == true){
      Swal.fire({
        icon: 'warning',
        title: 'Militante Registrado',
        text: 'No es posible agregar, la cedula ya existe!',
        showConfirmButton: false,
        timer: 3000,
        didClose: () => {
          window.location.reload();
        }
      })
    }else{
   //  console.log(this.formCreate.value)
    this.service.addMilitantes(this.formCreate.value).subscribe(()=>{
      this.service.allMilitantes().subscribe((res: any)=>{ this.list = res})
    })
  }
  }

  updateData(id: any){
    this.service.updateMilitantes(id, this.formEdit.value).subscribe((res:any)=> {
      window.location.reload()
    })
  }

  selecctData(id: any){
    this.service.readMilitantes(id).subscribe((res:any)=>{

     this.dataMili = res
     this.foto = res.foto
   //  console.log(this.foto)

      this.formEdit.patchValue({
        apodo: res['apodo'],
        telefono: res['telefono'],
        idcoordcomite: res['idcoordcomite'].id,
        idzona:res['idzona'].id,
        idlocalidad:res['idlocalidad'].id,
        iddistrito: res['iddistrito'].id,
        idcircunscripcion: res['idcircunscripcion'],
        idcolegio: res['idcolegio'],
        idrecinto: res['idrecinto']
      })
      // capta el informacion del militante
      this.dataM = res
    })
  }

deleteData(id: any){
  Swal.fire({
    title: 'Esta seguro?',
    text: "No podrás revertir, al eleminar este Militante!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Elimiar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.service.deleteMilitantes(id).subscribe((res: any)=>{
        Swal.fire(
          'Eliminado!',
          'Este Militante ha sido eliminado!',
          'success'
        )

        window.location.reload()

      })

    }
  })

}


}
