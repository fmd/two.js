let Three = require('three')

export class Downscaler {
  constructor(renderer, resolution) {
    this.renderer = renderer
    this.resolution = resolution

    console.log(resolution)

    this.camera = new Three.OrthographicCamera(-1, 1, 1, -1, -1, 1000)
    this.scene = new Three.Scene()

    this.initializeTexture()
    this.initializeQuad()

    window.addEventListener('resize', this.resizeWindow.bind(this), false)
    this.resizeWindow()
  }

  initializeTexture() {
    this.renderTarget = new Three.WebGLRenderTarget(this.resolution.width,
                                                    this.resolution.height,
                                                    { minFilter: Three.LinearFilter,
                                                      magFilter: Three.NearestFilter })
  }

  initializeQuad() {
  	let quad = new Three.Mesh(new Three.PlaneGeometry(this.resolution.width, this.resolution.height),
                              new Three.MeshBasicMaterial({ map: this.renderTarget.texture }))

  	this.scene.add(quad)
  }

  render(scene, camera) {
    this.renderer.render(scene, camera, this.renderTarget)
  	this.renderer.render(this.scene, this.camera)
  }

  resizeWindow() {
    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight

    let resolutionWidth = this.resolution.width
    let resolutionHeight = this.resolution.height

    let screenAspect = windowWidth / windowHeight
    let resolutionAspect = resolutionWidth / resolutionHeight

    this.renderer.setSize(windowWidth, windowHeight)

    if (windowWidth / windowHeight > resolutionAspect) {
      this.camera.left   = -(resolutionHeight / 2) * screenAspect
      this.camera.right  =  (resolutionHeight / 2) * screenAspect
      this.camera.top    =  (resolutionHeight / 2)
      this.camera.bottom = -(resolutionHeight / 2)
    } else {
      this.camera.left   = -(resolutionWidth / 2)
      this.camera.right  =  (resolutionWidth / 2)
      this.camera.top    =  (resolutionWidth / 2) / screenAspect
      this.camera.bottom = -(resolutionWidth / 2) / screenAspect
    }

    this.camera.updateProjectionMatrix()
  }
}
