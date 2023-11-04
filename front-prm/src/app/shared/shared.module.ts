import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SiderbarComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SiderbarComponent,
    ReactiveFormsModule
  ]

})
export class SharedModule { }
