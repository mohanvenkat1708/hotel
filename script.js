import * as THREE from 'three';
import { GLTFLoader } from "https://cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // White light with intensity 0.5
directionalLight.position.set(1, 1, 1); // Set light direction
scene.add(directionalLight);

const loader = new GLTFLoader();
loader.load('scene.gltf', function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    // Center the model in the scene
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    // Wait for the model to load before rendering
    animate();
});

camera.position.z = 5;

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

const animate = function () {
    requestAnimationFrame(animate);
    controls.update(); // Update controls in the animation loop
    renderer.render(scene, camera);
};

// Handle window resize event
window.addEventListener('resize', function () {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
});

animate();
