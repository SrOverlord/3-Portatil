import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import { Obstaculos } from './Obstaculos.js';
import { Tren } from '../Modelos/Tren/Tren.js'
import { Valla } from '../Modelos/Valla/Valla.js'

var tipoObstaculos = [
    "TREN",
    "VALLA",
    "NADA"]

class Terreno extends THREE.Object3D {
    constructor(gui, obstaculos = true) {
        super();


        this.extrudeMat = new THREE.MeshNormalMaterial();

        //Definicion de las partes de la Terreno
        this.terreno = new THREE.Object3D();
        this.anchuraCarril = 35;
        this.alturaCarril = 2;
        this.longitudCarril = 500;
        this.longitudExtra = 15;
        var carrilGeom0 = new THREE.BoxGeometry(this.anchuraCarril, this.alturaCarril, this.longitudCarril + this.longitudExtra);
        var carrilGeom1 = new THREE.BoxGeometry(this.anchuraCarril, this.alturaCarril, this.longitudCarril + this.longitudExtra);
        var carrilGeom2 = new THREE.BoxGeometry(this.anchuraCarril, this.alturaCarril, this.longitudCarril + this.longitudExtra);
        var sueloGeom = new THREE.BoxGeometry(this.anchuraCarril * 50, this.alturaCarril / 2, this.longitudCarril + this.longitudExtra);

        carrilGeom0.translate(-this.anchuraCarril, -this.alturaCarril / 2, this.longitudCarril / 2 - this.longitudCarril / 5);
        carrilGeom1.translate(0, -this.alturaCarril / 2, this.longitudCarril / 2 - this.longitudCarril / 5);
        carrilGeom2.translate(this.anchuraCarril, -this.alturaCarril / 2, this.longitudCarril / 2 - this.longitudCarril / 5);

        sueloGeom.translate(0, -this.alturaCarril, this.longitudCarril / 2 - this.longitudCarril / 5);

        //Textura de carril de tren
        var rail = new THREE.TextureLoader().load('../Imgs/textura-inconsútil-de-la-vía-del-tren-35784519.jpg');
        rail.wrapS = THREE.RepeatWrapping;
        rail.wrapT = THREE.RepeatWrapping;
        rail.repeat.set(1, 5);
        //Cargamos el bump para dar profundidad al material.
        var bump = new THREE.TextureLoader().load('../Imgs/bump-via.png')
        bump.wrapS = THREE.RepeatWrapping;
        bump.wrapT = THREE.RepeatWrapping;
        bump.repeat.set(1, 5);
        var materialRail = new THREE.MeshPhongMaterial({ map: rail });
        materialRail.bumpMap = bump;
        //Textura de cesped para el suelo
        var cesped = new THREE.TextureLoader().load('../Imgs/cesped5.jpg');
        cesped.wrapS = THREE.RepeatWrapping;
        cesped.wrapT = THREE.RepeatWrapping;
        cesped.repeat.set(20, 5);
        var materialCesped = new THREE.MeshBasicMaterial({ map: cesped });

        var carril0 = new THREE.Mesh(carrilGeom0, materialRail);
        var carril1 = new THREE.Mesh(carrilGeom1, materialRail);
        var carril2 = new THREE.Mesh(carrilGeom2, materialRail);

        var suelo = new THREE.Mesh(sueloGeom, materialCesped);

        this.muro1 = this.crearMuro();
        this.muro1.position.set(-this.anchuraCarril - this.anchuraCarril / 2 - 2.5, 0, 0);
        this.muro2 = this.crearMuro();
        this.muro2.position.set(this.anchuraCarril + this.anchuraCarril / 2 + 2.5, 0, 0);


        //Obstaculos
        this.tren = new Tren(gui, "Control tren");
        this.valla = new Valla(gui, "Control valla");
        this.tren.position.set(-this.anchuraCarril, 0, 0);
        this.valla.position.set(this.anchuraCarril, 0, 0);

        this.crearObstaculos();
        if (obstaculos) {
            this.generarObstaculos();
        }


        //Terreno
        this.terreno.add(carril0);
        this.terreno.add(carril1);
        this.terreno.add(carril2);
        this.terreno.add(this.muro1)
        this.terreno.add(this.muro2)
        this.terreno.add(suelo);



        this.add(this.terreno);



    }

