/**
 * THREE.JS BACKGROUND - AQUARIUM THEME
 * Animation 3D avec poissons GLB qui nagent et suivent la souris
 */

// ===================================
// CONFIGURATION DE LA SCÈNE
// ===================================
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();

// Couleur de fond aquatique
scene.fog = new THREE.Fog(0x0a1628, 10, 100);

// Caméra perspective
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 30;
camera.position.y = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ===================================
// CHARGEMENT DES MODÈLES GLB
// ===================================
const loader = new THREE.GLTFLoader();
const fishModels = [];
let modelsLoaded = 0;
const totalModels = 3;

// Chemins vers les modèles
const modelPaths = [
    'Asset/Goldfish.glb',
    'Asset/Fish.glb',
    'Asset/Fish 2.glb'
];

// Charger tous les modèles
modelPaths.forEach((path, index) => {
    loader.load(
        path,
        (gltf) => {
            fishModels[index] = gltf.scene;
            modelsLoaded++;

            // Quand tous les modèles sont chargés, créer les poissons
            if (modelsLoaded === totalModels) {
                console.log('%c🐠 Tous les modèles de poissons chargés ! 🐠', 'color: #41609E; font-size: 14px; font-weight: bold;');
                createFishes();
            }
        },
        (xhr) => {
            console.log(`Modèle ${index + 1}: ${(xhr.loaded / xhr.total * 100)}% chargé`);
        },
        (error) => {
            console.error(`Erreur lors du chargement du modèle ${path}:`, error);
        }
    );
});

// ===================================
// CLASSE POISSON
// ===================================
class Fish {
    constructor(scene, model) {
        this.scene = scene;
        this.speed = 0.05 + Math.random() * 0.08; // Vitesse augmentée
        this.rotationSpeed = 0.02 + Math.random() * 0.04;
        this.swimOffset = Math.random() * Math.PI * 2;
        this.personalSpace = 15; // Distance à laquelle le poisson réagit à la souris
        this.swimAmplitude = 0.1 + Math.random() * 0.2; // Plus d'amplitude
        this.tailSwimSpeed = 2 + Math.random() * 2; // Vitesse de battement

        // Cloner le modèle
        this.mesh = model.clone();

        // Taille beaucoup plus petite
        const scale = 0.08 + Math.random() * 0.12; // Réduit de ~10x
        this.mesh.scale.set(scale, scale, scale);

        // Appliquer les couleurs du thème
        this.mesh.traverse((child) => {
            if (child.isMesh) {
                // Couleurs variées pour les poissons
                const fishColors = [
                    new THREE.Color(0x41609E), // Bleu principal
                    new THREE.Color(0x5A7BB8), // Bleu clair
                    new THREE.Color(0xF5E6CC), // Beige/sable
                    new THREE.Color(0x6B8DC6), // Bleu moyen
                    new THREE.Color(0xE8D4B8), // Beige foncé
                    new THREE.Color(0x4A7CB8), // Bleu océan
                ];

                const color = fishColors[Math.floor(Math.random() * fishColors.length)];

                if (child.material) {
                    child.material = child.material.clone();
                    child.material.color = color;
                    child.material.emissive = color.clone().multiplyScalar(0.1);
                    child.material.metalness = 0.3;
                    child.material.roughness = 0.7;
                }
            }
        });

        // Position aléatoire
        this.mesh.position.x = (Math.random() - 0.5) * 100;
        this.mesh.position.y = (Math.random() - 0.5) * 60;
        this.mesh.position.z = (Math.random() - 0.5) * 80;

        // Direction de nage initiale
        this.direction = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize();

        // Vitesse de suivi de la souris
        this.mouseAttraction = 0;

        // Stocker la rotation initiale pour les animations
        this.baseRotation = {
            x: this.mesh.rotation.x,
            y: this.mesh.rotation.y,
            z: this.mesh.rotation.z
        };

        scene.add(this.mesh);
    }

