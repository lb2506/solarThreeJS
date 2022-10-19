import React from 'react';
import './App.scss';
import sun_texture from './assets/sun.jpg'
import earth_texture from './assets/earth.jpg'
import moon_texture from './assets/moon.jpg'

// importation de Three 
import * as THREE from 'three';

// important du déplacement orbital avec la souris
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



// mise en place des variables
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const loader = new THREE.TextureLoader(); // texture

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement ); // injection du rendu dans le body

const controls = new OrbitControls( camera, renderer.domElement ); // déplacement orbital avec la souris


// resize auto du canvas
function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );


// on récupère la taille du device

let width = window.innerWidth
console.log(width);


// ajout de l'ambientLight

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.3 );
scene.add( ambientLight );

// ajout du spot

const light = new THREE.PointLight( 0xffffff, 20, 120 );
light.position.set( 0, 0, 0 );
scene.add( light );

// création du soleil


  const sunGeometry = new THREE.SphereGeometry( 15, 32, 16 );
  const sunMaterial = new THREE.MeshBasicMaterial( { map : loader.load(sun_texture) } );
  const sun = new THREE.Mesh( sunGeometry, sunMaterial );
  scene.add( sun );


// création de la terre

  const earthGeometry = new THREE.SphereGeometry( 3, 32, 16 );
  const earthMaterial = new THREE.MeshLambertMaterial( {map : loader.load(earth_texture)} );
  const earth = new THREE.Mesh( earthGeometry, earthMaterial );
  scene.add( earth );



// création de la Lune

  const moonGeometry = new THREE.SphereGeometry( 1, 32, 16 );
  const moonMaterial = new THREE.MeshLambertMaterial( { map : loader.load(moon_texture) } );
  const moon = new THREE.Mesh( moonGeometry, moonMaterial );
  scene.add( moon );


// rotation des planètes

  const rotation = function () {
    requestAnimationFrame(rotation);

    // rotation de la terre autour du soleil

    earth.rotation.y += 0.002;
    earth.position.x = Math.cos(earth.rotation.y) * 100;
    earth.position.z = Math.sin(earth.rotation.y) * 100;
   
    // rotation de la lune autour de la terre

    moon.rotation.y += 0.02

    moon.position.x =  earth.position.x + Math.sin(moon.rotation.y ) * 10;
    moon.position.z = earth.position.z + Math.cos(moon.rotation.y ) * 10;
    moon.position.y = earth.position.y + Math.cos(moon.rotation.y ) * 10;

  }

  rotation()

// réglage de l'affchage de départ suivant le device
if(width <= 600){
camera.position.set(0,0,250);
} else {
camera.position.set(0,0,200);
}

controls.update();

// déplacement avec le clavier
let keyControls = {};
let user = {
  height: 0.5,
  speed: 1,
};

document.addEventListener('keydown', ({ keyCode }) => { keyControls[keyCode] = true });
document.addEventListener('keyup', ({ keyCode }) => { keyControls[keyCode] = false });

function control() {
  
  if(keyControls[40]){ // down
    camera.position.x -= Math.sin(camera.rotation.y) * user.speed;
    camera.position.z -= -Math.cos(camera.rotation.y) * user.speed;
  }
  if(keyControls[38]){ // up
    camera.position.x += Math.sin(camera.rotation.y) * user.speed;
    camera.position.z += -Math.cos(camera.rotation.y) * user.speed;
  }
  if(keyControls[39]){ // left
    camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * user.speed;
    camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * user.speed;
  }
  if(keyControls[37]){ // right
    camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * user.speed;
    camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * user.speed;
  }
  
  
}


function loop() {
  requestAnimationFrame(loop);
  control();
  
  renderer.render(scene, camera);
}

loop();



// création de la PopIn sur desktop

function PopInDesktop(){
  return(
    <div id='popin'>
      <h3>Notice d'utilisation</h3>
      <p>Utilisez les touches du clavier (haut, bas, gauche, droite) et orientez la caméra grâce à la souris</p>
      <button onClick={() => document.getElementById('popin').remove()}>Commencer</button>
    </div>
  )
}

// création de la PopIn sur desktop

function PopInMobile(){
  return(
    <div id='popin'>
      <h3>Notice d'utilisation</h3>
      <p>Déplacez la caméra avec un doigt, utilisez deux doigts pour vous déplacer</p>
      <button onClick={() => document.getElementById('popin').remove()}>Commencer</button>
    </div>
  )
}





export default function App() {

 
  return (
    <>
      <header>
        <p>Test entretien Havas Digital Factory</p>
        <p>Le 13/09/2022</p>
      </header>

      {width >= 600 ?
      
      <PopInDesktop/>

      :

      <PopInMobile/>
      }

      <footer>
        <p>Projet par Léo B.</p>
      </footer>
    </>
  );
}