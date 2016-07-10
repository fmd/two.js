let Three = require('three')
import { map } from 'lodash'

export class TextureSheet {
  constructor(tileImage, tileInfo) {
    this.tiles = {}
    this.tileImage = tileImage
    this.tileInfo = JSON.parse(tileInfo)
  }

  async load() {
    this.atlasTexture = Three.ImageUtils.loadTexture(this.tileImage, undefined, this.loadTiles.bind(this))
    return this
  }

  loadTiles() {
    for (let key in this.tileInfo.items) {
      this.loadTile(key)
    }
  }

  loadTile(key) {
    let tex = this.atlasTexture.clone()
    tex.minFilter = Three.NearestFilter
    tex.magFilter = Three.NearestFilter

    let tileSize = this.tileInfo.tileSize
    let item = this.tileInfo.items[key]

    tex.repeat.x = ((item.width * tileSize) / this.atlasTexture.width)
    tex.repeat.y = ((item.height * tileSize) / this.atlasTexture.height)
    tex.offset.x = (Math.abs(item.x * tileSize) / this.atlasTexture.width)
    tex.offset.y = (Math.abs(item.y * tileSize) / this.atlasTexture.height)
    tex.needsUpdate = true

    let material = new Three.MeshBasicMaterial({ transparent: true,
                                                 map: tex })

    this.tiles[key] = material
  }
}
