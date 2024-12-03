// Initialize the scene, camera, and renderer
const container = document.getElementById('container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Add light to the scene
const light = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Set the camera position
camera.position.z = 10;

// Load the STL file
const loader = new THREE.STLLoader();
loader.load(
  'path/to/your/model.stl', // Replace with your STL file path
  function (geometry) {
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error('An error happened', error);
  }
);

// Add controls for interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();


const input = document.createElement('input');
input.type = 'file';
input.accept = '.stl';
document.body.appendChild(input);

input.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const geometry = loader.parse(e.target.result);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  };

  reader.readAsArrayBuffer(file);
});
