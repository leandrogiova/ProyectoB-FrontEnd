/* ESTE SERVICIO SE VA A ENCARGAR DE MOTRAR TODAS LOS PRODUCTOS, MODIFICAR LOS PRECIOS, AGREGAR PRODUCTOS
ELIMINAR PRODUCTOS, DAR DE BAJA PRODUCTOS
*/


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }


  public getAllProductos(): Observable<any>{
    return this.http.get('http://localhost:8080/productos');
  }

}
