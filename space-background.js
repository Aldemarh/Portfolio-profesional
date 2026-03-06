// Espacio 3D en movimiento
import * as THREE from 'three';

// Configuración básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Añadir al DOM
const container = document.getElementById('space-background');
if (container) {
    container.appendChild(renderer.domElement);
}

// Crear estrellas
const geometry = new THREE.BufferGeometry();
const count = 2000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    transparent: true,
    opacity: 0.8
});

const stars = new THREE.Points(geometry, material);
scene.add(stars);

// Posición de la cámara
camera.position.z = 30;

// Animación
function animate() {
    requestAnimationFrame(animate);

    // Rotación suave
    stars.rotation.x += 0.001;
    stars.rotation.y += 0.001;

    renderer.render(scene, camera);
}

// Manejar resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iniciar animación
animate();