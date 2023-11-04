import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordComiteService {
  restApi: string = 'http://localhost:3232/api/prm';

  constructor( private readonly http: HttpClient, public router: Router){ }

  private getHeadersToken(): HttpHeaders{
    const accessToken =   localStorage.getItem('access_token');
   return new HttpHeaders({
     'Content-Type': 'application/json',
     Authorization: `Bearer ${accessToken}`,
   });
  }


  // COORDINADOR DE COMITE

allCoordComite(){
  const httpHeaders = this.getHeadersToken();
  let api = `${this.restApi}/coordComite/all`;
   return this.http.get<any>(api, { headers: httpHeaders}).pipe(
     map((res) => {return res || {};}),
     catchError(this.handleError));
}
getCoordComite(id: any){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/coordComite/${id}`;
  return this.http.get<any>(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}

getCoordZonalXZonas(id: any){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/coordComite/coordZonalXZonas/${id}`;
  return this.http.get<any>(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}


//coordZonalXZonas

addCoordComite(data: any){
  const httpHeaders = this.getHeadersToken();
  let api = `${this.restApi}/coordComite/add`;
   return this.http.post<any>(api,data, { headers: httpHeaders}).pipe(
     map((res) => {return res || {};}),
     catchError(this.handleError));
}

updateCoordComite(id:any, data: any){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/coordComite/update/${id}`;
  return this.http.patch(api_url, data, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}

deleteCoordComite(id: any){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/coordComite/delete/${id}`;
  return this.http.delete(api_url, { headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError))
}




  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
