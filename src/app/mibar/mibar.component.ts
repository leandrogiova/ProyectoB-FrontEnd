import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Producto } from '../models/producto';
import { ProductoService } from '../producto.service';


@Component({
  selector: 'app-mibar',
  templateUrl: './mibar.component.html',
  styleUrls: ['./mibar.component.css']
})
export class MibarComponent implements OnInit {

  agregarProducto: FormGroup;
  agregarProductoMesa: FormGroup;
  cobrarIdMesa: FormControl;
  cobrarIdProducto: FormControl;

  productos: Producto[];


  constructor(private servicioProducto: ProductoService, private fb: FormBuilder ) { 

    this.agregarProducto = this.fb.group({
      numeroProducto: '',
      nombre: '',
      precio: '',
    });


    this.agregarProductoMesa = this.fb.group({
      idMesa: '',
      fechaHora: '',
      agregarProducto: '', //definido arriba
    });

  
  }

  ngOnInit() {
  }

  /*
  Agrega un producto a la bases de datos.
  */
  public enviarProducto(){
      this.servicioProducto.postProducto(this.agregarProducto.value);
  }

  
  EnviarServidorProductoAMesa(){
    console.log("Hola enviando al servidor. Debo enciar un producto a la mesa");
  }

/*
  Se van a buscar todos los productos de la bases de datos, para poder visualizar los productos en la pagina 
  Y se comopleta la variable productos definida arriba
*/
  VerListaProducto(){
    this.servicioProducto.getAllProductos().subscribe(productos => {
      this.productos = productos;
    });

  }
  

}