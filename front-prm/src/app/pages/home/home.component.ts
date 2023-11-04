import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LiderService } from 'src/app/services/lider.service';
import { CoordMunicipalService } from 'src/app/services/coord-municipal.service';
import { CoordZonaService } from 'src/app/services/coord-zona.service';
import { CoordComiteService } from 'src/app/services/coord-comite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{

coordMuniCant: any
coordZonaCant: any
coordComiteCant: any

constructor(
  private municipal: CoordMunicipalService,
  private zonal: CoordZonaService,
  private comite: CoordComiteService
  ){}




ngOnInit(): void {
  this.municipal.allCoordMuni().subscribe((res:any)=>{ this.coordMuniCant = res.length})
  this.zonal.allCoordZona().subscribe((res:any)=>{this.coordZonaCant = res.length})
  this.comite.allCoordComite().subscribe((res:any)=>{this.coordComiteCant = res.length})

}



}
