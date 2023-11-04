import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MilitantesService {

  restApi: string = 'http://localhost:3232/api/prm';

  constructor( private readonly http: HttpClient, public router: Router){ }

  private getHeadersToken(): HttpHeaders{
    const accessToken =   localStorage.getItem('access_token');
   return new HttpHeaders({
     'Content-Type': 'application/json',
     Authorization: `Bearer ${accessToken}`,
   });
  }





//MILITANTES
allMilitantes(){
  const httpHeaders = this.getHeadersToken();
  let api = `${this.restApi}/militantes/all`;
   return this.http.get<any>(api, { headers: httpHeaders}).pipe(
     map((res) => {return res || {};}),
     catchError(this.handleError));
}
readMilitantes(id: any){
  const httpHeaders = this.getHeadersToken();
 let api_url = `${this.restApi}/militantes/read/${id}`;
 return this.http.get<any>(api_url, {headers: httpHeaders})
 .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}
addMilitantes(data: any){
  const httpHeaders = this.getHeadersToken();
  let api = `${this.restApi}/militantes/add`;
   return this.http.post(api,data, { headers: httpHeaders}).pipe(
     map((res) => {return res || {};}),
     catchError(this.handleError));
}
updateMilitantes(id: any, data:any){
  const httpHeaders = this.getHeadersToken();
 let api_url = `${this.restApi}/militantes/update/${id}`;
 return this.http.patch<any>(api_url,data ,{headers: httpHeaders})
 .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}


deleteMilitantes(id: any){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/militantes/delete/${id}`;
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
