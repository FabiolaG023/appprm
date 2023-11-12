import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';



export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const auth = inject(AuthService);


  let token = localStorage.getItem('access_token');

  if (token==null ) {
    Swal.fire({
      title: 'No está Logeado!',
      text: "Debes iniciar sesión!",
      icon: 'error',
      showConfirmButton: false,
      timer: 3000,
      didClose: () => {
        router.navigate(['/login'])
       // window.location.reload()
      }
    })
 //   window.alert("No está Logeado!");

    return false;
   // auth.doLogout()
  }


  if (auth.isTokenExpired()===true) {
    Swal.fire({
      title: 'Debes iniciar sesión!',
      text: "El token ha expirado o No está Logeado!",
      icon: 'error',
      showConfirmButton: false,
      timer: 3000,
      didClose: () => {
        router.navigate(['/login'])
      //  window.location.reload()
      auth.doLogout()
      }
    })
//    window.alert("El token ha expirado o No está Logeado!");
 //   router.navigate(['/login']);
   // auth.doLogout()
    return false;
  }



  return true
}
