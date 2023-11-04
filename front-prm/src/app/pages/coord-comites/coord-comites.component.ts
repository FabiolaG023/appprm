
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoordComiteService } from 'src/app/services/coord-comite.service';
import { CoordMunicipalService } from 'src/app/services/coord-municipal.service';
import { JceapiService } from 'src/app/services/jceapi.service';
import { PredefinidosService } from 'src/app/services/predefinidos.service';
import { LanguageApp } from '../language-datatable';
import Swal from 'sweetalert2';
import { CoordZonaService } from 'src/app/services/coord-zona.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-coord-comites',
  templateUrl: './coord-comites.component.html',
  styleUrls: ['./coord-comites.component.scss']
})
export class CoordComitesComponent implements OnInit {



formCreate: FormGroup;
formEdit: FormGroup;

listCoordZona: any
listZonas: any[]=[]
list: any[]=[]
listCedula:any[]=[]
isValid: any
cedula: any

zonaXcoor: any

idCoordZ: any;

idMunicipio: any
idProvincia: any
imageSrc: any;
nombreMuni: any
nombreProv: any

dataJCE: any=[]

coordComite: any=[]
foto: any
coordC: any=[]

constructor(
  private service: CoordComiteService,
  private serviceCoordZona: CoordZonaService,
  private fb: FormBuilder,
  private jce: JceapiService,
  private predefinido: PredefinidosService
  ){


  this.formCreate = this.fb.group({
    telefono: (''),
    apodo: (''),
    idcoordzona: (''),
    idzona: (''),
   });
//GUARDA EL VALOR EN MAYUSCULA
   this.formCreate.get('apodo')!.valueChanges.pipe(map((value: any) => value.toUpperCase())
  ).subscribe((newValue: any) => {
    this.formCreate.get('apodo')!.setValue(newValue, { emitEvent: false });
  });

   this.formEdit = this.fb.group({
    telefono: (''),
    apodo: (''),
    idcoordzona: (''),
    idzona: ('')
   })

}

  ngOnInit(): void {
    this.serviceCoordZona.allCoordZona().subscribe((res:any)=>{ this.listCoordZona = res})

   this.service.allCoordComite().subscribe((res: any)=>{ this.list = res
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

  findZonas(){
    this.service.getCoordZonalXZonas(this.zonaXcoor).subscribe((res: any)=>{
      this.listZonas = res})

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



  addForm(){

    if(this.verificarCedula(this.cedula)==true || this.isValid == false){
      Swal.fire({
        icon: 'warning',
        title: 'Coordinador de Comité Registrado',
        text: 'No es posible agregar, la cedula ya existe!',
        showConfirmButton: false,
        timer: 3000,
        didClose: () => {
          window.location.reload();
        }
      })
    }else{

      let data = this.dataJCE


      let formData ={}

      formData ={
        nombre: data.NombresPlastico ,
        apellido: data.ApellidosPlastico ,
        cedula:  data.Cedula,
        foto: this.imageSrc,
      }

    formData = {...formData, ...this.formCreate.value}
   // console.log(formData)


  this.service.addCoordComite(formData).subscribe(()=>{
        window.location.reload()
    })
  }





  }


  updateData(id: any){
    this.service.updateCoordComite(id, this.formEdit.value).subscribe(()=> {
      window.location.reload()
    })
  }

  selecctData(id: any){
    this.service.getCoordComite(id).subscribe((res:any)=>{
     this.coordComite = res
    // console.log(res)
    this.service.getCoordZonalXZonas(res['idcoordzona'].id).subscribe((res: any)=>{this.listZonas = res})
     this.foto = res.foto
      this.formEdit.patchValue({
        apodo: res['apodo'],
        telefono: res['telefono'],
        idcoordzona: res['idcoordzona'].id,
        idzona: res['idzona'].id
      })
      this.coordC = res
    })
  }

  deleteData(id: any){
    Swal.fire({
      title: 'Esta seguro?',
      text: "No podrás revertir, al eleminar este Coordinador de Comite!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Elimiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCoordComite(id).subscribe(()=>{
          Swal.fire(
            'Eliminado!',
            'Este Coordinador de Comite ha sido eliminado!',
            'success'
          )

          window.location.reload()

        })

      }
    })

  }







}
