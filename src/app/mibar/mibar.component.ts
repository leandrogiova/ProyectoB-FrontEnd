import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mibar',
  templateUrl: './mibar.component.html',
  styleUrls: ['./mibar.component.css']
})
export class MibarComponent implements OnInit {

  agregarProductoMesa: FormGroup;

  constructor(private fb: FormBuilder ) { 
    this.agregarProductoMesa = this.fb.group({
      idMesa: '',
      fechaHora: '',
      idProducto: this.fb.group({
        idGrupo: '',
        idProducto: '',
        nombre: '',
      }),

    });
  }

  ngOnInit() {
  }
  
  EnviarServidorProductoAMesa(){
    console.log("Hola enviando al servidor");
    /*minuto 59*/
  }


  deleteHero(){
   console.log("Hola desde deleteHero");
 }
}
