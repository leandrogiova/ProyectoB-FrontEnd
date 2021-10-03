export class ProductoClavePrimaria {

    id_grupo: number;
    id: number;


    constructor(id_grupo: number, id: number){
        this.id_grupo = id_grupo;
        this.id = id;
    }  

    setId_grupo(id_grupo: number){
        this.id_grupo = id_grupo;
    }
    getId_grupo(): number{
        return this.id_grupo;
    }


    setId(id: number){
        this.id = id;
    }
    getId(): number{
        return this.id;
    }

}