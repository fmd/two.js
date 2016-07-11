let Three = require('three')
import { map } from 'lodash'

export class TextureSheet {
  constructor(tileImage, tileInfo, callback) {
    this.tiles = {}
    this.tileImage = tileImage
    this.tileInfo = JSON.parse(tileInfo)
    this.atlasTexture = Three.ImageUtils.loadTexture(this.tileImage, undefined, this.loadTiles.bind(this, callback))
  }

  async ready() {
    while (Object.keys(this.tiles).length != Object.keys(this.tileInfo.items).length);
    return true;
  }

  loadTiles(callback) {
    for (let key in this.tileInfo.items) {
      this.loadTile(key)
    }

    callback()
  }

  loadTile(key) {
    let tex = this.atlasTexture.clone()
    tex.minFilter = Three.NearestFilter
    tex.magFilter = Three.NearestFilter

    let tileSize = this.tileInfo.tileSize
    let tileRatio = tileSize / this.atlasTexture.image.width
    let item = this.tileInfo.items[key]

    tex.wrapS = tex.wrapT = Three.RepeatWrapping
    let repeatX = ((item.width * tileSize) / this.atlasTexture.image.width)
    let repeatY = ((item.height * tileSize) / this.atlasTexture.image.height)
    let offsetX = ((item.x * tileSize) / this.atlasTexture.image.width)
    let offsetY = ((item.y * tileSize) / this.atlasTexture.image.height)

    tex.repeat.set(repeatX, repeatY)
    tex.offset.set(offsetX, 0 - offsetY - repeatY)

    let material = new Three.MeshBasicMaterial({ transparent: true,
                                                 map: tex })

    tex.needsUpdate = true
    this.tiles[key] = { width: item.width * tileSize,
                        height: item.height * tileSize,
                        material: material }
  }
}
