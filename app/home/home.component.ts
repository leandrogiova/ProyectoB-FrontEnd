import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MesaProductoService } from '../mesa-producto.service';
import { Producto } from '../models/producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  productos: Producto[];

  formularioMesa: FormControl;

  constructor(private servicioProducto: ProductoService, private servicioMesa: MesaProductoService) { 
    this.productos = [];
    this.formularioMesa = new FormControl;
  }
  
  
  
  ngOnInit() {
    this.servicioProducto.getAllProductos().subscribe(productos => {
      this.productos = productos;
      console.log(this.productos);
    });
  }

  VerMiMesa(){ 
    this.servicioMesa.getMesasAbiertas().subscribe(mesa => {
//      this.mesas = mesa;
    })
  }


}
