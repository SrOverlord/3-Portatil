
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import * as TWEEN from "../libs/tween.esm.js";



// Clases de mi proyecto

import { Humano } from '../Modelos/Humano/Humano.js'
import { Terreno } from './Terreno.js'
import { Mapa } from './Mapa.js'
import { Runner } from '../Modelos/Humano/Runner.js'


/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */


class MyScene extends THREE.Scene {
  constructor(myCanvas) {
    super();

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    this.animacionBailar = true;
    // Se añade a la gui los controles para manipular los elementos de esta clase
    // this.gui = this.createGUI();

    this.estadoJuego = "PARADO";
    // Construimos los distinos elementos que tendremos en la escena

    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights();

    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
    // this.humano = new Humano(this.gui, "Controles del humano");

    this.humano = new Runner(this.gui, "Controles del humano");
    this.humano.scale.set(12, 12, 12);
    this.add(this.humano);
    this.velocidad = 4;
    this.alturaSalto = 40;


    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera();



    //Fondo del escenario
    var path = "../cubeMap4/";
    var format = '.jpg';
    var urls = [
      path + 'negx' + format, path + 'posx' + format,
      path + 'posy' + format, path + 'negy' + format,
      path + 'negz' + format, path + 'posz' + format,
    ];
    var textureCube = new THREE.CubeTextureLoader().load(urls);

    textureCube.rotationY = Math.PI / 2;
    this.background = textureCube;


    //RayCaster
    this.rayo = new THREE.Raycaster();
    this.rayo.set(new THREE.Vector3(0, 3, 0), new THREE.Vector3(0, 0, 1)); //En Infinito
    this.rayoIzda = new THREE.Raycaster();
    this.rayoIzda.set(new THREE.Vector3(0, 3, 0), new THREE.Vector3(1, 0, 0));
    this.rayoDcha = new THREE.Raycaster();
    this.rayoDcha.set(new THREE.Vector3(0, 3, 0), new THREE.Vector3(-1, 0, 0));



    //Niebla
    // var fog = new THREE.Fog(0x858284, 0.015, 1500);
    // this.fog = fog;

    //Fondo del escenario
    var texture = new THREE.TextureLoader().load('../cubeMap4/negz.jpg');
    var materialFondo = new THREE.MeshBasicMaterial({ map: texture });
    var fondoGeom = new THREE.BoxGeometry(1700, 700, 1);
    fondoGeom.translate(0, 75, 900);
    this.fondo = new THREE.Mesh(fondoGeom, materialFondo);
    this.add(this.fondo);


    //Mapa del juego
    this.mapa = new Mapa(this.gui, "Controles del mapa");
    this.add(this.mapa);


  }

