/* ESTE SERVICIO SE VA A ENCARGAR DE MOTRAR TODAS LAS MESAS 




*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private http: HttpClient) { }


  public getProductos(): Observable<any>{
    return this.http.get('http://localhost:8080/productos');
  }

}
