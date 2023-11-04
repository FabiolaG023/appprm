import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoordMunicipalService } from 'src/app/services/coord-municipal.service';
import { CoordZonaService } from 'src/app/services/coord-zona.service';
import { LanguageApp } from '../language-datatable';
import { PredefinidosService } from 'src/app/services/predefinidos.service';
import { JceapiService } from 'src/app/services/jceapi.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import decode from 'jwt-decode';
import { map } from 'rxjs';



@Component({
  selector: 'app-coord-zonales',
  templateUrl: './coord-zonales.component.html',
  styleUrls: ['./coord-zonales.component.scss']
})
export class CoordZonalesComponent implements OnInit {



  formCreate: FormGroup;
  formEdit: FormGroup;

  list: any[]=[]
  token: any = {} ;

  coordM: any=[]

 dataCoordZ: any={}

  cedula: any
  foto: any
  coordZ: any=[]
  imageSrc: any;
  dataJCE: any=[]
  isValid: any

  idMunicipio: any
  idProvincia: any
  nombreMuni: any
  nombreProv: any
  nameRecinto: any

  provincias: any;
  selectedProvince: any;
  municipios: any;

  listCedula:any[]=[]
  listCoordM:any[]=[]

  allZonas: any[]=[]

  coordZonal: any=[]



constructor(
  private service: CoordZonaService,
  private coordMuniService: CoordMunicipalService,
  private jce: JceapiService,
  private fb: FormBuilder,
  private predefinido: PredefinidosService,
  private auth: AuthService,
  )

  {
  this.formCreate = this.fb.group({
    apodo: new FormControl(''),
    telefono: new FormControl(''),
    idcoordmunicipal: new FormControl(null, Validators.required),
    idzona: new FormControl(null),

   })


    // INPUTS EN MAYUSCULA

    this.formCreate.get('apodo')!.valueChanges.pipe(map((value: any)=> value.toUpperCase()))
    .subscribe((newValue: any)=>{  this.formCreate.get('apodo')!.setValue(newValue, { emitEvent: false});});




   this.formEdit = this.fb.group({
    apodo:(''),
    telefono:(''),
    idcoordmunicipal:(null),
    idzona:(null),
   })


    // INPUTS EN MAYUSCULA

    this.formEdit.get('apodo')!.valueChanges.pipe(map((value: any)=> value.toUpperCase()))
    .subscribe((newValue: any)=>{  this.formEdit.get('apodo')!.setValue(newValue, { emitEvent: false });});



}





  ngOnInit() {
    this.token = this.auth.getToken();
    let decodetoken: any = {};
    decodetoken = decode(this.token);


    this.coordMuniService.allCoordMuni().subscribe((res:any)=>{this.coordM = res})
    this.predefinido.allZona().subscribe((res:any)=>{this.allZonas = res})
    this.predefinido.getProvincias().subscribe((res:any)=>{this.provincias = res})
   // this.predefinido.getMunicipiosXProvincia(decodetoken.idprovincia).subscribe((res:any)=>{ this.municipios = res })

   this.service.allCoordZona().subscribe((res: any)=>{
    this.list = res;
    setTimeout(()=>{
      $('#datatable').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 15,
        processing: true,
        lengthMenu : [5, 15, 10, 25],
        language: LanguageApp.spanish_datatables
    } );
    }, 1);

  })
  }
     async getDataJCE(cedula: number){

      this.jce.getJCEData(cedula).subscribe((res: any)=>{
            this.dataJCE = res[0],
             this.idMunicipio = this.dataJCE.IdMunicipio;
             this.idProvincia = this.dataJCE.IdProvincia;
             this.nameRecinto = this.dataJCE.CodigoRecinto;
             this.isValid = this.dataJCE.existe;

             if (this.isValid) {
            //  this.addForm(this.dataJCE)
              this.predefinido.getProvincia(this.idProvincia).subscribe((res:any)=>{this.nombreProv = res.descripcion})
              this.predefinido.getMunicipio(this.idMunicipio).subscribe((res:any)=>{this.nombreMuni = res.municipio})
              this.jce.getJCEPhoto(cedula).subscribe((res:any)=>{
                this.imageSrc = 'data:image/png;base64,' +  res.Imagen
              });

             }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Esta Cedula: ${cedula} no es valida!`,

              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload()
                }
              })

             }
            });
         }

    // VERIFICA SI LA CEDULA EXISTE EN LA LISTA DE COORDINADORES DE ZONAS 40215026150
     verificarCedula(elemento: any): boolean {

      for (let i = 0; i < this.list.length; i++) {
        const element = this.list[i].cedula;
        this.listCedula.push(element)
      }
      return this.listCedula.includes(elemento);
        }

        // VERIFICA SI LA CEDULA EXISTE EN LA LISTA DE COORDINADORES MUNICIPALES
        verificarCoordMunicipal(elemento: any): boolean {
          let element: any=[]

          for (let i = 0; i < this.coordM .length; i++) {
            element = this.coordM [i].cedula;
            this.listCoordM.push(element)
          }

          if(elemento == element){
            return this.listCoordM.includes(elemento);
          }
          return this.listCoordM.includes(elemento);
            }


 addData(data: any){

// si la cedula existe en los coordinadores de zona o existe en los coordinadores de muniicpales o si no existe en la API de la junta
    if (this.verificarCoordMunicipal(data.Cedula)==true ||
    this.verificarCedula(data.Cedula)==true ||
     data.existe == false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Esta Cedula: ${data.Cedula} ya está regisrtrada !`,
        showConfirmButton: false,
        timer: 3000,
        didClose: () => {
          window.location.reload();
        }
      })
    }else{
      let objDataJCE = {
        nombre: data.NombresPlastico ,
        apellido: data.ApellidosPlastico ,
        idprovincia: data.IdProvincia,
        idmunicipio: data.IdMunicipio ,
        cedula:  data.Cedula,
     //   idcircunscripcion: data.CodigoCircunscripcion,
      //  idrecinto: data.CodigoRecinto,
       // idcolegio: data.colegio,
        foto: this.imageSrc,

      }
      objDataJCE = {...objDataJCE, ...this.formCreate.value}

     this.service.addCoordZona(objDataJCE).subscribe((res:any)=>{window.location.reload()})//window.location.reload()
    }
  }

  updateData(id: number){
    this.service.updateCoordZona(id, this.formEdit.value).subscribe((res:any)=> {window.location.reload()})
      }

  selecctData(id: number){
    this.service.readCoordZona(id).subscribe((res:any)=>{
      this.coordZonal = res
      this.foto = res.foto

      this.formEdit.patchValue({
        apodo: res['apodo'],
        telefono: res['telefono'],
        idzona: res['idzona'].id,
        idcoordmunicipal: res['idcoordmunicipal'].id
      })
      this.coordZ = res
    })
      }

  deleteData(id: number){
    Swal.fire({
      title: 'Esta seguro?',
      text: "No podrás revertir, al eleminar este Coordinador de Zona!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Elimiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCoordZona(id).subscribe((res: any)=>{
          Swal.fire(
            'Eliminado!',
            'Este Coordinador de Zona ha sido eliminado!',
            'success'
          )

          window.location.reload()

        })

      }
    })

  }




}
