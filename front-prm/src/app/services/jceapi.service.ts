import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JceapiService {

// api cedula
restApiCedula: string = 'https://apisvc.indotel.gob.do:4443/api/padron';
restApiPhoto: string = 'https://apisvc.indotel.gob.do:4443/api/foto';
// https://apisvc.indotel.gob.do:4443/api/padron?cedula=40209863147
// api foto
//https://apisvc.indotel.gob.do:4443/api/foto?cedula=02300877392

  constructor(private readonly http: HttpClient, public router: Router) { }
  private getHeadersToken(): HttpHeaders{
    const accessToken =   localStorage.getItem('access_token');
   return new HttpHeaders({
     'Content-Type': 'application/json',
     Authorization: `Bearer ${accessToken}`,
   });
  }

  getJCEData(data: any){
    const url = `${this.restApiCedula}?cedula=${data}`;
    return this.http.get<any>(url,data).pipe(
      map((res) => {return res || {};}),
      catchError(this.handleError));
  }



  getJCEPhoto(data: any){
    const url = `${this.restApiPhoto}?cedula=${data}`;
    return this.http.get(url, data)
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.error('An error occurred:', error.error);
    }

    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }












}
