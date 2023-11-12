import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CommonModule } from '@angular/common';
import { LiderComponent } from './lider/lider.component';
import { CoordMunicipalComponent } from './coord-municipal/coord-municipal.component';
import { CoordZonalesComponent } from './coord-zonales/coord-zonales.component';
import { CoordComitesComponent } from './coord-comites/coord-comites.component';
import { MilitantesComponent } from './militantes/militantes.component';
import { ComitesComponent } from './comites/comites.component';
import { authGuard } from '../auth/guards/auth.guard';
import { ZonaComponent } from '../pages/configuracion/zona/zona.component';
import { LocalidadComponent } from './configuracion/localidad/localidad.component';
import { CircunscripcionComponent } from './configuracion/circunscripcion/circunscripcion.component';
import { ColegioComponent } from './configuracion/colegio/colegio.component';
import { RecintoComponent } from './configuracion/recinto/recinto.component';
import { LoginComponent } from '../auth/login/login.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

const routes: Routes = [
 // {path:'', pathMatch:'full', redirectTo:'login'},
   { path: 'login', component: LoginComponent },
   {path: 'formulario-Coordinacion', component: PagesComponent, canActivate: [authGuard],
  children:[
    {path: 'inicio', component: HomeComponent},
    {path: '', redirectTo: 'inicio', pathMatch: 'full' },
    {path: 'coordMunicipal', component: CoordMunicipalComponent},
    {path: 'coordZonas', component: CoordZonalesComponent},
    {path: 'coordComites', component: CoordComitesComponent},
    {path: 'militantes', component: MilitantesComponent},
    {path: 'comites', component: ComitesComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'zonas', component: ZonaComponent },
    {path: 'localidades', component: LocalidadComponent},
    {path: 'circunscripciones', component: CircunscripcionComponent },
    {path: 'colegios', component: ColegioComponent },
    {path: 'recintos', component: RecintoComponent },
    {path: 'lider',  component: LiderComponent},
    {path: 'config',  component: ConfiguracionComponent}
  //  {path: '', component: } , canActivate: [liderGuard]
  ]},
//  { path: '**', redirectTo: 'formulario-Coordinacion/inicio' },
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
