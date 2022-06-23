import * as THREE from '../../libs/three.module.js'
import {CSG} from '../../libs/CSG-v2.js'

class Valla extends THREE.Object3D {
    constructor(titleGui){
        super();
        // this.createGUI(gui,titleGui);
        var extrudeMat = new THREE.MeshNormalMaterial();

        // this.valla = new THREE.Object3D();
        this.valla = new CSG();

        //Generamos las geometrias 
        var vallaBaseGeom = new THREE.BoxGeometry(1,1,1);
        var vallaCuerpoGeom = new THREE.BoxGeometry(1,1,1);
        var vallaSuperirorGeom = new THREE.BoxGeometry(1,1,1);

        var texturaMedio = new THREE.MeshPhongMaterial({color : 0xAAAAAA});
        var texturaSuelo = new THREE.MeshPhongMaterial({color : 0x6E6E6E});
        var texturaArriba = new THREE.MeshPhongMaterial({color : 0xDF0101});

        //Aplicamos transformaciones
        vallaBaseGeom.scale(35,2,10);
        vallaCuerpoGeom.scale(28, 10, 3);
        vallaSuperirorGeom.scale(35,5,4);
        var texture = new THREE.TextureLoader().load('../Imgs/valla-arriba.jpg');
        var materialCuerpo = new THREE.MeshPhongMaterial({ map: texture });
        var vallaBase = new THREE.Mesh(vallaBaseGeom,texturaSuelo);
        var vallaCuerpo = new THREE.Mesh(vallaCuerpoGeom, materialCuerpo);
        var vallaSuperiror = new THREE.Mesh(vallaSuperirorGeom, texturaArriba);

        //Transformaciones mesh 
        
        vallaBase.position.set(0,1,0);
        vallaCuerpo.position.set(0,7,0);
        vallaSuperiror.position.set(0,14.5,0);

        //Añadimos a objeto
        this.add(vallaBase);
        this.add(vallaCuerpo);
        this.add(vallaSuperiror);

        // this.valla.union([vallaBase,vallaCuerpo,vallaSuperiror])

        // var vallaFinal = this.valla.toMesh();
        // this.add(vallaFinal);
    }


    // createGUI(gui, titleGui) {
    //     // Controles para el tamaño, la orientación y la posición de la caja
    //     this.guiControls = {
    //         reset: () => {
               
    //         }
    //     }

    //     // Se crea una sección para los controles de la caja
    //     var folder = gui.addFolder(titleGui);
        
    // }

    update() {
        
    }

}

export {Valla};