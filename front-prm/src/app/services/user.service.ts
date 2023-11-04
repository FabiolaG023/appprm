import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  restApi: string = 'http://localhost:3232/api/prm';

  constructor( private readonly http: HttpClient, public router: Router){ }

  private getHeadersToken(): HttpHeaders{
    const accessToken =   localStorage.getItem('access_token');
   return new HttpHeaders({
     'Content-Type': 'application/json',
     Authorization: `Bearer ${accessToken}`,
   });
  }

  add(data: any){
    const httpHeaders = this.getHeadersToken();
    let api = `${this.restApi}/user/add`;
     return this.http.post<any>(api,data, { headers: httpHeaders}).pipe(
       map((res) => {return res || {};}),
       catchError(this.handleError));
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
