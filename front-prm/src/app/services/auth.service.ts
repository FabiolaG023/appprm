import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  restApi: string = 'http://localhost:3232/api/prm';

  constructor( private readonly http: HttpClient, public router: Router){ }

  private getHeadersToken(): HttpHeaders{
    const accessToken =   localStorage.getItem('access_token');
   return new HttpHeaders({
     'Content-Type': 'application/json',
     Authorization: `Bearer ${accessToken}`,
   });
  }




  singup(data: any){
    let api = `${this.restApi}/auth/singup`;
     return this.http.post<any>(api, data).pipe(
       map((res) => {return res || {};}),
       catchError(this.handleError));
  }

  config(data: any){
    let api = `${this.restApi}/config/add`;
     return this.http.post<any>(api, data).pipe(
       map((res) => {return res || {};}),
       catchError(this.handleError));
  }


  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.restApi}/auth/login`, user)
    .pipe(catchError(this.handleError));
    }


    getToken() {
      return localStorage.getItem('access_token');
    }


    isTokenExpired():boolean{
      const token = this.getToken();
      if(!token){ return true}
      const tokenData = JSON.parse(atob(token.split('.')[1]));
     // const expiration = tokenData.exp * 10000; // 1 hora Convert to milliseconds
      const expiration = tokenData.exp;
     // const emitido = tokenData.iat;
     // console.log( Date.now() < expiration)
      return  Date.now() < expiration;
     // return Date.now() < expiration;
    }

    getUserProfile(id: string): Observable<any> {
      const httpHeaders = this.getHeadersToken();
     let api = `${this.restApi}/user/info/${id}`;
      return this.http.get<any>(api, { headers: httpHeaders}).pipe(
        map((res) => {return res || {};}),
        catchError(this.handleError));
    }


    doLogout() {
      let removeToken = localStorage.removeItem('access_token');
      if (removeToken == null) {
        this.router.navigate(['login']);
      }
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
