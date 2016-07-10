let Three = require('three')

export class TextureAnimator {
  constructor(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)  {
    this.tilesHorizontal = tilesHoriz
    this.tilesVertical = tilesVert

    this.numberOfTiles = numTiles
    this.texture = texture

    this.texture.wrapS = this.texture.wrapT = Three.RepeatWrapping
    this.texture.repeat.set(1.0 / this.tilesHorizontal,
                            1.0 / this.tilesVertical)

    this.tileDisplayDuration = tileDispDuration
    this.currentDisplayTime = 0
    this.currentTile = 0
  }

  update(milliSec) {
    this.currentDisplayTime += milliSec
    while (this.currentDisplayTime > this.tileDisplayDuration) {
      this.currentDisplayTime -= this.tileDisplayDuration
      this.currentTile++

      if (this.currentTile == this.numberOfTiles) {
        this.currentTile = 0
      }

      let currentColumn = this.currentTile % this.tilesHorizontal
      this.texture.offset.x = currentColumn / this.tilesHorizontal

      let currentRow = Math.floor( this.currentTile / this.tilesHorizontal )
      this.texture.offset.y = currentRow / this.tilesVertical
    }
  }
}
