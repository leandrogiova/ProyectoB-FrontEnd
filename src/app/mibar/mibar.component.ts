import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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


  constructor(private servicioProducto: ProductoService, private fb: FormBuilder ) { 

    this.agregarProducto = this.fb.group({
      ClavePrimaria: this.fb.group({
        idGrupo: '',
        idProducto: '',
      }),
      nombre: '',
      precio: '',
    });


    this.agregarProductoMesa = this.fb.group({
      idMesa: '',
      fechaHora: '',
      agregarProducto: '', //definido arriba
//      idProducto: this.fb.group({
//        idGrupo: '',
//        idProducto: '',
//        nombre: '',
//        precio: '',
//      }),
    });

  
    //  this.cobrarIdMesa = new FormControl('');
    //  this.cobrarIdProducto = new FormControl('');
  }

  ngOnInit() {
  }

  /*
  Agrega un producto a la bases de datos y se encarga de controlar que el id no sea repetido
  */
  public enviarProducto(){
      console.log("Hola que tal, tengo que enviar un producto a la base de datos");
      console.log(this.agregarProducto.value);
      this.servicioProducto.postProducto(this.agregarProducto.value);
  }

  
  EnviarServidorProductoAMesa(){
    console.log("Hola enviando al servidor");
    /*
    minuto 59
    Este boton envia los datos al servidor pero primero los muestro para saber que esta funcionando
    Una vez que los muestro corroboro que el id de la mesa exista, que el id del producto sea correcto
    que el nombre del id coincida con el id.
    y que halla ingresado la fecha.

    

    https://www.tutorialesprogramacionya.com/angularya/detalleconcepto.php?punto=88&codigo=88&inicio=80
  */
  }
  

}