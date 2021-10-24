import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mesaProductos } from './models/mesaProductos';


@Injectable({
  providedIn: 'root'
})
export class MesaProductoService {

  constructor(private http: HttpClient) {

  }

  public getMesasAbiertas(): Observable<mesaProductos[]>{
    return this.http.get<mesaProductos[]>('http://localhost:8080/mesasAbiertas/lista');
  }

}
