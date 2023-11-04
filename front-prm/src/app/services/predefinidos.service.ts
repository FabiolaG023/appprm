import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';

import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class PredefinidosService {

  restApi: string = 'http://localhost:3232/api/prm';


  constructor(
    private readonly http: HttpClient,
    public router: Router,



    ){ }

  private getHeadersToken(): HttpHeaders{
    const accessToken =   localStorage.getItem('access_token');
   return new HttpHeaders({
     'Content-Type': 'application/json',
     Authorization: `Bearer ${accessToken}`,
   });
  }



  getMunicipio(id: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/municipio/${id}`;
    return this.http.get<any>(api_url, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
  }

  getProvincia(id: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/provincia/${id}`;
    return this.http.get<any>(api_url, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
  }


getCandidatura(){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/allCandidaturas`;
  return this.http.get<any>(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}

getProvincias(){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/allProvincias`;
  return this.http.get<any>(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}

getMunicipiosXProvincia(id: number){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/MunicipiosXProvincia/${id}`;
  return this.http.get(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}

  //allAbc

  allabc(){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/allAbc`;
    return this.http.get<any>(api_url, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
  }


//ZONAS

allZona(){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/allZona`;
  return this.http.get<any>(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}





  addZona(data: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/addZona`;
    return this.http.post<any>(api_url, data, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));

  }

   readZona(id: number){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/readZona/${id}`;
    return this.http.get<any>(api_url, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
   }

   updateZona(id:any, data: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/updateZona/${id}`;
    return this.http.patch(api_url, data, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
  }

  deleteZona(id: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/deleteZona/${id}`;
    return this.http.delete(api_url, { headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError))
  }

// DISTRITOS


allDist(){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/allDist`;
  return this.http.get<any>(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}


  addDist(data: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/addDist`;
    return this.http.post<any>(api_url, data, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));

  }

   readDist(id: number){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/readDist/${id}`;
    return this.http.get<any>(api_url, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
   }

   updateDist(id:any, data: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/updateDist/${id}`;
    return this.http.patch(api_url, data, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
  }

  deleteDist(id: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/deleteDist/${id}`;
    return this.http.delete(api_url, { headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError))
  }


//COLEGIOS

allColegio(){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/allColegio`;
  return this.http.get<any>(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}


  addColegio(data: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/addColegio`;
    return this.http.post<any>(api_url, data, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));

  }

   readColegio(id: number){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/readColegio/${id}`;
    return this.http.get<any>(api_url, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
   }

   updateColegio(id:any, data: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/updateColegio/${id}`;
    return this.http.patch(api_url, data, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
  }

  deleteColegio(id: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/deleteColegio/${id}`;
    return this.http.delete(api_url, { headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError))
  }

//RECINTOS


allRecinto(){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/allRecinto`;
  return this.http.get<any>(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}


  addRecinto(data: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/addRecinto`;
    return this.http.post<any>(api_url, data, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));

  }

   readRecinto(id: number){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/readRecinto/${id}`;
    return this.http.get<any>(api_url, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
   }


   updateRecinto(id:any, data: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/updateRecinto/${id}`;
    return this.http.patch(api_url, data, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
  }

  deleteRecinto(id: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/deleteRecinto/${id}`;
    return this.http.delete(api_url, { headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError))
  }

///-CIRCUNSCRIPCIONES


allCircuns(){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/allCircuns`;
  return this.http.get<any>(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}

addCircuns(data: any){

  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/addCircuns`;
  return this.http.post<any>(api_url, data, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));

}

 readCircuns(id: number){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/readCircuns/${id}`;
  return this.http.get<any>(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
 }

 updateCircuns(id:any, data: any){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/updateCircuns/${id}`;
  return this.http.patch(api_url, data, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}

deleteCircuns(id: number){
  console.log(id)
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/deleteCircuns/${id}`;
  return this.http.delete(api_url, { headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError))
}



///-LOCALIDADES


allLocalidad(){
  const httpHeaders = this.getHeadersToken();
  let api_url = `${this.restApi}/predefinido/allLocalidad`;
  return this.http.get<any>(api_url, {headers: httpHeaders})
  .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
}


  addLocalidad(data: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/addLocalidad`;
    return this.http.post<any>(api_url, data, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));

  }

   readLocalidad(id: number){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/readLocalidad/${id}`;
    return this.http.get<any>(api_url, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
   }

   updateLocalidad(id:any, data: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/updateLocalidad/${id}`;
    return this.http.patch(api_url, data, {headers: httpHeaders})
    .pipe(map((res)=> { return res || {};}), catchError(this.handleError));
  }

  deleteLocalidad(id: any){
    const httpHeaders = this.getHeadersToken();
    let api_url = `${this.restApi}/predefinido/deleteLocalidad/${id}`;
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