    update(time, mousePos3D) {
        // Mouvement de nage ondulatoire plus prononcé
        const swimWave = Math.sin(time * this.tailSwimSpeed + this.swimOffset) * this.swimAmplitude;
        const swimWave2 = Math.sin(time * this.tailSwimSpeed * 1.5 + this.swimOffset) * this.swimAmplitude * 0.5;

        // Appliquer le mouvement de nage sur plusieurs axes (corps qui ondule)
        this.mesh.rotation.z = this.baseRotation.z + swimWave * 0.5;
        this.mesh.rotation.x = this.baseRotation.x + swimWave * 0.3;
        this.mesh.rotation.y = this.baseRotation.y + swimWave2 * 0.2;

        // Calculer la distance à la souris
        const distanceToMouse = this.mesh.position.distanceTo(mousePos3D);

        // Si la souris est proche, attirer le poisson
        if (distanceToMouse < this.personalSpace) {
            this.mouseAttraction = 1 - (distanceToMouse / this.personalSpace);

            // Direction vers la souris
            const dirToMouse = new THREE.Vector3()
                .subVectors(mousePos3D, this.mesh.position)
                .normalize();

            // Interpoler entre direction normale et direction vers souris
            this.direction.lerp(dirToMouse, 0.05 * this.mouseAttraction);
        } else {
            this.mouseAttraction *= 0.95; // Diminuer progressivement l'attraction

            // Comportement de nage aléatoire
            if (Math.random() < 0.01) {
                this.direction.x += (Math.random() - 0.5) * 0.3;
                this.direction.y += (Math.random() - 0.5) * 0.3;
                this.direction.z += (Math.random() - 0.5) * 0.3;
                this.direction.normalize();
            }
        }

        // Vitesse augmentée quand attiré par la souris
        const currentSpeed = this.speed * (1 + this.mouseAttraction * 3);

        // Mouvement de montée et descente aléatoire (comportement réaliste)
        const verticalWave = Math.sin(time * 0.5 + this.swimOffset) * 0.02;

        // Déplacer le poisson
        this.mesh.position.x += this.direction.x * currentSpeed;
        this.mesh.position.y += this.direction.y * currentSpeed + verticalWave;
        this.mesh.position.z += this.direction.z * currentSpeed;

        // Orienter le poisson dans la direction du mouvement
        const targetRotationY = Math.atan2(this.direction.x, this.direction.z);
        const targetRotationX = -Math.asin(this.direction.y);

        // Interpoler la rotation pour un mouvement fluide et rapide
        this.mesh.rotation.y += (targetRotationY - this.mesh.rotation.y) * 0.15;
        this.baseRotation.x += (targetRotationX - this.baseRotation.x) * 0.08;

        // Garder le poisson dans les limites
        const bounds = 50;
        if (Math.abs(this.mesh.position.x) > bounds) {
            this.direction.x *= -1;
            this.mesh.position.x = Math.sign(this.mesh.position.x) * bounds;
        }
        if (Math.abs(this.mesh.position.y) > 30) {
            this.direction.y *= -1;
            this.mesh.position.y = Math.sign(this.mesh.position.y) * 30;
        }
        if (Math.abs(this.mesh.position.z) > 40) {
            this.direction.z *= -1;
            this.mesh.position.z = Math.sign(this.mesh.position.z) * 40;
        }
    }
}

// ===================================
// CRÉATION DES POISSONS
// ===================================
const fishes = [];
const fishCount = 40; // Nombre total de poissons (augmenté car ils sont plus petits)

function createFishes() {
    for (let i = 0; i < fishCount; i++) {
        // Sélectionner aléatoirement un des 3 modèles
        const modelIndex = Math.floor(Math.random() * 3);
        const model = fishModels[modelIndex];

        if (model) {
            fishes.push(new Fish(scene, model));
        }
    }

    console.log(`%c🐟 ${fishes.length} poissons créés dans l'aquarium ! 🐟`, 'color: #F5E6CC; font-size: 14px; font-weight: bold;');
}

// ===================================
// BULLES
// ===================================
const bubbles = [];
const bubbleGeometry = new THREE.SphereGeometry(0.3, 8, 8);
const bubbleMaterial = new THREE.MeshPhongMaterial({
    color: 0xF5E6CC,
    transparent: true,
    opacity: 0.3,
    shininess: 100
});

for (let i = 0; i < 50; i++) {
    const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
    bubble.position.x = (Math.random() - 0.5) * 100;
    bubble.position.y = (Math.random() - 0.5) * 60;
    bubble.position.z = (Math.random() - 0.5) * 80;

    bubble.userData.speed = 0.02 + Math.random() * 0.05;
    bubble.userData.wobble = Math.random() * Math.PI * 2;
    bubble.scale.setScalar(0.3 + Math.random() * 0.7);

    scene.add(bubble);
    bubbles.push(bubble);
}

// ===================================
// PARTICULES DE LUMIÈRE (plancton lumineux)
// ===================================
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xF5E6CC,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// ===================================
// ÉCLAIRAGE SOUS-MARIN
// ===================================
// Lumière ambiante douce
const ambientLight = new THREE.AmbientLight(0x41609E, 0.5);
scene.add(ambientLight);

// Lumière directionnelle (lumière du soleil qui traverse l'eau)
const sunLight = new THREE.DirectionalLight(0xF5E6CC, 0.8);
sunLight.position.set(0, 50, 20);
scene.add(sunLight);

