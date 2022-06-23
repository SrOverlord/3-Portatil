import * as THREE from '../libs/three.module.js'
import { Terreno } from './Terreno.js'

class Mapa extends THREE.Object3D {

    constructor(gui, titleGui) {
        super();
        // this.createGUI(gui, titleGui);

        this.extrudeMat = new THREE.MeshNormalMaterial();

        //Reloj para la velocidad
        this.reloj = new THREE.Clock();
        // this.velocidad = this.guiControls.velocidad;
        this.velocidadJuego = 0;

        this.terreno1 = new Terreno(this.gui, false);
        this.add(this.terreno1);
        this.terreno2 = new Terreno(this.gui);
        this.terreno2.position.z = this.terreno1.longitudCarril;
        this.add(this.terreno2);
        this.terreno3 = new Terreno(this.gui);
        this.terreno3.position.z = this.terreno1.longitudCarril + this.terreno2.longitudCarril;
        this.add(this.terreno3);

        this.puntuacion = 0;

    }

    createGUI(gui, titleGui) {
        this.guiControls = {
            velocidad: 0,

        }
        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls, 'velocidad', 0, 13, 1).name('Velocidad del terreno').listen();
    }

    updateVelocidad(nueva) {
        this.velocidadJuego = nueva;
    }

    update() {
        var segundosTranscurridos = this.reloj.getDelta();
        this.velocidadReal = this.velocidadJuego * 50;

        this.terreno1.position.z -= this.velocidadReal * segundosTranscurridos;
        this.terreno2.position.z -= this.velocidadReal * segundosTranscurridos;
        this.terreno3.position.z -= this.velocidadReal * segundosTranscurridos;

        if (this.terreno1.position.z <= -this.terreno1.longitudCarril) {
            var pos = this.terreno1.position.z;
            this.terreno1.position.z = (this.terreno1.longitudCarril * 2);
            this.terreno1.generarObstaculos();
            document.getElementById("puntuacion").innerHTML = parseInt(document.getElementById("puntuacion").innerHTML) + 1;
            if (this.velocidadJuego < 10) {
                this.velocidadJuego += 0.1;

            }
            this.updateVelocidad(this.velocidadJuego);
        }

        if (this.terreno2.position.z <= -this.terreno2.longitudCarril) {
            var pos = this.terreno2.position.z;
            this.terreno2.position.z = (this.terreno2.longitudCarril * 2);
            this.terreno2.generarObstaculos();
            document.getElementById("puntuacion").innerHTML = parseInt(document.getElementById("puntuacion").innerHTML) + 1;
            if (this.velocidadJuego < 10) {
                this.velocidadJuego += 0.1;

            }
            this.updateVelocidad(this.velocidadJuego);

        }

        if (this.terreno3.position.z <= -this.terreno3.longitudCarril) {
            var pos = this.terreno3.position.z;
            this.terreno3.position.z = (this.terreno3.longitudCarril * 2);
            this.terreno3.generarObstaculos();
            document.getElementById("puntuacion").innerHTML = parseInt(document.getElementById("puntuacion").innerHTML) + 1;
            if (this.velocidadJuego < 10) {
                this.velocidadJuego += 0.1;

            }
            this.updateVelocidad(this.velocidadJuego);
        }

    }
}

export { Mapa }