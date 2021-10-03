import { ProductoClavePrimaria } from "./productoClavePrimaria";

export class Producto {

    id: number;
    numeroProducto: number;
    nombre: string;
    precio: number;

    constructor(id: number,nombre: string, precio: number){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

}   