// Lumières ponctuelles pour effet bioluminescence
const bioLight1 = new THREE.PointLight(0x41609E, 1.5, 30);
bioLight1.position.set(15, 10, 10);
scene.add(bioLight1);

const bioLight2 = new THREE.PointLight(0x5A7BB8, 1.5, 30);
bioLight2.position.set(-15, -10, 10);
scene.add(bioLight2);

const bioLight3 = new THREE.PointLight(0xF5E6CC, 1, 25);
bioLight3.position.set(0, 0, -20);
scene.add(bioLight3);

// ===================================
// RAYON DE LUMIÈRE (God rays effect)
// ===================================
const lightRays = [];
for (let i = 0; i < 5; i++) {
    const rayGeometry = new THREE.ConeGeometry(0.5, 60, 4, 1, true);
    const rayMaterial = new THREE.MeshBasicMaterial({
        color: 0xF5E6CC,
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide
    });
    const ray = new THREE.Mesh(rayGeometry, rayMaterial);
    ray.position.set((i - 2) * 8, 30, -20 + i * 5);
    ray.rotation.x = Math.PI;
    scene.add(ray);
    lightRays.push(ray);
}

// ===================================
// INTERACTION AVEC LA SOURIS
// ===================================
const mouse = { x: 0, y: 0 };
const mousePos3D = new THREE.Vector3(0, 0, 0);

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Convertir la position 2D de la souris en position 3D dans la scène
    mousePos3D.set(
        mouse.x * 40,
        mouse.y * 25,
        10
    );
});

// ===================================
// ANIMATION LOOP
// ===================================
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Animer les poissons
    fishes.forEach(fish => {
        fish.update(time, mousePos3D);
    });

    // Animer les bulles
    bubbles.forEach((bubble, index) => {
        bubble.position.y += bubble.userData.speed;
        bubble.position.x += Math.sin(time * 2 + bubble.userData.wobble) * 0.03;

        // Réinitialiser les bulles qui sortent de l'écran
        if (bubble.position.y > 35) {
            bubble.position.y = -35;
            bubble.position.x = (Math.random() - 0.5) * 100;
            bubble.position.z = (Math.random() - 0.5) * 80;
        }

        // Rotation douce
        bubble.rotation.x += 0.01;
        bubble.rotation.y += 0.01;
    });

    // Rotation lente des particules
    particlesMesh.rotation.y += 0.0003;

    // Mouvement de la caméra en fonction de la souris (plus subtil)
    camera.position.x += (mouse.x * 3 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 3 + 5 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    // Animation des lumières bioluminescentes
    bioLight1.position.x = Math.sin(time * 0.5) * 20;
    bioLight1.position.z = Math.cos(time * 0.5) * 20;
    bioLight1.intensity = 1.2 + Math.sin(time * 2) * 0.3;

    bioLight2.position.x = Math.cos(time * 0.7) * 20;
    bioLight2.position.z = Math.sin(time * 0.7) * 20;
    bioLight2.intensity = 1.2 + Math.cos(time * 2.5) * 0.3;

    bioLight3.intensity = 0.8 + Math.sin(time * 1.5) * 0.2;

    // Animation des rayons de lumière
    lightRays.forEach((ray, index) => {
        ray.material.opacity = 0.03 + Math.sin(time + index) * 0.02;
        ray.rotation.z = Math.sin(time * 0.3 + index) * 0.05;
    });

    // Pulsation des particules
    particlesMaterial.opacity = 0.5 + Math.sin(time * 1.5) * 0.2;

    renderer.render(scene, camera);
}

animate();

// ===================================
// RESPONSIVE - RESIZE HANDLER
// ===================================
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// ===================================
// SCROLL EFFECT - PARALLAX 3D
// ===================================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Rotation douce de la scène
    particlesMesh.rotation.x = scrollY * 0.0002;

    // Déplacement de la caméra
    camera.position.z = 30 + scrollY * 0.01;
});

// ===================================
// PERFORMANCE - QUALITY ADJUSTMENT
// ===================================
if (window.innerWidth < 768) {
    // Sur mobile, réduire le nombre de poissons à créer
    const originalFishCount = fishCount;
    fishCount = 15;

    console.log(`Mode mobile: ${fishCount} poissons au lieu de ${originalFishCount}`);

    // Réduire les bulles
    bubbles.slice(25).forEach(bubble => {
        scene.remove(bubble);
    });
    bubbles.length = 25;

    renderer.setPixelRatio(1);
}

// Log de confirmation
console.log('%c🌊 Aquarium Theme Loaded 🌊', 'color: #41609E; font-size: 16px; font-weight: bold;');
