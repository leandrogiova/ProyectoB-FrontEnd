import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
//import { Console } from 'console';
//import { FORMERR } from 'dns';
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
  fecha1Mesa: FormControl;
  fecha2Mesa: FormControl;

  verLista: boolean;
  verOcultar: string;
  productos: Producto[];
  mesas: mesaProductos[];
  mesasResumenes: mesaProductos[];

  abrirNuevaMesa: mesaProductos;
  productosAgregar: number[];
  lista2: Producto[];


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
    this.fecha1Mesa = new FormControl('');
    this.fecha2Mesa = new FormControl('');



    this.verLista = false;
    this.verOcultar = "Ver";


    this.productosAgregar = [];
    this.lista2 = [];

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
    * Oculta o muestra la lista de las mesas
  */
  VerOcutalLista(){
    if(this.verLista){
      this.verLista = false;
      this.verOcultar = "Ver"
    }
    else{
      this.verLista = true;
      this.verOcultar = "Ocultar"

    }
    console.log("verLIsta= ", this.verLista);
  }


  /*
    * VerMesasAbiertas, se mostraran todas las mesas abiertas
  */
  verMesasAbiertas(){
    this.mesaProductoService.getMesasAbiertas().subscribe(mesaAbiertas => {
      this.mesas = mesaAbiertas;
    });
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
          this.abrirNuevaMesa.fecha = this.fecha1Mesa.value;
          this.abrirNuevaMesa.listaProductos = milista;
          this.abrirNuevaMesa.precioTotal = this.productos[i].precio;
        }
        else{
          console.log("ERROR - NO SE ENCONTRO EL PRODUCTO QUE SE QUIREE AGREGAR")
        }
      }
      this.abrirNuevaMesa.estado = true;
      this.abrirNuevaMesa.numero_mesa = this.numeroMesa.value;
      
      
      console.log("Hola enviando al servidor. Debo abrir una nueva mesa", "\nEnviando el objeto:", this.abrirNuevaMesa);
      this.mesas.push(this.abrirNuevaMesa);
      this.mesaProductoService.postAbrirMesa(this.abrirNuevaMesa);
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


/*
  * Funcion actualizar
  * Esta funcion agrega un producto a la mesa.
  * La variable j, ayuda a utilizar el break para parar el bucle
*/
actualizar(){
  let j: boolean = false;                
  for(var i in this.mesas){
    if(this.numeroMesa.value == this.mesas[i].id){
      for(var e in this.productos){
        if(this.numeroDeProducto.value == this.productos[e].numeroProducto){
          this.mesas[i].listaProductos = [this.productos[e]].concat(this.mesas[i].listaProductos);
          this.mesas[i].precioTotal = this.mesas[i].precioTotal + this.productos[e].precio;
          this.mesaProductoService.postActualizar(this.mesas[i]);    
          console.log("ACTUALIZADO mesa=", this.mesas[i]);
          j = true;
          break;   
        }
      }
    }
    if(j == true){
      break;
    }
  }
}


  agregarMuchosProductos(){
    for(var i in this.mesas){
      if(this.numeroMesa.value == this.mesas[i].id){
        for(var e in this.productos){
          if(this.numeroDeProducto.value == this.productos[e].numeroProducto){
            this.lista2.push(this.productos[e]);

            console.log("ACTUALIZADO lista2=", this.lista2);
            break;   
          }
        }
      }
    }
    
  }

  enviandoMuchosProductos(){
    for(let i in this.mesas){
      if(this.numeroMesa.value == this.mesas[i].id){
        this.mesas[i].listaProductos = this.lista2.concat(this.mesas[i].listaProductos);
        this.mesas[i].precioTotal = 0;
        for(let e in this.mesas[i].listaProductos){
          this.mesas[i].precioTotal = this.mesas[i].precioTotal + this.mesas[i].listaProductos[e].precio;
        }
        this.mesaProductoService.postActualizar(this.mesas[i]);
        console.log("enviando Muchos productos,", this.mesas[i]);
        break;
      }
      
    }
    
  }




  /*
    * Funcion cobrarMesa
    * cierra la mesa actualizando el estado a False, representado a la mesa cerrada
    * Actualiza el precio final
  */
  cobrarMesa(){
/*
    for(let i in this.mesas){
      if(this.numeroMesa.value == this.mesas[i].id){
        this.mesas[i].estado = false;
        console.log("this.mesas[i]", this.mesas[i]);
        this.mesaProductoService.postCerrarMesa(this.mesas[i]);
        break;
      }

    }
*/
    for(let i:number = 0; i <= this.mesas.length; i++){
      if(this.numeroMesa.value == this.mesas[i].id){
        this.mesas[i].estado = false;
        console.log("viendo mesas:", this.mesas);
        this.mesaProductoService.postCerrarMesa(this.mesas[i]);
        this.mesas.splice(i, 1);
        break;
      }
    }


  }

  
  cobrarUnProducto(){

    for(let i in this.mesas){
      if(this.numeroMesa.value == this.mesas[i].id){

//VER SI LA LISTA DE PRODUCTO DEBE SER LA LISTA DE PRODUCTOS DE LA MESA ABIERTA!!!!
// LUEGO PODER AGREGAR MUCHOS PRODUCTOS A LA VEZ
        for(let e in this.mesas[i].listaProductos){
          if(this.productos[e].numeroProducto == this.numeroDeProducto.value){

            this.mesas[i].precioTemporal = this.mesas[i].precioTemporal + this.productos[e].precio;
            console.log("this.mesas[i].precioTemporal", this.mesas[i].precioTemporal );
          }
        }
      }
    }
  }


  verMesaACobrar(){
      for(let i in this.mesas){
        if(this.numeroMesa.value == this.mesas[i].id){
          this.abrirNuevaMesa = this.mesas[i];
          console.log("Viendo la mesa a cobrar: ", this.abrirNuevaMesa);
          break;
        }
      }
      this.verLista = true;
    }


  pedirResumenes(){
    let fecha1: Date = this.fecha1Mesa.value;
    let fecha2: Date = this.fecha2Mesa.value;

    this.mesaProductoService.postResumenes([fecha1, fecha2]);

    console.log("Se envio las fechas a buscar");
    this.mesaProductoService.getResumenes().subscribe(mesas => {
      this.mesasResumenes = mesas;
    });

    console.log("Se trajeron todas las fechas");

  }
  

}