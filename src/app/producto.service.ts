/* ESTE SERVICIO SE VA A ENCARGAR DE MOTRAR TODAS LOS PRODUCTOS, MODIFICAR LOS PRECIOS, AGREGAR PRODUCTOS
ELIMINAR PRODUCTOS, DAR DE BAJA PRODUCTOS
*/


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

//  url: string;

  constructor(private http: HttpClient) {
    //this.url = 'http://localhost/ProyectoB';
  }


  public getAllProductos(): Observable<any>{
    return this.http.get('http://localhost:8080/productos');


    //  return this.http.get(this.url);
  //video https://www.youtube.com/watch?v=HNjV3Jv3obM&ab_channel=Loricode
  }

}
