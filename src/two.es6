let Three = require('three')
import { map } from 'lodash'
import { Downscaler } from './downscaler'

export class Two {
  constructor(opts = Two.defaultOpts) {
    this.opts = opts
    this.loopFuncs = []
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
  }

  initializeCamera() {
    this.camera = new Three.OrthographicCamera(-this.opts.resolution.width/2,
                                                this.opts.resolution.width/2,
                                                this.opts.resolution.height/2,
                                               -this.opts.resolution.height/2,
                                               -1, 1000)
  }

  animate() {
  	requestAnimationFrame(this.animate.bind(this))
    this.downscaler.render(this.scene, this.camera)
    map(this.loopFuncs, func => func())
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
