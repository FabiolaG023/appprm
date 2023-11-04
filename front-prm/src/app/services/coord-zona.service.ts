import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordZonaService {

  restApi: string = 'http://localhost:3232/api/prm';

  constructor( private readonly http: HttpClient, public router: Router){ }

  private getHeadersToken(): HttpHeaders{
    const accessToken =   localStorage.getItem('access_token');
   return new HttpHeaders({
     'Content-Type': 'application/json',
     Authorization: `Bearer ${accessToken}`,
   });
  }

  // COORDINADOR DE ZONA
allCoordZona(){
  const httpHeaders = this.getHeadersToken();
  let api = `${this.restApi}/coordZona/all`;
   return this.http.get<any>(api, { headers: httpHeaders}).pipe(
     map((res) => {return res || {};}),
     catchError(this.handleError));
}
readCoordZona(id: any){
  const httpHeaders = this.getHeadersToken();
   let api_url = `${this.restApi}/coordZona/${id}`;
   return this.http.get<any>(api_url, {headers: httpHeaders})
   .pipe(map((res)=> { return res || {};}), catchError(this.handleError));

}
addCoordZona(data: any){
  const httpHeaders = this.getHeadersToken();
  let api = `${this.restApi}/coordZona/add`;
   return this.http.post(api,data, { headers: httpHeaders}).pipe(
     map((res) => {return res || {};}),
     catchError(this.handleError));
}
updateCoordZona(id:any, data: any){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/coordZona/update/${id}`;
  return this.http.patch(api_url, data, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}

deleteCoordZona(id: any){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/coordZona/delete/${id}`;
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
