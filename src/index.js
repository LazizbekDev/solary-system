import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import stars from "./img/stars.jpg";
import earth from "./img/earth.jpg";
import mars from "./img/mars.jpg";
import mercury from "./img/mercury.jpg";
import neptune from "./img/neptune.jpg";
import saturn_ring from "./img/saturn_ring.png";
import uranus_ring from "./img/uranus_ring.png";
import saturn from "./img/saturn.jpg";
import sun from "./img/sun.jpg";
import uranus from "./img/uranus.jpg";
import jupiter from "./img/jupiter.jpg";
import venus from "./img/venus.jpg";
import pluto from "./img/pluto.jpg";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
)

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();

scene.background = cubeTextureLoader.load([
    stars,
    stars,
    stars,
    stars,
    stars,
    stars,
])

const textureLoader = new THREE.TextureLoader();

const planetConstructor = (size, texture, position, ring) => {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    })
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);

    if (ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32
        );
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        })

        const ringMesh = new THREE.Mesh(ringGeo, ringMat)
        obj.add(ringMesh)
        ringMesh.position.x = position
        ringMesh.rotation.x = -0.5 * Math.PI
    }

    scene.add(obj);
    mesh.position.x = position;
    

    return { mesh, obj }
}

const MERCURY = planetConstructor(3.2, mercury, 28);
const VENUS = planetConstructor(5.8, venus, 44);
const EARTH = planetConstructor(6, earth, 62);
const MARS = planetConstructor(4, mars, 78);
const JUPITER = planetConstructor(12, jupiter, 100);
const NEPTUNE = planetConstructor(7, neptune, 200);
const PLUTO = planetConstructor(2.8, pluto, 216);
const SATURN = planetConstructor(10, saturn, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturn_ring
})
const URANUS = planetConstructor(7, uranus, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranus_ring
})

const sunGeomatry = new THREE.SphereGeometry(16, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sun)
})

const SUN = new THREE.Mesh(sunGeomatry, sunMaterial)
scene.add(SUN)

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight)

const animate = () => {
    SUN.rotateY(0.004)
    MERCURY.mesh.rotateY(0.004);
    VENUS.mesh.rotateY(0.002);
    EARTH.mesh.rotateY(0.003);
    SATURN.mesh.rotateY(0.038);
    MARS.mesh.rotateY(0.018);
    JUPITER.mesh.rotateY(0.04);
    URANUS.mesh.rotateY(0.03);
    PLUTO.mesh.rotateY(0.008)
    NEPTUNE.mesh.rotateY(0.03)


    MERCURY.obj.rotateY(0.02);
    VENUS.obj.rotateY(0.009)
    EARTH.obj.rotateY(0.006)
    SATURN.obj.rotateY(0.0009)
    MARS.obj.rotateY(0.008);
    JUPITER.obj.rotateY(0.002);
    URANUS.obj.rotateY(0.0004);
    PLUTO.obj.rotateY(0.00007);
    NEPTUNE.obj.rotateY(0.001);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

document.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})