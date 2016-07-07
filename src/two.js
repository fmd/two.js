var THREE = require('three')
var scene, camera, renderer;
var geometry, material, mesh;

var resolution = { width: 640.0, height: 480.0 };

let vs = `void main() {
   gl_Position = vec4( position, 1.0 );
}`

let fs = `void main() {
   gl_FragColor = vec4(0.0, 1.0, 0.5, 1.0);
}`

init()
animate()

function setupScene() {
	scene = new THREE.Scene()
}

function setupCamera() {
  var width = window.innerWidth;
  var height = window.innerHeight;
	camera = new THREE.OrthographicCamera( -1, 1, 1, -1, -1, 1000 );
}

function setupQuad() {
	var quad = new THREE.Mesh(new THREE.PlaneGeometry(resolution.width, resolution.height));

	scene.add(quad);
}

function setupRenderer() {
	renderer = new THREE.WebGLRenderer()
	renderer.setSize( window.innerWidth, window.innerHeight )
	document.body.appendChild( renderer.domElement )
}

function init() {
	setupScene()
	setupCamera()
	setupQuad()
	setupRenderer()
  resizeCanvas()
}

function animate() {
	requestAnimationFrame( animate )
	renderer.render( scene, camera )
}

window.addEventListener( 'resize', resizeCanvas, false );

function resizeCanvas(){
  var width = window.innerWidth * 1.0;
  var height = window.innerHeight * 1.0;

  var screenAspect = width / height;
  var resolutionAspect = resolution.width / resolution.height;

  renderer.setSize(width, height);

  if (width / height > resolutionAspect) {
    camera.top = resolution.height / 2;
    camera.bottom = -resolution.height / 2;
    camera.left = -(resolution.height / 2) * screenAspect;
    camera.right = (resolution.height / 2) * screenAspect;
  } else {
    camera.top = (resolution.width / 2) / screenAspect;
    camera.bottom = -(resolution.width / 2) / screenAspect;
    camera.left = -(resolution.width / 2);
    camera.right = (resolution.width / 2);
  }



  camera.updateProjectionMatrix();
}
