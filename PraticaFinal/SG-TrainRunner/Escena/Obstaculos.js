var tipoObstaculos = [
    "TREN",
    "VALLA",
    "NADA"]
    



class Obstaculos {
    
    constructor(){
        this.patronObstaculos= [tipoObstaculos.NADA,tipoObstaculos.NADA,tipoObstaculos.NADA];
        this.patronesObstaculos = Array(    
                                            [tipoObstaculos[1],tipoObstaculos[2],tipoObstaculos[1]],
                                            [tipoObstaculos[0],tipoObstaculos[0],tipoObstaculos[1]],
                                            [tipoObstaculos[0],tipoObstaculos[1],tipoObstaculos[0]],
                                            [tipoObstaculos[1],tipoObstaculos[0],tipoObstaculos[0]],
                                            [tipoObstaculos[2],tipoObstaculos[1],tipoObstaculos[0]],
                                            [tipoObstaculos[2],tipoObstaculos[1],tipoObstaculos[2]],
                                            );
    }

    obtenerPatron(){
        var numPatron = Math.floor(Math.random() * (this.patronesObstaculos.length - 0) + 0);

        return this.patronesObstaculos[numPatron];
    }



}

export {Obstaculos};