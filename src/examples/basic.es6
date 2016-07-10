import 'babel-polyfill'

import { Two } from '../two'
import { TextureSheet } from '../texture_sheet'
import { TextureAnimator } from '../texture_animator'

let fs = require('fs')
let Three = require('three')

let t = new Two({ resolution: { width: 320, height: 240 } });

let detective = new Three.ImageUtils.loadTexture('./resources/detective_walk.png');
detective.minFilter = Three.NearestFilter
detective.magFilter = Three.NearestFilter

let animator = new TextureAnimator(detective, 4, 1, 4, 200);

var runnerMaterial = new Three.MeshBasicMaterial( { map: detective,
                                                    side: Three.SingleSide,
                                                    transparent:true } );


var runnerGeometry = new Three.PlaneGeometry(32, 64);
var runner = new Three.Mesh(runnerGeometry, runnerMaterial);

t.scene.add(runner);

// You have to give the path from the gulpfile because javascript is a piece of shit
let basementTileInfo = fs.readFileSync('./dist/resources/basement_tiles.json', 'utf8')
let environmentSheet = new TextureSheet('./resources/basement.png', basementTileInfo)

function load() {
  console.log("FUCK YOU");
}

let environmentSheet = await load()

let wallGeometry = new Three.PlaneGeometry(32, 32);
let wallMaterial = environmentSheet.tiles['darkWall']

let wall = new Three.Mesh(wallGeometry, wallMaterial)
t.scene.add(wall)

let anim = function() {
  animator.update(18)
}

t.loopFuncs.push(anim)
t.animate();
