import * as THREE from '../../libs/three.module.js'
import { CSG } from '../../libs/CSG-v2.js'

const DATOS = {
    ALTURABASE: 40,
    ANCHURATREN: 30,
    LARGOTREN: 120,
    EXTRA: 1
};

class Tren extends THREE.Object3D {
    constructor(titleGui) {
        super();
        // this.createGUI(gui,titleGui);
        var extrudeMat = new THREE.MeshNormalMaterial();

        //Generamos las geometrias 
        var TrenBaseGeom = new THREE.BoxGeometry(1, 1, 1);
        var CuboAuxGeom = new THREE.BoxGeometry(1, 1, 1);
        var CilindroAuxGeom = new THREE.CylinderBufferGeometry(DATOS.ANCHURATREN / 2 + DATOS.EXTRA, DATOS.ANCHURATREN / 2 + DATOS.EXTRA, DATOS.LARGOTREN, 30, 30);
        CuboAuxGeom.scale(DATOS.ANCHURATREN / 2 + DATOS.EXTRA * 2, DATOS.LARGOTREN, DATOS.ANCHURATREN + DATOS.EXTRA * 2);

        TrenBaseGeom.scale(DATOS.LARGOTREN, DATOS.ALTURABASE, DATOS.ANCHURATREN);
        var texturaPared = new THREE.TextureLoader().load("../Imgs/textura-tren-pared.png");
        //Cargamos el bump para dar profundidad al material.
        var bump = new THREE.TextureLoader().load('../Imgs/bump-tren.jpg')
        var texturaTren = new THREE.MeshPhongMaterial({ map: texturaPared });
        texturaTren.bumpMap = bump;
        var TrenBase = new THREE.Mesh(TrenBaseGeom, texturaTren);
        var texturaTecho = new THREE.MeshPhongMaterial({ color: 0xFF8000 });
        //Creacion Techo MEsh
        var CuboAux = new THREE.Mesh(CuboAuxGeom, extrudeMat);
        var CilindroAux = new THREE.Mesh(CilindroAuxGeom, texturaTecho);
        CuboAux.position.set(-DATOS.ANCHURATREN / 4, 0, 0);
        var csg = new CSG();
        csg.subtract([CilindroAux, CuboAux]);
        var TrenTecho = csg.toMesh();


        TrenTecho.rotateZ(Math.PI / 2);
        TrenTecho.rotateX(Math.PI / 2);
        TrenTecho.position.set(0, DATOS.ALTURABASE - DATOS.EXTRA, 0);

        TrenBase.rotateY(Math.PI / 2);
        // TrenTecho.position.set(0,DATOS.ALTURABASE/2,0);
        TrenBase.position.set(0, DATOS.ALTURABASE / 2, 0);


        this.add(TrenTecho);
        this.add(TrenBase);
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

export { Tren };