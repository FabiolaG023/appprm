import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CoordMunicipalService } from 'src/app/services/coord-municipal.service';
import { LiderService } from 'src/app/services/lider.service';
import decode from 'jwt-decode';
import { FormBuilder, FormControl, FormGroup,} from '@angular/forms';
import { PredefinidosService } from 'src/app/services/predefinidos.service';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  lider: any
  statusRes: any


  user: any =[]
  token: any = {} ;
  imageSrc: any;
  foto: any

  constructor(
    private serviceLider: LiderService,
    private auth: AuthService,
    private fb: FormBuilder,
    private predefinido: PredefinidosService){

    }



  ngOnInit(): void {
    this.serviceLider.selectLider(1).subscribe((res: any)=>{
      this.statusRes = res.status
    //  console.log(res)
      if (res.status == 404) {
        this.lider
        this.imageSrc
      }
      if (res.status == 302) {
        this.lider = res.data
        this.imageSrc = this.lider.foto
      }

    })

    this.token = this.auth.getToken();
    let decodetoken: any = {};
    decodetoken = decode(this.token);

    this.auth.getUserProfile(decodetoken.id).subscribe((res: any)=>{
      this.user = res,
      this.foto = res.foto
    })

  }

  logOut() {
    this.auth.doLogout()
  }


}
