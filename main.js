import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // White light with intensity 0.5
scene.add(ambientLight);

// Optional: Add a directional light for more dramatic lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3); // White light with intensity 0.3
directionalLight.position.set(5, 10, 3); // Set the directional light position
scene.add(directionalLight);

// Load the GLTF model
const loader = new GLTFLoader();
loader.load('./assets/level1.glb', (glb) => {
  const model = glb.scene;
  scene.add(model);

  // Optional: adjust model position and scale as needed
  model.position.set(0, 0, 0); // Position the model in the center
  model.scale.set(1, 1, 1);  // Adjust model scale if necessary

  // Adjust camera position for better viewing
  camera.position.z = 5;

  // Add OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Render the scene
  function animate() {
    requestAnimationFrame(animate);

    // Update OrbitControls
    controls.update();

    renderer.render(scene, camera);
  }
  animate();
});

// Handle window resize events
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});