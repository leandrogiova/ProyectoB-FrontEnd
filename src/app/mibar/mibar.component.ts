import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MesaProductoService } from '../mesa-producto.service';
import { mesaProductos } from '../models/mesaProductos';
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
  mesasAbiertas: MesaProductoService[];
  mesas: mesaProductos[];


  constructor(private servicioProducto: ProductoService,private mesaProductoService: MesaProductoService ,private fb: FormBuilder ) { 

    this.agregarProducto = this.fb.group({
      numeroProducto: '',
      nombre: '',
      precio: '',
    });


    this.agregarProductoMesa = this.fb.group({
      numeroMesa: '',
      agregarProducto: '', //definido arriba
    });

  
  }

  ngOnInit() {
  }

  /*
  VerMesasAbiertas, se mostraran todas las mesas abiertas
    */
  verMesasAbiertas(){
    this.mesaProductoService.getMesasAbiertas().subscribe(mesaAbiertas => {
      this.mesas = mesaAbiertas;
    });
    for(let i in this.mesas){
      this.productos = this.mesas[i].listaProductos;
    }
    console.log(this.mesas)

  }





  enviarServidorProductoAMesa(){
    console.log("Hola enviando al servidor. Debo enciar un producto a la mesa");
  }




  /*
  Agrega un producto a la bases de datos.
  */
  public enviarProducto(){
      this.servicioProducto.postProducto(this.agregarProducto.value);
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