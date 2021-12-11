import { ThrowStmt } from '@angular/compiler';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
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


  verOcultar: string;
  productos: Producto[];
  mesas: mesaProductos[];
  mesasResumenes: mesaProductos[];
  mesaUnica: mesaProductos;

  abrirNuevaMesa: mesaProductos;
  productosAgregar: number[];
  lista2: Producto[];

  verLista: boolean;
  verListaProductos: boolean;
  verUnaMesaBool: boolean;


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
    this.verListaProductos = false;
    this.verUnaMesaBool = false;

    this.productosAgregar = [];
    this.lista2 = [];
    this.mesaUnica = new mesaProductos();


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
  VerOcutalLista(): void{
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
  verMesasAbiertas(): void{
    this.mesaProductoService.getMesasAbiertas().subscribe(mesaAbiertas => {
      this.mesas = mesaAbiertas;
    });
  }


  /*
     * FUNCION enviarServidorProductoAMesa
     *  Levanta una nueva mesa agregando un unico producto, enviando un objeto MesaProdutos a la base de datos.
  */
  enviarServidorProductoAMesa(): void{
      let numero: number = 0;
      numero = this.numeroDeProducto.value;  
      for(let i: number = 0; i <= this.productos.length; i++){
        if(numero == this.productos[i].numeroProducto){      
          let milista: Producto[] = [];
          milista.push(this.productos[i]);
          this.abrirNuevaMesa.fecha = this.fecha1Mesa.value;
          this.abrirNuevaMesa.listaProductos = milista;
          this.abrirNuevaMesa.precioTotal = this.productos[i].precio;
          break;
        }
        else{
          console.log("ERROR - NO SE ENCONTRO EL PRODUCTO QUE SE QUIREE AGREGAR");
        }
      }
      this.abrirNuevaMesa.estado = true;
      this.abrirNuevaMesa.numero_mesa = this.numeroMesa.value;
      console.log("Hola enviando al servidor. Debo abrir una nueva mesa", "\nEnviando el objeto:", this.abrirNuevaMesa);
      this.mesas.push(this.abrirNuevaMesa);
      this.mesaProductoService.postAbrirMesa(this.abrirNuevaMesa);

      //limpio los casilleros
      this.numeroMesa = new FormControl('');
      this.fecha1Mesa = new FormControl('');
      this.numeroDeProducto = new FormControl('');
    }
  

  /*
     * FUNCION enviarProducto
     * Agrega un producto a la bases de datos.
  */
  enviarProducto():void{
    this.servicioProducto.postProducto(this.agregarProducto.value);
    console.log("Agregando el objeto",this.agregarProducto.value, "\nObjeto Agregado a la base de datos");
  
    this.agregarProducto = this.fb.group({
      numeroProducto: '',
      nombre: '',
      precio: '',
    }); 
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
  VerListaProducto(): void{
    this.verListaProductos = !this.verListaProductos;
    this.servicioProducto.getAllProductos().subscribe(productos => {
      this.productos = productos;
    });
  }


/*
  * Funcion actualizar
  * Esta funcion agrega un producto a la mesa.
  * La variable j, ayuda a utilizar el break para parar el bucle
*/
actualizar(): void{
  let j: boolean = false;                
  for(var i in this.mesas){
    if(this.numeroMesa.value == this.mesas[i].id){
      for(var e in this.productos){
        if(this.numeroDeProducto.value == this.productos[e].numeroProducto){
          this.mesas[i].listaProductos = [this.productos[e]].concat(this.mesas[i].listaProductos);
          this.mesas[i].precioTotal = this.mesas[i].precioTotal + this.productos[e].precio;
          this.mesaProductoService.postActualizar(this.mesas[i]);    
          j = true;
          break;   
        }
      }
    }
    if(j == true){
      break;
    }
  }
  this.numeroMesa = new FormControl('');
  this.numeroDeProducto = new FormControl('');
}


  agregarMuchosProductos(): void{
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


  
  /*
  */
  enviandoMuchosProductos(): void{
    for(let i in this.mesas){
      if(this.numeroMesa.value == this.mesas[i].id){
        this.mesas[i].listaProductos = this.lista2.concat(this.mesas[i].listaProductos);
        this.mesas[i].precioTotal = 0;
        for(let e in this.mesas[i].listaProductos){
          this.mesas[i].precioTotal = this.mesas[i].precioTotal + this.mesas[i].listaProductos[e].precio;
        }
        
        this.mesaProductoService.postActualizar(this.mesas[i]);
        console.log("enviando Muchos productos,", this.mesas[i]);
        this.lista2 = [];
        break;
      }
      
    }
    
  }


  /*
    * Funcion cobrarMesa
    * cierra la mesa actualizando el estado a False, representado a la mesa cerrada
    * Actualiza el precio final
  */
  cobrarMesa(): void{
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


  
  cobrarUnProducto(): void{

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


  /*
  */
  verMesaACobrar(): void{
      for(let i in this.mesas){
        if(this.numeroMesa.value == this.mesas[i].id){
          this.abrirNuevaMesa = this.mesas[i];
          console.log("Viendo la mesa a cobrar: ", this.abrirNuevaMesa);
          break;
        }
      }
      this.verLista = !this.verLista;
    }



/*
*/
  pedirResumenes(): void{
    let fecha1: Date = this.fecha1Mesa.value;
    let fecha2: Date = this.fecha2Mesa.value;

    this.mesaProductoService.postResumenes([fecha1, fecha2]);

    console.log("Se envio las fechas a buscar");
    this.mesaProductoService.getResumenes().subscribe(mesas => {
      this.mesasResumenes = mesas;
    });

    this.fecha1Mesa = new FormControl('');
    this.fecha2Mesa = new FormControl('');

    console.log("Se trajeron todas las fechas");

  }


/*
  *FUNCION verUnaMesa
  * Muestra el detalle de toda una mesa para luego poder modificar cualquier campo
  * No recibe parametros, ni devuelve ningun dato.
*/
  verUnaMesa(): void{
    this.verUnaMesaBool =  !this.verUnaMesaBool;
    for(let i = 0; i <= this.mesas.length; i++){
      if(this.numeroMesa.value == this.mesas[i].numero_mesa){
        this.mesaUnica = this.mesas[i];
        console.log("mesaUnica: ",this.mesaUnica);

        break;
      } 
    }
  }
  


  /*
    * FUNCION cambioNumeroDeMesa
    * Cambia el numero de la mesa, el cambio se ve asentado en la lista de las mesas abiertas (this.mesas)
    * El cambio no se ve reflejado en la base de datos!!!
    * No recibe parametros, ni devuelve ningun dato.
  */
  cambioNumeroDeMesa(): void{
    console.log("mesaUnica.Numero_mesa", this.mesaUnica.numero_mesa);
    for(let i:number = 0; i <= this.mesas.length; i++){
      if(this.mesas[i].id == this.mesaUnica.id){
        this.mesas[i].numero_mesa = this.mesaUnica.numero_mesa;
        break;
      }
      
    }
  }

  

/*
*/
agregarAListaDeBorrado($event): void{
  for(let i: number = 0; i <= this.mesas.length; i++){
      if(this.mesaUnica.id == this.mesas[i].id){
          for(let e: number = 0; e <= this.mesas[i].listaProductos.length ; e++){
              if( $event.target.value ==  this.mesas[i].listaProductos[e].id) {
                this.mesas[i].listaProductos.splice(e, 1);
                console.log("this.mesas[i].listaProductos=", this.mesas[i].listaProductos);
                break;
              }
          }
        break;
      }
  }
}


/*

*/
actualizarMesaModificada(): void{
  this.mesaProductoService.postActualizar(this.mesaUnica);
  console.log("Se actualizo la base de datos correctamente"); 
}



/*
*/
cambiarPrecioTotal($event): void{
  this.mesaUnica.precioTotal = $event.target.value;
}

/*
*/
cambiarPrecioTemporal($event) : void{
  this.mesaUnica.precioTemporal = $event.target.value;
}




}