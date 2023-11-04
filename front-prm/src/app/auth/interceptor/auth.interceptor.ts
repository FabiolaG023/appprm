import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse)=>{
      if (error.status === 401) {
        Swal.fire({
          title: 'Debes iniciar sesión!',
          text: "Debes iniciar sesión!",
          icon: 'error',
          showConfirmButton: false,
          timer: 4000,
          didClose: () => {
            this.router.navigate(['/login'])
          }
        })

      }

     /*  if (error.status === 404 || error.status === 403) {
        Swal.fire({
          title: 'Credenciales Invalidas!',
          text: "El usuario o la contraseña son invalidas!",
          icon: 'error',
          showConfirmButton: false,
          timer: 4000,
          didClose: () => {
            this.router.navigate(['/login'])
          }
        })
      } */




      return throwError(error);
    }));
  }
}
