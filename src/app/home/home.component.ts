import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  productos: Producto[];

  constructor(private servicioProducto: ProductoService ) { 
    this.productos = [];
  }
  ngOnInit() {
    this.servicioProducto.getAllProductos().subscribe(productos => {
      this.productos = productos;
      console.log(this.productos);
      console.log("id_grupo = " + this.productos[1].getId_grupo);
    });


  }

}
