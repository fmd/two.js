var THREE = require('three')
var scene, camera, renderer;
var geometry, material, mesh;
var bufferScene, bufferTexture;
var boxObject, bufferCamera;

var resolution = { width: 320.0, height: 240.0 };

init()
animate()
window.addEventListener('resize', resizeCanvas, false );

function setupScene() {
	scene = new THREE.Scene()
}

function setupCamera() {
  var width = window.innerWidth;
  var height = window.innerHeight;
	camera = new THREE.OrthographicCamera( -1, 1, 1, -1, -1, 1000 );
}

function setupQuad() {
	var quad = new THREE.Mesh(new THREE.PlaneGeometry(resolution.width, resolution.height),
                            new THREE.MeshBasicMaterial({ map: bufferTexture }));

	scene.add(quad);
}

function setupRenderer() {
	renderer = new THREE.WebGLRenderer()
	renderer.setSize( window.innerWidth, window.innerHeight )
	document.body.appendChild( renderer.domElement )
}

function init() {
	setupRenderer()

  bufferScene = new THREE.Scene();
  bufferTexture = new THREE.WebGLRenderTarget( resolution.width,
                                               resolution.height,
                                               { minFilter: THREE.LinearFilter,
                                                 magFilter: THREE.NearestFilter });

  bufferCamera = new THREE.OrthographicCamera( -resolution.width/2,
                                                resolution.width/2,
                                                resolution.height/2,
                                               -resolution.height/2, -1, 1000 );

   var redMaterial = new THREE.MeshBasicMaterial({color:0xF06565});
   var boxGeometry = new THREE.PlaneGeometry(30, 30);
   boxObject = new THREE.Mesh( boxGeometry, redMaterial );
   boxObject.position.z = -10;
   bufferScene.add(boxObject);

    setupScene()
    setupCamera()
    setupQuad()
    resizeCanvas()
}

function animate() {
	requestAnimationFrame( animate )

  boxObject.rotation.z += 0.01;
  renderer.render(bufferScene, bufferCamera, bufferTexture)
	renderer.render(scene, camera)
}

function resizeCanvas(){
  var width = window.innerWidth * 1.0;
  var height = window.innerHeight * 1.0;

  var screenAspect = width / height;
  var resolutionAspect = resolution.width / resolution.height;

  renderer.setSize(width, height);

  if (width / height > resolutionAspect) {
    camera.left   = -(resolution.height / 2) * screenAspect;
    camera.right  =  (resolution.height / 2) * screenAspect;
    camera.top    =  (resolution.height / 2);
    camera.bottom = -(resolution.height / 2);
  } else {
    camera.left   = -(resolution.width / 2);
    camera.right  =  (resolution.width / 2);
    camera.top    =  (resolution.width / 2) / screenAspect;
    camera.bottom = -(resolution.width / 2) / screenAspect;
  }

  camera.updateProjectionMatrix();
}
