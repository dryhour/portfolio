import * as THREE from "https://unpkg.com/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let object;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

const loader = new GLTFLoader();
loader.load(
  './models/black_hole/scene.gltf',
  (gltf) => {
    object = gltf.scene;
    scene.add(object);
  },
  (xhr) => {
    if (xhr.total) console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => console.error(error)
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

camera.position.z = 10;

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);
  if (object) {
    object.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
    object.rotation.x = -1.2 + (mouseY / window.innerHeight) * 2.5;
  }
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

animate();
