import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { LiderComponent } from './lider/lider.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoordMunicipalComponent } from './coord-municipal/coord-municipal.component';
import { CoordZonalesComponent } from './coord-zonales/coord-zonales.component';
import { CoordComitesComponent } from './coord-comites/coord-comites.component';
import { MilitantesComponent } from './militantes/militantes.component';
import { ComitesComponent } from './comites/comites.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {DataTablesModule} from 'angular-datatables';
import { ZonaComponent } from './configuracion/zona/zona.component';
import { LocalidadComponent } from './configuracion/localidad/localidad.component';
import { ColegioComponent } from './configuracion/colegio/colegio.component';
import { RecintoComponent } from './configuracion/recinto/recinto.component';
import { CircunscripcionComponent } from './configuracion/circunscripcion/circunscripcion.component';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    UsuariosComponent,
    HomeComponent,
    PagesComponent,
    LiderComponent,
    CoordMunicipalComponent,
    CoordZonalesComponent,
    CoordComitesComponent,
    MilitantesComponent,
    ComitesComponent,
    ZonaComponent,
    LocalidadComponent,
    ColegioComponent,
    RecintoComponent,
    CircunscripcionComponent,
  ],


  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    DataTablesModule,
    AuthModule,

  ],
   exports: [HomeComponent, ReactiveFormsModule,]
})
export class PagesModule { }
