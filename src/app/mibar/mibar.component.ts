import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MesaService } from './mesa.service';

@Component({
  selector: 'app-mibar',
  templateUrl: './mibar.component.html',
  styleUrls: ['./mibar.component.css']
})
export class MibarComponent implements OnInit {

  agregarProductoMesa: FormGroup;
  cobrarIdMesa: FormControl;
  cobrarIdProducto: FormControl;

  productos: any[];

  constructor(private fb: FormBuilder, private servicioProducto: MesaService ) { 
    this.agregarProductoMesa = this.fb.group({
      idMesa: '',
      fechaHora: '',
      idProducto: this.fb.group({
        idGrupo: '',
        idProducto: '',
        nombre: '',
      }),
    });
  
    this.cobrarIdMesa = new FormControl('');
    this.cobrarIdProducto = new FormControl('');
  }

  ngOnInit() {
    this.servicioProducto.getProductos().subscribe();
  }
  
  EnviarServidorProductoAMesa(){
    console.log("Hola enviando al servidor");

    /*minuto 59
    Este boton envia los datos al servidor pero primero los muestro para saber que esta funcionando
    Una vez que los muestro corroboro que el id de la mesa exista, que el id del producto sea correcto
    que el nombre del id coincida con el id.
    y que halla ingresado la fecha.

    

    https://www.tutorialesprogramacionya.com/angularya/detalleconcepto.php?punto=88&codigo=88&inicio=80
    */
  }

  public deleteHero(){
   console.log("Hola desde deleteHero");
 }


 
 public ActualizarMesas(){
  


 }

}
