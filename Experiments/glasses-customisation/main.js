import './style.css';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from "three";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1500);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambientLight );

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 100, 0);
scene.add(pointLight);


camera.position.set(0, 0, 300); 

controls.update();


//loading glasses
const glasses = new THREE.Group();
let frame_front;
let frame_left;
let frame_right;


function onProgress( xhr ){
  console.log((xhr.loaded/xhr.total*100) + '% loaded');
}

function onError( error ){
  console.log('Error occured.');
}

// const manager = new THREE.LoadingManager( loadModel );

// texture

// const textureLoader = new THREE.TextureLoader( manager );
// const texture = textureLoader.load( 'textures/BF.png' );


const loader = new OBJLoader();
const mtlLoader = new MTLLoader();

function setMeshColor(object, hexcode){
  object.traverse( function ( child ) {

    if ( child.isMesh ) child.material = new THREE.MeshStandardMaterial({ color: hexcode});

  } );
}

function HueToRGB( hue ){
  var variable = hue % 60;
  var i = variable/60 * 255;
  i = Math.round(i);
  // console.log(i);
  var hex_temp = i.toString(16);
  var hex_str = '';



  if (0 <= hue < 60){
    hex_str = "ff" + hex_temp + "00";
  };

  if(60 <= hue < 120){
    hex_str = hex_temp + "ff" + "00";
  };
  
  if (120 <= hue < 180){
    hex_str = "00" + "ff" + hex_temp;
  };

  if (180 <= hue < 240){
    hex_str = "00" + hex_temp + "ff";
  };

  if (240 <= hue < 300){
    hex_str = hex_temp + "00" + "ff";
  };

  if (300 <= hue < 360){
    hex_str = "ff" + "00" + hex_temp;
  };
  console.log(hue);
  console.log(hex_str);
  var hex = parseInt(hex_str, 16); 
  return hex;


}
// mtlLoader.load('models/140frame/front.mtl', function (materials) {
//     materials.preload();
//     loader.setMaterials(materials);

//     Promise.all(
//       [loader.loadAsync( 'models/140frame/front.obj', onProgress),
//       loader.loadAsync( 'models/140frame/templeL.obj', onProgress),
//       loader.loadAsync( 'models/140frame/templeR.obj', onProgress)]
//       ).then( models => {
//       frame_front = models[0];
//       frame_left = models[1];
//       frame_right = models[2];
    
//       glasses.add(frame_front);
//       glasses.add(frame_left);
//       glasses.add(frame_right);
    
//       // offset glasses from center of group so the rotation center point is in the center
//       frame_front.position.x += 50;
//       frame_left.position.x += 50;
//       frame_right.position.x += 50;
    
//       glasses.rotation.set(-Math.PI/2, 0, 0);
    
//       // setMeshColor(frame_front, 0xff0000);
//       // setMeshColor(frame_left, 0x00ff00);
//       // setMeshColor(frame_right, 0x0000ff);
      
//       // glasses.position.set(10, 10, 10);
//       scene.add(glasses);
    
//     })
//   }
// );


mtlLoader.load('models/140frame/front.mtl', 
  (materials) => {
    materials.preload();
    loader.setMaterials(materials);
  },
  onProgress,
  onError);


Promise.all(
  [loader.loadAsync( 'models/frame2/front.obj', onProgress),
  loader.loadAsync( 'models/frame2/templeL.obj', onProgress),
  loader.loadAsync( 'models/frame2/templeR.obj', onProgress)]
  ).then( models => {
  frame_front = models[0];
  frame_left = models[1];
  frame_right = models[2];

  glasses.add(frame_front);
  glasses.add(frame_left);
  glasses.add(frame_right);

  // offset glasses from center of group so the rotation center point is in the center
  frame_front.position.x += 50;
  frame_left.position.x += 50;
  frame_right.position.x += 50;

  // frame_left.position.y += 30;
  // frame_right.position.y += -30;

  glasses.rotation.set(-Math.PI/2, 0, 0);

  setMeshColor(frame_front, 0xb7b7b7);
  setMeshColor(frame_left, 0xdd2222);
  setMeshColor(frame_right, 0xdd2222);
  
  // glasses.position.set(10, 10, 10);
  scene.add(glasses);

})

var x = 0;

const scale_factor = 0.1
document.addEventListener('keypress', onDocumentKeyDown, false);
function onDocumentKeyDown(event){
  if(event.code == 'KeyJ'){
    glasses.scale.x -= scale_factor;
    glasses.scale.y -= scale_factor;
    glasses.scale.z -= scale_factor;
  }
  else if(event.code == 'KeyL'){
    glasses.scale.x += scale_factor;
    glasses.scale.y += scale_factor;
    glasses.scale.z += scale_factor;
  }
}

const circleCurve = new THREE.EllipseCurve(0, 0, 30, 30);
const circleTubeGeom = new THREE.TubeGeometry(circleCurve, 64, 3, 4);
const circleMat = new THREE.MeshBasicMaterial({color: 0xff0000});
const circleTube = new THREE.Mesh(circleTubeGeom, circleMat);
scene.add(circleTube);

function animate() {
  requestAnimationFrame(animate);
  // glasses.rotation.x += 0.01;
  // object.rotation.y += 0.01;
  // var new_color = HueToRGB(x)
  // object.traverse( function ( child ) {

  //   if ( child.isMesh ) child.material = new THREE.MeshBasicMaterial({ color: new_color});

  // } );
  // x = (x + 1) % 360 ;
  renderer.render(scene, camera);
}


animate();