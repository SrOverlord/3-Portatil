
import * as THREE from '../../libs/three.module.js'

class Humano extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);

        var extrudeMat = new THREE.MeshNormalMaterial();
        // Altura y anchura de las cajas
        // this.h = 5.0;
        // this.a = 0.5;

        // Un Mesh se compone de geometría y material
        
        // Esta transformacion es común a ambas piezas y no depende de variables que modifiquen su valor
        // Se aplica la transformación directamente a la geometría antes de crear el Mesh
        
        //Variables de las partes del cuerpo
        var alturaTorso = 8;
        var anchuraTorso = 6;
        var radioCabeza = 3;
        this.posicion= Array(0,0,0);
        //Geometrias 
        var torsoGeom = new THREE.BoxGeometry(anchuraTorso,alturaTorso,anchuraTorso-anchuraTorso/2);
        this.torso = new THREE.Mesh(torsoGeom,extrudeMat);
        var cabezaGeom = new THREE.SphereBufferGeometry(radioCabeza,10,10);
        this.cabeza = new THREE.Mesh(cabezaGeom,extrudeMat);

        this.cabeza.position.set(0,alturaTorso/2+radioCabeza,0);
        

        // Ya podemos construir y enlazar los nodos del modelo jerárquico
        this.brazoIzdo = this.crearBrazo();
        this.brazoDcho = this.crearBrazo();
        this.piernaIzda = this.crearPierna();
        this.piernaDcha = this.crearPierna();

        
        
        this.brazoDcho.rotateZ(Math.PI);
        this.brazoIzdo.position.set((-anchuraTorso/2)-0.5,alturaTorso*0.6/2,0);
        this.brazoDcho.position.set(anchuraTorso/2+0.5,alturaTorso*0.6/2,0);

        this.piernaIzda.position.set(-anchuraTorso/4,-alturaTorso/2,0);
        this.piernaDcha.position.set(anchuraTorso/4,-alturaTorso/2,0);
        // this.penduloSecundario = this.crearPenduloSecundario();
        // this.penduloSecundario.position.z = 0.5; 
        // // this.penduloSecundario.position.y = -3;
        this.cuerpo = new THREE.Object3D();
        this.cuerpo.add(this.torso)
        this.cuerpo.add(this.cabeza)
        this.cuerpo.add(this.brazoIzdo)
        this.cuerpo.add(this.brazoDcho)
        this.cuerpo.add(this.piernaIzda);
        this.cuerpo.add(this.piernaDcha);
        // this.Pendulos.add(this.penduloSecundario);
        var pos = Array(0,11,0);
        this.setPosicion(pos);
        // this.cuerpo.position.set(0,11,0);
        

        this.add(this.cuerpo);

        

    }

    crearBrazo(){
        var extrudeMat = new THREE.MeshNormalMaterial();
        var brazo = new THREE.Object3D();

        //Geometrias
        var hombroGeom = new THREE.SphereBufferGeometry(1,10,10);
        var brazoSuperiorGeom = new THREE.CylinderBufferGeometry(0.5,0.8,3,10);
        
        brazoSuperiorGeom.rotateZ(Math.PI/2);
        brazoSuperiorGeom.translate(-1.5,0,0);
        
        //Meshes
        var brazoInferior = this.crearBrazoInferior();
        brazoInferior.position.x= -3;
        
        var brazoSuperior = new THREE.Mesh(brazoSuperiorGeom,extrudeMat);
        var hombro = new THREE.Mesh(hombroGeom,extrudeMat);

        brazo.add(brazoInferior);
        brazo.add(brazoSuperior);
        brazo.add(hombro);
        
        return brazo;
    }

    crearBrazoInferior(){
        var extrudeMat = new THREE.MeshNormalMaterial();
        //Objeto Final
        var brazoInferior = new THREE.Object3D();

        //Geometrias basicas;
        var manoGeom = new THREE.SphereBufferGeometry(0.6,10,10);
        var antebrazoGeom = new THREE.CylinderBufferGeometry(0.5,0.5,3,10);
        var codoGeom = new THREE.SphereBufferGeometry(0.5,10,10);

        antebrazoGeom.rotateZ(Math.PI/2);

        manoGeom.translate(-3.3,0,0);
        antebrazoGeom.translate(-1.5,0,0);
        
        var mano = new THREE.Mesh(manoGeom, extrudeMat);
        var antebrazo = new THREE.Mesh(antebrazoGeom, extrudeMat);
        var codo = new THREE.Mesh(codoGeom, extrudeMat);

        brazoInferior.add(antebrazo);
        brazoInferior.add(mano);
        
        return brazoInferior;
    }

    crearPierna(){
        var extrudeMat = new THREE.MeshNormalMaterial();
        var finalObject = new THREE.Object3D();

        //Meshes
        var antePierna = this.crearAntePierna();
        var piernaInferior = this.createPiernaInferior();
        
        piernaInferior.position.set(0,-3,0);
        
        finalObject.add(antePierna);
        finalObject.add(piernaInferior);

        return finalObject;
        
    }

    crearAntePierna(){


        var extrudeMat = new THREE.MeshNormalMaterial();
        var  finalObject = new THREE.Object3D();

        //Geometrias basicas 
        var musloGeom = new THREE.CylinderBufferGeometry(0.8,0.6,3,10);

        //Tranformaciones  Geometria
        musloGeom.translate(0,-1.5,0);
        
        //Creacion Mesh
        var  muslo = new THREE.Mesh(musloGeom, extrudeMat);
        finalObject.add(muslo);
         
        return finalObject;
    }

    createPiernaInferior(){
        
        var extrudeMat = new THREE.MeshNormalMaterial();
        var finalObject = new THREE.Object3D();
        
        //Creacion de geometrias
        var piernaGeom = new THREE.CylinderBufferGeometry(0.6,0.4,3,10);
        var rodillaGeom  = new THREE.SphereBufferGeometry(0.5,10,10);

        //Geom Pie
        var pieGeom = new THREE.SphereBufferGeometry(0.8,10,10);

        
        //Transformaciones geometria
        piernaGeom.translate(0,-1.5,0 );
        
        var pierna = new THREE.Mesh(piernaGeom,extrudeMat);
        var rodilla = new THREE.Mesh( rodillaGeom, extrudeMat);
        var pie = new THREE.Mesh(pieGeom, extrudeMat);

        //Transformacion objeto 
        pie.position.set(0,-3.5,0);
        
        finalObject.add(pierna);
        finalObject.add(rodilla);
        finalObject.add(pie);

        return finalObject;
    }

    setPosicion(pos){
        this.posicion = pos;
        this.cuerpo.position.set(this.posicion[0],this.posicion[1],this.posicion[2]);
    }



}

export { Humano };
