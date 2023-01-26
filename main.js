// Import
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'

// Get DOM element
const canvas = document.getElementById('webgl');

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('../node_modules/three/examples/js/libs/draco/gltf/');

loader.setDRACOLoader(dracoLoader);

// Set the sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color('#231c57');
scene.background = new THREE.Color('#1f2647');
// scene.background = new THREE.Color('#2d3666');
// scene.background = new THREE.Color('#B8E8FC');

loader.load('/AncientRuinsThreeJS.glb', (gltf) => {
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.receiveShadow = true
            child.castShadow = true
        }
    })
    // console.log(gltf.scene);
    scene.add(gltf.scene);
});

// Axis Helper
// const axisHelper = new THREE.AxesHelper(10, 10, 10);
// scene.add(axisHelper);

// Object
// const box = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1, 10, 10, 10),
//     new THREE.MeshNormalMaterial({ wireframe: true })
// );
// group.add(box)
// scene.add(group);

// My Object

// Light
const spotLight = new THREE.SpotLight(0xffc34d, 0.5);
spotLight.position.set(25, 20, 0);
// scene.add(spotLight);

const pointLight1 = new THREE.PointLight(0xFF5A00, 1.4);
pointLight1.position.set(1.4441, 1.9779, 0.70389);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xFF5A00, 1.4);
pointLight2.position.set(-2.2229, 3.765, -0.37849);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0x00E5FF, 0.7);
pointLight3.position.set(-0.90519, 0.80477, 0.3215);
scene.add(pointLight3);

// const lightHelper = new THREE.PointLightHelper(pointLight2);
// scene.add(lightHelper);

const directionalLight = new THREE.DirectionalLight(0x203574, 1);
directionalLight.castShadow = true;
directionalLight.shadow.bias = -0.0005;
directionalLight.position.set(-4, 8, -4);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

const shadowLight = new THREE.DirectionalLight(0x203574, 0.8);
shadowLight.castShadow = true;
shadowLight.shadow.bias = -0.0005;
shadowLight.position.set(4, 8, 4);
shadowLight.lookAt(0, 0, 0);
scene.add(shadowLight);
// const helper = new THREE.DirectionalLightHelper( shadowLight, 1);
// scene.add( helper );


// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.set(9, 6, 12);
camera.lookAt(0, 0, 0);
scene.add(camera);

// Orbit Control
const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.4;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.4;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setSize(sizes.width, sizes.height);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.textureEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 1.75;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor('#211d20');
renderer.render(scene, camera);

const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);

}

tick();