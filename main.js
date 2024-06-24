import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css'
import gsap from 'gsap'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(2)


const pointLight = new THREE.PointLight(0xffffff, 20000 , 10000 );
pointLight.position.set(-40, 50, 0);
scene.add(pointLight);



const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.set(0, 30, 50);
 


const geometry = new THREE.SphereGeometry(10, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: 0x0000ff, roughness: 0.5 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5
controls.update();


function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.02
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth/ this.window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth , window.innerHeight)
})


const t1 = gsap.timeline({ defaults: {duration : 1}})
t1.fromTo(sphere.scale, { z: 0, x: 0, y: 0}, { z : 1, x : 1, y: 1})
t1.fromTo('nav', { y : '-150%'}, { y: '0%'})
t1.fromTo('h1', { opacity : 0}, {opacity : 1})

let mouseDown = false
let rgb = []

window.addEventListener('mousedown', () => mouseDown = true)
window.addEventListener('mouseup', () => mouseDown = false)

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / window.innerWidth) * 255 ),
      Math.round((e.pageY / window.innerHeight) * 255),
      50
    ]
    console.log(rgb)
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    gsap.to(sphere.material.color, {r: newColor.r , g: newColor.g , b:newColor.b })
  }

})