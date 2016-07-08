let Three = require('three')
import { Downscaler } from './downscaler'

export class Two {
  constructor(opts = Two.defaultOpts) {
    this.opts = opts
    this.initializeRenderer()
    this.initializeCamera()
    this.initializeScene()
    this.downscaler = new Downscaler(this.renderer, this.opts.resolution)
  }

  initializeRenderer() {
    this.renderer = new Three.WebGLRenderer()
  	this.renderer.setSize(window.innerWidth, window.innerHeight)
  	document.body.appendChild(this.renderer.domElement)
  }

  initializeScene() {
    this.scene = new Three.Scene()

    var redMaterial = new Three.MeshBasicMaterial({color:0xF06565})
    var boxGeometry = new Three.PlaneGeometry(400, 400)
    this.boxObject = new Three.Mesh(boxGeometry, redMaterial)
    this.scene.add(this.boxObject)
  }

  initializeCamera() {
    this.camera = new Three.OrthographicCamera(-this.opts.resolution.width/2,
                                                this.opts.resolution.width/2,
                                                this.opts.resolution.height/2,
                                               -this.opts.resolution.height/2, -1, 1000)
  }

  animate() {
  	requestAnimationFrame(this.animate.bind(this))
    this.boxObject.rotation.z += 0.01;
    this.downscaler.render(this.scene, this.camera)
  }

  static get defaultOpts() {
    return {
      resolution: {
        width: 640,
        height: 480
      }
    }
  }
}
