import 'babel-polyfill'

import { Two } from '../two'
import { TextureSheet } from '../texture_sheet'
import { TextureAnimator } from '../texture_animator'

let fs = require('fs')
let Three = require('three')

let t = new Two({ resolution: { width: 160, height: 120 } });

let detective = new Three.ImageUtils.loadTexture('./resources/detective_walk.png');
detective.minFilter = Three.NearestFilter
detective.magFilter = Three.NearestFilter

let animator = new TextureAnimator(detective, 4, 1, 4, 200);

var runnerMaterial = new Three.MeshBasicMaterial( { map: detective,
                                                    transparent:true } );

console.log(runnerMaterial)

var runnerGeometry = new Three.PlaneGeometry(16, 32);
var runner = new Three.Mesh(runnerGeometry, runnerMaterial);

// You have to give the path from the gulpfile because javascript is a piece of shit
let basementTileInfo = fs.readFileSync('./dist/resources/basement_tiles.json', 'utf8')
let sheet = new TextureSheet('./resources/basement.png', basementTileInfo, createWall)

function createWall() {
  let shelves = sheet.tiles['bloodyShelves']
  let shelvesGeometry = new Three.PlaneGeometry(shelves.width, shelves.height);
  let shelvesMaterial = shelves.material
  let shelvesMesh = new Three.Mesh(shelvesGeometry, shelvesMaterial)

  let table = sheet.tiles['pigTable']
  let tableGeometry = new Three.PlaneGeometry(table.width, table.height);
  let tableMaterial = table.material
  let tableMesh = new Three.Mesh(tableGeometry, tableMaterial)

  t.scene.add(shelvesMesh)
  t.scene.add(tableMesh)
  t.scene.add(runner)

  shelvesMesh.position.z -= 5
  shelvesMesh.position.x -= 35
  shelvesMesh.position.y += 6

  tableMesh.position.z -= 5
  tableMesh.position.x += 35
  tableMesh.position.y += 6

  let anim = function() {
    animator.update(18)
  }

  let movement = function() {
    if (runner.position.x > 90) {
      runner.position.x = -90
    }

    runner.position.x += 0.15
  }

  t.loopFuncs.push(anim)
  t.loopFuncs.push(movement)
  t.animate();
}