    generarObstaculos() {
        var patronObstaculos = new Obstaculos();
        var patron = patronObstaculos.obtenerPatron();


        // this.eliminarGeometrias();


        //Obstaculo 1
        if (patron[0] == "NADA") {
            this.tren1.visible = false;
            this.valla1.visible = false;

        } else {
            if (patron[0] == "TREN") {

                this.tren1.visible = true;
                this.valla1.visible = false;

            } else {
                if (patron[0] == "VALLA") {

                    this.tren1.visible = false;
                    this.valla1.visible = true;

                }
            }
        }
        //Obstaculo 2
        if (patron[1] == "NADA") {
            this.tren2.visible = false;
            this.valla2.visible = false;



        } else {
            if (patron[1] == "TREN") {
                this.tren2.visible = true;
                this.valla2.visible = false;

            } else {
                if (patron[1] == "VALLA") {


                    this.tren2.visible = false;
                    this.valla2.visible = true;

                }
            }
        }
        //Obstaculo 3
        if (patron[2] == "NADA") {
            this.tren3.visible = false;
            this.valla3.visible = false;

        } else {
            if (patron[2] == "TREN") {

                this.tren3.visible = true;
                this.valla3.visible = false;

            } else {
                if (patron[2] == "VALLA") {

                    this.tren3.visible = false;
                    this.valla3.visible = true;

                }
            }
        }

    }

    crearObstaculos() {
        //Carril izquierdo
        this.tren1 = new Tren("Control tren 1");
        this.valla1 = new Valla("Control valla 1");
        this.tren1.position.set(-this.anchuraCarril, 0, 0);
        this.valla1.position.set(-this.anchuraCarril, 0, 0);

        //Carril central
        this.tren2 = new Tren("Control tren 2");
        this.valla2 = new Valla("Control valla 2");
        this.tren2.position.set(0, 0, 0);
        this.valla2.position.set(0, 0, 0);

        //Carril derecho
        this.tren3 = new Tren("Control tren 3");
        this.valla3 = new Valla("Control valla 3");
        this.tren3.position.set(this.anchuraCarril, 0, 0);
        this.valla3.position.set(this.anchuraCarril, 0, 0);

        this.tren1.visible = false;
        this.valla1.visible = false;
        this.tren2.visible = false;
        this.valla2.visible = false;
        this.tren3.visible = false;
        this.valla3.visible = false;


        this.add(this.tren1)
        this.add(this.valla1)
        this.add(this.tren2)
        this.add(this.valla2)
        this.add(this.tren3)
        this.add(this.valla3)

    }

    crearMuro() {
        var muro = new THREE.Object3D();
        var parteInferiorGeom = new THREE.BoxBufferGeometry(5, 60, this.longitudCarril + this.longitudExtra);
        var parteSuperiorGeom = new THREE.BoxBufferGeometry(6, 2, this.longitudCarril + this.longitudExtra);
        parteInferiorGeom.translate(0, 0, this.longitudCarril / 2 - this.longitudCarril / 5);
        parteSuperiorGeom.translate(0, 0, this.longitudCarril / 2 - this.longitudCarril / 5);
        parteInferiorGeom.translate(0, 30, 0);
        parteSuperiorGeom.translate(0, 60 + 1, 0);
        
        
        //Cargamos la textura
        var texture = new THREE.TextureLoader().load('../Imgs/ladrillo-difuso.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 3);
        //Cargamos el bump para dar profundidad al material.
        var bump = new THREE.TextureLoader().load('../Imgs/ladrillo-bump.png')
        bump.wrapS = THREE.RepeatWrapping;
        bump.wrapT = THREE.RepeatWrapping;
        bump.repeat.set(10, 3);
        
        var materialLadrillo = new THREE.MeshPhongMaterial({ map: texture });
        materialLadrillo.bumpMap = bump;
        var materialSuperior = new THREE.MeshPhongMaterial({ color: new THREE.Color(0xffffff) });

        var parteInferior = new THREE.Mesh(parteInferiorGeom, materialLadrillo);
        var parteSuperior = new THREE.Mesh(parteSuperiorGeom, materialSuperior);



        muro.add(parteInferior);
        muro.add(parteSuperior);

        return muro;
    }



}

export { Terreno };