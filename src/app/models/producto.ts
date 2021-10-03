import { ProductoClavePrimaria } from "./productoClavePrimaria";

export class Producto {

    id_general: ProductoClavePrimaria;
    nombre: string;
    precio: number;

    constructor(id: ProductoClavePrimaria, nombre: string, precio: number){
        this.id_general = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    getIdGeneral_Id_grupo(): number {
        return this.id_general.getId_grupo();
    }
    getIdGeneral_Id(): number {
        return this.id_general.getId();
    }
}   