  createCamera() {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    // Y hacia dónde mira
    var look = new THREE.Vector3(0, 0, 50);
    this.camera.lookAt(look);
    this.humano.add(this.camera);
    // this.add(this.camera);
    this.camera.position.set(0, 6, -10);

    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls(this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
    this.cameraControl.update();
  }

  createGUI() {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();

    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightIntensity: 0.5,
      MostrarHumano: true,
      RotacionCamara: false,
      JugarParar: false,
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder('Luz y Ejes');

    // Se le añade un control para la intensidad de la luz
    folder.add(this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');

    // Y otro para mostrar u ocultar los ejes
    folder.add(this.guiControls, 'MostrarHumano').name('Mostrar humano : ');
    folder.add(this.guiControls, 'RotacionCamara').name('Rotar camara con el raton : ');

    var comienzoCtrl = folder
      .add(this.guiControls, "JugarParar")
      .name("Empezar/Parar: ");


    comienzoCtrl.onChange(() => {
      // this.controlAnimacionPersonaje();
      if (this.guiControls.JugarParar == true) {

        this.humano.fadeToAction("Correr", true, 1.3);
        this.mapa.updateVelocidad(this.velocidad);
      } else {

        this.mapa.updateVelocidad(0);
        this.humano.fadeToAction("Correr", false, 1);
      }
    });

    return gui;
  }



  createLights() {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var posx = 0;
    var posy = 100;
    var posz = -200;
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add(ambientLight);

    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    // this.spotLight = new THREE.SpotLight(0xffffff, this.guiControls.lightIntensity);
    this.spotLight = new THREE.SpotLight(0xffffff, 0.8);
    this.spotLight.position.set(posx, posy, posz);
    var luzGeom = new THREE.SphereBufferGeometry(5, 10, 10);
    luzGeom.translate(posx, posy, posz);
    var luz = new THREE.Mesh(luzGeom);
    this.add(luz);
    this.add(this.spotLight);
  }

  createRenderer(myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();

    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);

    return renderer;
  }

  getCamera() {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }

  setCameraAspect(ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }

  detectarColisiones() {
    this.detectarColisionesTerreno(this.mapa.terreno1);
    this.detectarColisionesTerreno(this.mapa.terreno2);
    this.detectarColisionesTerreno(this.mapa.terreno3);
  }

  detectarColisionesTerreno(terreno) {
    var obstaculos = [];
    obstaculos[0] = terreno.tren1;
    obstaculos[1] = terreno.tren2;
    obstaculos[2] = terreno.tren3;
    obstaculos[3] = terreno.valla1;
    obstaculos[4] = terreno.valla2;
    obstaculos[5] = terreno.valla3;

    //Comprobamos la colision frontal
    var obstaculoIntersectadoFrontal = this.rayo.intersectObjects(obstaculos, true);
    if (obstaculoIntersectadoFrontal.length > 0) {
      for (let i = 0; i < obstaculoIntersectadoFrontal.length; i++) {

        if (obstaculoIntersectadoFrontal[i].distance < 5) {
          //Si el objeto al que pertenece el Mesh es visible detectamos la colision
          if (obstaculoIntersectadoFrontal[0].object.parent.visible == true) {
            console.log("FIN DE LA PARTIDA")
            this.finalizarJuego();
            if(this.mov1finish == false || this.mov1finish == false){

              this.movimiento1.stop();
              this.movimiento2.stop();
            }
            setTimeout(() => {
              alert("Fin de la partida. Tu puntuacion ha sido de " + document.getElementById("puntuacion").innerHTML);
              location.reload();
            }, 1500);
          }
        }
      }
    }
    //Comprobamos la colision izquierda
    var obstaculoIntersectadoIzquierda = this.rayoIzda.intersectObjects(obstaculos, true);
    if (obstaculoIntersectadoIzquierda.length > 0) {
      for (let i = 0; i < obstaculoIntersectadoIzquierda.length; i++) {

        if (obstaculoIntersectadoIzquierda[i].distance < 5) {
          //Si el objeto al que pertenece el Mesh es visible detectamos la colision
          if (obstaculoIntersectadoIzquierda[0].object.parent.visible == true) {
            console.log("Colision por la izquierda")
            this.finalizarJuegoDerecha();
            setTimeout(() => {
              alert("Fin de la partida. Tu puntuacion ha sido de " + document.getElementById("puntuacion").innerHTML);
              location.reload();
            }, 1500);
            this.movDerecha2 = true
            this.movDerecha1 = true;
            this.movimiento.stop();
            this.movimiento1.stop();
            this.movimiento2.stop();

          }
        }
      }
    }

    //Comprobamos la colision derecha
    var obstaculoIntersectadoDerecha = this.rayoDcha.intersectObjects(obstaculos, true);
    if (obstaculoIntersectadoDerecha.length > 0) {
      for (let i = 0; i < obstaculoIntersectadoDerecha.length; i++) {

        if (obstaculoIntersectadoDerecha[i].distance < 5) {
          //Si el objeto al que pertenece el Mesh es visible detectamos la colision
          if (obstaculoIntersectadoDerecha[0].object.parent.visible == true) {
            console.log("Colision por la derecha")
            this.finalizarJuegoIzquierda();
            setTimeout(() => {
              alert("Fin de la partida. Tu puntuacion ha sido de " + document.getElementById("puntuacion").innerHTML);
              location.reload();
            }, 1500);
            this.movDerecha2 = true
            this.movDerecha1 = true;
            this.movimiento.stop();
            this.movimiento1.stop();
            this.movimiento2.stop();
          }
        }
      }
    }
  }

  

  onWindowResize() {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect(window.innerWidth / window.innerHeight);

    // Y también el tamaño del renderizador
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  update() {

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.

    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

    //TWEEN para la animación de la cámara y el personaje
    TWEEN.update();

    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    // this.spotLight.intensity = this.guiControls.lightIntensity;

    //Se muestra o no el humano 
    this.humano.visible = true;

    // Se actualiza la posición de la cámara según su controlador
    // if (this.guiControls.RotacionCamara) {
    //   this.cameraControl.update();
    // }


    // Se actualiza el resto del modelo
    this.humano.update();

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render(this, this.getCamera());

    this.mapa.update();
    this.detectarColisiones();



  }

  //___________________________________Movimiento del Humano________________________

  moverPersonaje(pos) {
    //Comprobamos el tipo de movimiento
    if (pos == "derecha") {
      this.movimientoDerecha();
    } else if (pos == "izquierda") {
      this.movimientoIzquierda();
    } else if (pos == "arriba") {
      this.movimientoArriba();
    }

  }

  //Movimiento definido para la concatenacion del salto al movimiento lateral
  movimientoAux(des) {
    if ((this.mov1finish == false || this.mov2finish == false ) && this.humano.position.y >= 1) { // Si esta saltando
      this.setPosicionHumanoMientrasSalto(this.humano.posicion, des)
    } else {
      this.setPosicionHumano(des, this.humano.posicion, this.camera);
    }
  }

  movimientoDerecha() {
    if (this.humano.posicion[0] <= 0) { //Posicicion Incial Centro --> Des: Carril Derecho
      this.movimientoAux(Array(-this.mapa.terreno1.anchuraCarril, 0, 0));

    } else {
      if (this.humano.posicion[0] <= this.mapa.terreno1.anchuraCarril) { //Posicicion Incial Izquierdo --> Des: Carril Centro
        this.movimientoAux(Array(0, 0, 0));
      }
    }
  }

  movimientoIzquierda() {
    if (this.humano.posicion[0] >= 0 && this.humano.posicion[2] == 0) { //Posicicion Incial Centro --> Des: Carril Izquierdo
      this.movimientoAux(Array(this.mapa.terreno1.anchuraCarril, 0, 0));

    } else {
      if (this.humano.posicion[0] >= -this.mapa.terreno1.anchuraCarril) { //Posicicion Incial Derecho --> Des: Carril Centro
        this.movimientoAux(Array(0, 0, 0));
      }
    }
  }


  movimientoArriba() {

    if (this.humano.position.y < 1 && this.movDerecha1 && this.movDerecha2 && this.movIzquierda1 && this.movIzquierda2) {
      this.animacionSaltar(Array(this.humano.posicion[0], this.alturaSalto, this.humano.posicion[2]), this.humano.posicion);
      this.animacionSaltarYCorrer(2.5, 1.3);

    } else if (this.humano.position.y < 1 && !this.movDerecha1) {       //Derecha 1 (Centro) 
      this.movimientoArribaAux(Array(0, 0, 0))

    } else if (this.humano.position.y < 1 && !this.movDerecha2) {       //Derecha 2(Derecha)
      this.movimientoArribaAux(Array(-this.mapa.terreno1.anchuraCarril, 0, 0))

    } else if (this.humano.position.y < 1 && !this.movIzquierda1) {       //Izquierda 1 ( Centro)
      this.movimientoArribaAux(Array(0, 0, 0))

    } else if (this.humano.position.y < 1 && !this.movIzquierda2) {       //Izquierda 2 (Izquierda)
      this.movimientoArribaAux(Array(this.mapa.terreno1.anchuraCarril, 0, 0))
    }
  }

  animacionSaltarYCorrer(saltar, correr) {
    this.humano.fadeToAction("Saltar", false, saltar);
    this.humano.fadeToAction("Correr", true, correr);
  }

  movimientoArribaAux(desSalto) {
    this.mov1finish = false
    this.setPosicionHumanoMientrasSalto(this.humano.posicion, desSalto);
    this.animacionSaltarYCorrer(2.5, 1.3);
  }



  //______________________________________Funciones Auxiliares Movimiento Humano_____________________

  //Establecemos el inicio de un movimiento lateral

  marcarInicioMovimientoLateral(des, ini) {
    //Elección de movimiento 
    switch (des[0]) {
      case -35:
        this.movDerecha2 = false;
        break;
      case 35:
        this.movIzquierda2 = false;
        break;
      case 0:
        if (ini[0] >= -35 && ini[0] < 0) {
          this.movIzquierda1 = false;
        } else if (ini[0] <= -35 && ini[0] > 0) {
          this.movDerecha1 = false;
        }
        break;
    }
  }



  //Metodo para establecer los movientos laterales como finalizados
  finalizarMovimientosLaterales() {
    this.movDerecha2 = true
    this.movIzquierda2 = true;
    this.movIzquierda1 = true;
    this.movDerecha1 = true;
  }

  //Funcion para ejecutar el cambio posicion de elmentos 
  moverHumanoRayos(pos) {
    this.humano.position.set(pos[0], pos[1], pos[2]);
    this.rayo.set(new THREE.Vector3(pos[0], pos[1], pos[2]), new THREE.Vector3(0, 0, 1));
    this.rayoIzda.set(new THREE.Vector3(pos[0], pos[1], pos[2]), new THREE.Vector3(1, 0, 0));
    this.rayoDcha.set(new THREE.Vector3(pos[0], pos[1], pos[2]), new THREE.Vector3(-1, 0, 0));
    this.humano.posicion = Array(pos[0], pos[1], pos[2]);
  }

  //Brief: Funcion basada en el movimiento lateral, definimos animación de movimiento haci el lateral o centro enviado por posición de destino
  // Parametros:
  // - des --> Destino 
  // - ini --> Posicion de inicio

  setPosicionHumano(des, ini) {

    //declaramos variables 
    var origen = ini;
    var destino = des;

    //Marcamos inicio movimiento
    this.marcarInicioMovimientoLateral(des, ini);

    //Declaramos movimiento
    this.movimiento = new TWEEN.Tween(origen).to(destino, 200).easing(TWEEN.Easing.Quadratic.InOut);

    this.movimiento.onUpdate(() => {
      this.humano.position.set(origen[0], origen[1], origen[2]);
      this.rayo.set(new THREE.Vector3(origen[0], origen[1], origen[2]), new THREE.Vector3(0, 0, 1));
      this.rayoIzda.set(new THREE.Vector3(origen[0], origen[1], origen[2]), new THREE.Vector3(1, 0, 0));
      this.rayoDcha.set(new THREE.Vector3(origen[0], origen[1], origen[2]), new THREE.Vector3(-1, 0, 0));

      if (this.humano.position.x == destino[0]) {
        this.finalizarMovimientosLaterales();
      }
    })
    this.movimiento.start();

  }



  //Brief:  Definimos la funcion basada en el cambio de movimiento lateral mientras saltamos
  //        Para esta función pensaremos en la existencia de dos movimientos
  //        - Uno: Nos movemos lateralmente mientras estamos saltando hacia arriba
  //        - Dos: Nos movemos lateralmente miestra estamos cayendo
  //Habilitamos uno de los dos movimientos en caso de realizar una acción u otra 
  //Parametros: 
  //- ini: Posición de origen desde comenzamos la animación 
  //- Des: Destino de aterrizaje.

  setPosicionHumanoMientrasSalto(ini, des) {

    //Mientras salto arriba
    var origen = ini;
    var destino = des;

    //Paramos animaciones anteriores
    // this.movimiento.stop();
    this.movimiento1.stop();
    this.movimiento2.stop();


    //Movimiento Ascendente 
    this.movimiento1 = new TWEEN.Tween({ x: this.humano.position.x, y: this.humano.position.y, z: this.humano.position.z }).to({ x: destino[0] / 2, y: this.alturaSalto, z: destino[2] }, 200).easing(TWEEN.Easing.Linear.None);

    //Movimiento Descendente --> Elegimos entre intentar formar una curva en el movimiento o movimiento lineal hacia la posicion 
    if (this.mov1finish == false) {
      this.movimiento2 = new TWEEN.Tween({ x: destino[0] / 2, y: this.alturaSalto, z: destino[2] }).to({ x: destino[0], y: 0, z: destino[2] }, 150).easing(TWEEN.Easing.Quadratic.Out);
    } else {
      this.movimiento2 = new TWEEN.Tween({ x: this.humano.position.x, y: this.humano.position.y, z: this.humano.position.z }).to({ x: destino[0], y: 0, z: destino[2] }, 250).easing(TWEEN.Easing.Quadratic.InOut);

    }

    //Enlazamos movimientos
    this.movimiento1.chain(this.movimiento2);

    //Subir
    this.movimiento1.onUpdate(() => {
      this.moverHumanoRayos(Array(this.movimiento1._object.x, this.movimiento1._object.y, this.movimiento1._object.z));

      //Establecemos como terminada animación
      if (this.movimiento1._object.y >= destino[1]) {
        this.mov1finish = true;
        this.finalizarMovimientosLaterales();
      }
    })

    //Bajar
    this.movimiento2.onUpdate(() => {
      this.moverHumanoRayos(Array(this.movimiento2._object.x, this.movimiento2._object.y, this.movimiento2._object.z));

      //Establecemos como terminada animación
      if (this.movimiento2._object.y <= 0) {
        this.mov2finish = true;
        this.finalizarMovimientosLaterales();
      }
    })

    //Eleccion de moviento 
    if (this.mov1finish == false) {
      this.movimiento1.start(); // Ascendente 
    } else {
      this.movimiento2.start(); //descendente 
    }
  }


  // Breaf: La funcion animación de salto es una función basada en la encadenación de dos movimientos por TWEEN 
  //        - Uno de ellos basado en subir 
  //        - Otro basado en bajar 
  // Se Optó por esta opción para saber la posicion de nuestro Humano en caso de tener que co
  // Cortar la animación por cualquiera de los otros movimientos 
  // Recibimos como parámetros:
  // -ini --> Inicio inicio de donde se parte 
  // -Des --> Destino de salto que normalmente es la posición de de donde se partió

  animacionSaltar(des, ini) {

    //Inicio salto
    this.mov1finish = false;
    this.mov2finish = false;
    var origen = ini;
    var destino = des;

    //Declaramos movimientos
    this.movimiento1 = new TWEEN.Tween({ x: this.humano.position.x, y: origen[1], z: this.position.z }).to({ x: destino[0], y: this.alturaSalto, z: destino[2] }, 300).easing(TWEEN.Easing.Quadratic.InOut);
    this.movimiento2 = new TWEEN.Tween({ x: destino[0], y: this.alturaSalto, z: destino[2] }).to({ x: destino[0], y: 0, z: destino[2] }, 300).easing(TWEEN.Easing.Quadratic.InOut).onComplete(
      this.humano.posicion[1] = 0.000,
      this.humano.position.y = 0.000
    );

    //Enlazamos movimientos
    this.movimiento1.chain(this.movimiento2);

    //Subir
    this.movimiento1.onUpdate(() => {
      this.moverHumanoRayos(Array(this.movimiento1._object.x, this.movimiento1._object.y, this.movimiento1._object.z));
      //Establecemos como terminada animación
      if (this.movimiento1._object.y >= destino[1]) {
        this.mov1finish = true;
      }
    })

    //Bajar
    this.movimiento2.onUpdate(() => {
      this.moverHumanoRayos(Array(this.movimiento2._object.x, this.movimiento2._object.y, this.movimiento2._object.z));
      //Establecemos como terminada animación
      if (this.movimiento2._object.y <= 0) {
        this.mov2finish = true;
      }
    })

    this.movimiento1.start();

  }

  //__________________________Inicio del Juego______________________________

  inicializarVariables() {
    this.movDerecha2 = true
    this.movIzquierda2 = true;
    this.movIzquierda1 = true;
    this.movDerecha1 = true;
    this.movimiento;
  }

  iniciarJuego() {
    this.humano.fadeToAction("Correr", true, 1.3);
    this.mapa.updateVelocidad(this.velocidad);
    this.inicializarVariables();
  }
  finalizarJuego() {
    this.humano.fadeToAction("Caer", false, 2);
    this.mapa.updateVelocidad(0);
    this.moverHumanoRayos(Array(this.humano.position.x, this.humano.position.y, this.humano.position.z - 10));
   
  }
  finalizarJuegoDerecha() {
    this.humano.fadeToAction("CaerDerecha", false, 2);
    this.mapa.updateVelocidad(0);
    this.moverHumanoRayos(Array(this.humano.position.x-(-(-10)), this.humano.position.y, this.humano.position.z - 10));

  }
  finalizarJuegoIzquierda() {
    this.humano.fadeToAction("CaerIzquierda", false, 2);
    this.mapa.updateVelocidad(0);
    this.moverHumanoRayos(Array(this.humano.position.x+10, this.humano.position.y, this.humano.position.z - 10));
  
  }

  //___________________________Listeners y Acciones______________________________

  //__________________Control Por Ratón_______________
  onMouseDown(event) {
    if (this.estadoJuego == "JUGANDO") {

      this.mouseini = new THREE.Vector2();
      this.mouseini.x = (event.clientX);
      this.mouseini.y = (event.clientY);
    }
  }

  //Movimiento del personaje con el raton
  onMouseUp(event) {
    this.mousefin = new THREE.Vector2();
    this.mousefin.x = (event.clientX);
    this.mousefin.y = (event.clientY);


    //Obtenemos la direccion 
    var dif = new THREE.Vector2();
    dif.x = this.mouseini.x - this.mousefin.x;
    dif.y = this.mouseini.y - this.mousefin.y;

    //Comprobamos el tipo de operacion HORIZONTAL/VERTICAL
    if (Math.abs(dif.x) > Math.abs(dif.y)) {
      //Movimiento HORIZONTAL
      if (dif.x > 0) {
        //Movimiento izquierda
        this.moverPersonaje("izquierda")
      } else {
        //Movimiento derecha
        this.moverPersonaje("derecha")
      }
    } else {
      if (dif.y > 0) {
        //Arriba
        this.moverPersonaje("arriba")
      } else {
        //Abajo
      }
    }


  }

  //________________________Control Personaje Teclas______________

  onkeyPress(event) {
    var key = event.which || event.keyCode;
    if (this.estadoJuego == "JUGANDO") {

      if (event.keyCode == 37) {

        this.moverPersonaje("izquierda")
      } else {

        if (event.keyCode == 39) {

          this.moverPersonaje("derecha")
        } else {
          if (event.keyCode == 38) {

            this.moverPersonaje("arriba");
          }

        }
      }
    } else {
      //INICIO DE LA PARTIDA
      //tecla espacio
      if (event.keyCode == 32) {
        if (this.estadoJuego == "PARADO") {
          this.partidaEmpezada = false;
          this.iniciarJuego();
          document.getElementById("Mensaje").style.display = "none";
          document.getElementById("Mensaje-empezar").style.display = "none";
          document.getElementById("Ayuda").style.display = "none";
          this.estadoJuego = "JUGANDO"
        }

      } else {
        if (event.keyCode == 65 && this.estadoJuego == "PARADO") {

          if (document.getElementById("Ayuda").style.display == "none") {

            document.getElementById("Ayuda").style.display = "block"
          } else {

            document.getElementById("Ayuda").style.display = "none"
          }
        }
      }
    }
  }
}


//-___________________________________Función Main____________________
$(function () {


  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener("resize", () => scene.onWindowResize());
  window.addEventListener("mousedown", (event) => scene.onMouseDown(event));
  window.addEventListener("mouseup", (event) => scene.onMouseUp(event));
  window.addEventListener("keydown", (event) => scene.onkeyPress(event));
  // Que no se nos olvide, la primera visualización.
  scene.update();
});

