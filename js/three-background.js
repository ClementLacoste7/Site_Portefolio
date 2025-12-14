/**
 * THREE.JS BACKGROUND
 * Animation 3D de particules et formes géométriques en arrière-plan
 */

// ===================================
// CONFIGURATION DE LA SCÈNE
// ===================================
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();

// Caméra perspective
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 30;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ===================================
// CRÉATION DES PARTICULES
// ===================================
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

// Positionner les particules aléatoirement
for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(posArray, 3)
);

// Matériau des particules avec couleur gradient
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    color: 0x6366f1,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// ===================================
// CRÉATION DES FORMES GÉOMÉTRIQUES FLOTTANTES
// ===================================
const geometries = [];

// Torus
const torusGeometry = new THREE.TorusGeometry(5, 1, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-15, 10, -10);
scene.add(torus);
geometries.push(torus);

// Icosahedron
const icosahedronGeometry = new THREE.IcosahedronGeometry(4, 0);
const icosahedronMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
icosahedron.position.set(15, -10, -15);
scene.add(icosahedron);
geometries.push(icosahedron);

// Octahedron
const octahedronGeometry = new THREE.OctahedronGeometry(3, 0);
const octahedronMaterial = new THREE.MeshStandardMaterial({
    color: 0xec4899,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
octahedron.position.set(0, 15, -20);
scene.add(octahedron);
geometries.push(octahedron);

// Tetrahedron
const tetrahedronGeometry = new THREE.TetrahedronGeometry(3, 0);
const tetrahedronMaterial = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const tetrahedron = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
tetrahedron.position.set(-10, -15, -12);
scene.add(tetrahedron);
geometries.push(tetrahedron);

// ===================================
// ÉCLAIRAGE
// ===================================
// Lumière ambiante
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Lumière directionnelle
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Lumière ponctuelle avec couleur
const pointLight1 = new THREE.PointLight(0x6366f1, 2, 50);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xec4899, 2, 50);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

// ===================================
// CRÉATION D'UN RÉSEAU DE LIGNES (GRID)
// ===================================
function createConnectionLines() {
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.15
    });

    const positions = particlesGeometry.attributes.position.array;
    const connections = [];

    // Créer des connexions entre particules proches
    for (let i = 0; i < particlesCount; i++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];

        for (let j = i + 1; j < particlesCount; j++) {
            const x2 = positions[j * 3];
            const y2 = positions[j * 3 + 1];
            const z2 = positions[j * 3 + 2];

            const distance = Math.sqrt(
                Math.pow(x2 - x1, 2) +
                Math.pow(y2 - y1, 2) +
                Math.pow(z2 - z1, 2)
            );

            // Connecter seulement les particules proches
            if (distance < 10 && Math.random() > 0.98) {
                const lineGeometry = new THREE.BufferGeometry();
                const linePositions = new Float32Array([
                    x1, y1, z1,
                    x2, y2, z2
                ]);
                lineGeometry.setAttribute(
                    'position',
                    new THREE.BufferAttribute(linePositions, 3)
                );
                const line = new THREE.Line(lineGeometry, linesMaterial);
                scene.add(line);
                connections.push(line);

                // Limiter le nombre de connexions pour les performances
                if (connections.length > 50) break;
            }
        }
        if (connections.length > 50) break;
    }
}

createConnectionLines();

// ===================================
// INTERACTION AVEC LA SOURIS
// ===================================
const mouse = { x: 0, y: 0 };

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// ===================================
// ANIMATION LOOP
// ===================================
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.001;

    // Rotation des particules
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0003;

    // Animation des formes géométriques
    geometries.forEach((geometry, index) => {
        geometry.rotation.x += 0.003 * (index + 1);
        geometry.rotation.y += 0.002 * (index + 1);

        // Mouvement de flottement
        geometry.position.y += Math.sin(time * 2 + index) * 0.02;
        geometry.position.x += Math.cos(time * 2 + index) * 0.02;
    });

    // Rotation du torus avec effet ondulant
    torus.rotation.x += 0.005;
    torus.rotation.y += 0.003;

    // Mouvement de la caméra en fonction de la souris
    camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Animation des lumières
    pointLight1.position.x = Math.sin(time * 3) * 20;
    pointLight1.position.z = Math.cos(time * 3) * 20;

    pointLight2.position.x = Math.cos(time * 2) * 20;
    pointLight2.position.z = Math.sin(time * 2) * 20;

    // Effet de pulsation des particules
    particlesMaterial.opacity = 0.6 + Math.sin(time * 2) * 0.2;

    renderer.render(scene, camera);
}

animate();

// ===================================
// RESPONSIVE - RESIZE HANDLER
// ===================================
window.addEventListener('resize', () => {
    // Mettre à jour la taille du renderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Mettre à jour l'aspect ratio de la caméra
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// ===================================
// SCROLL EFFECT - PARALLAX 3D
// ===================================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Rotation de la scène en fonction du scroll
    particlesMesh.rotation.y = scrollY * 0.0003;

    // Déplacement des formes géométriques
    geometries.forEach((geometry, index) => {
        geometry.position.z = -10 - (scrollY * 0.01 * (index + 1));
    });
});

// ===================================
// PERFORMANCE - QUALITY ADJUSTMENT
// ===================================
// Réduire la qualité sur mobile pour meilleures performances
if (window.innerWidth < 768) {
    // Réduire le nombre de particules sur mobile
    const mobileParticlesCount = 300;
    const mobilePositions = new Float32Array(mobileParticlesCount * 3);

    for (let i = 0; i < mobileParticlesCount * 3; i++) {
        mobilePositions[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(mobilePositions, 3)
    );

    // Augmenter la taille des particules sur mobile
    particlesMaterial.size = 0.25;

    // Réduire le pixel ratio sur mobile
    renderer.setPixelRatio(1);
}

// ===================================
// EXPORT POUR CONTRÔLE EXTERNE (OPTIONNEL)
// ===================================
window.threeBackground = {
    scene: scene,
    camera: camera,
    renderer: renderer,
    particlesMesh: particlesMesh,
    geometries: geometries,
    pause: function() {
        renderer.setAnimationLoop(null);
    },
    resume: function() {
        renderer.setAnimationLoop(animate);
    }
};

// Log de confirmation
console.log('%c✨ Three.js Background Loaded ✨', 'color: #6366f1; font-size: 16px; font-weight: bold;');
