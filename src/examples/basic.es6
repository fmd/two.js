import { Two } from '../two'
import { TextureSheet } from '../texture_sheet'
import { TextureAnimator } from '../texture_animator'
let Three = require('three')

let t = new Two({ resolution: { width: 320, height: 240 } });

let detective = new Three.ImageUtils.loadTexture( 'images/detective_walk.png' );
detective.minFilter = Three.NearestFilter
detective.magFilter = Three.NearestFilter

let animator = new TextureAnimator(detective, 4, 1, 4, 200);

var runnerMaterial = new Three.MeshBasicMaterial( { map: detective,
                                                    side: Three.SingleSide,
                                                    transparent:true } );


var runnerGeometry = new Three.PlaneGeometry(32, 64);
var runner = new Three.Mesh(runnerGeometry, runnerMaterial);

t.scene.add(runner);

let environmentSheet = new TextureSheet('./images/basement.png', './images/basement_tiles.json')
let wallGeometry = new Three.PlaneGeometry(32, 32);
let wall = new Three.Mesh(wallGeometry, environmentSheet.tiles['darkWall'])

t.scene.add(wall)

let anim = function() {
  animator.update(18)
}

t.loopFuncs.push(anim)
t.animate();
