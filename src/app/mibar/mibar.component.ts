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

  numeroMesa: FormControl;
  numeroDeProducto: FormControl;
  abrirNuevaMesa: mesaProductos;

  productos: Producto[];
  mesas: mesaProductos[];


  precioTotal: number[];

//  mesasAbiertas: MesaProductoService[];


  constructor(private servicioProducto: ProductoService,private mesaProductoService: MesaProductoService ,private fb: FormBuilder ) { 

    this.agregarProducto = this.fb.group({
      numeroProducto: '',
      nombre: '',
      precio: '',
    });

    this.productos = new Array;
    this.numeroMesa = new FormControl('');
    this.numeroDeProducto = new FormControl('');
    this.abrirNuevaMesa = new mesaProductos();
  }



  ngOnInit() {
    this.servicioProducto.getAllProductos().subscribe(productos => {
      this.productos = productos;
    });

    this.mesaProductoService.getMesasAbiertas().subscribe(mesaAbiertas => {
      this.mesas = mesaAbiertas;
    });
    
  }

  /*
  VerMesasAbiertas, se mostraran todas las mesas abiertas
    */
  verMesasAbiertas(){
    this.mesaProductoService.getMesasAbiertas().subscribe(mesaAbiertas => {
      this.mesas = mesaAbiertas;
    });


    for(let i in this.mesas){
      for (let e in this.mesas[i].listaProductos){
        this.precioTotal[i] = this.precioTotal[i] + this.mesas[i].listaProductos[e].precio;
      }
    }
    console.log("precioTotal = ",this.precioTotal);

    
/*
    for(let i=0; i < this.mesas.length; i++){
      for(let e=0; e < this.mesas[i].listaProductos.length; e++){
        this.precioTotal[i] = this.precioTotal[i] = this.mesas[i].listaProductos[e].precio;
      }
    }
*/
  }

  /*
     * FUNCION enviarServidorProductoAMesa
     *  Levanta una nueva mesa agregando un unico producto, enviando un objeto MesaProdutos a la base de datos.
  */
  enviarServidorProductoAMesa(){
      let numero: number = 0;
      numero = this.numeroDeProducto.value;
  
      for(let i: number = 0; i <= 10; i++){
        if(numero == this.productos[i].numeroProducto){      
          let milista: Producto[] = [];
          milista.push(this.productos[i]);
          this.abrirNuevaMesa.listaProductos = milista;     
        }
        else{
          console.log("ERROR - NO SE ENCONTRO EL PRODUCTO QUE SE QUIREE AGREGAR")
        }
      }
      this.abrirNuevaMesa.estado = true;
      this.abrirNuevaMesa.numero_mesa = this.numeroMesa.value;
      
      console.log("Hola enviando al servidor. Debo abrir una nueva mesa", "\nEnviando el objeto:", this.abrirNuevaMesa);
      this.mesaProductoService.postAbrirMesa(this.abrirNuevaMesa);
    }
  
  
    actualizar(){
/*      let m1: mesaProductos = new mesaProductos();
      
      m1.id = 77;
      m1.numero_mesa = 999;
      m1.listaProductos = [];
      m1.estado = true;

      this.mesaProductoService.postActualizar(m1);
      console.log("ACTUALIZADO");
*/




      let m1: mesaProductos = new mesaProductos();
      //let numero: number = 0;

      let p1: Producto = new Producto();

      //m1.id = this.numeroMesa.value;
      //numero = this.numeroDeProducto.value;

      

      for(let i: number = 0; i <= this.mesas.length; i++){
        console.log("this.numeroMesa.value=",this.numeroMesa.value);
        console.log("this.mesas[i].id=",this.mesas[i].id, "\ni=",i);
        if(this.numeroMesa.value == this.mesas[i].id){
          
          for(let e: number = 0; e <= this.mesas.length; e++){
            console.log("SEGUIR REVISANDO LOS BUCLES Y LOS CONDICIONALES Y SER SI EL PUSH SE ESTA HACIENDO BIEN");
            if(this.numeroDeProducto.value == this.productos[e].numeroProducto){
            
              p1 = this.productos[e];
              this.mesas[i].listaProductos.push(p1);
              m1.listaProductos.push(p1);
            }
          } 
        }   
      }
      this.mesaProductoService.postActualizar(m1);
      console.log("Hé actualizado lista de productos de la mesa", m1);

    }





  /*
     * FUNCION enviarProducto
     * Agrega un producto a la bases de datos.
  */
  enviarProducto(){
    this.servicioProducto.postProducto(this.agregarProducto.value);
    console.log("Agregando el objeto",this.agregarProducto.value, "\nObjeto Agregado a la base de datos");
  }

  

/*

  ***************************************
    ESTA FUNCION ESTA AL PEDO ACTUALMENTE
  ***************************************
    La variable productos la estoy actualizando en el ngOnit

   * FUNCION VerListaProduto
   * Se van a buscar todos los productos de la bases de datos, para poder visualizar los productos en la pagina 
   * Y se comopleta la variable productos definida arriba
*/
  VerListaProducto(){
    this.servicioProducto.getAllProductos().subscribe(productos => {
      this.productos = productos;
    });
  }
  

  


}