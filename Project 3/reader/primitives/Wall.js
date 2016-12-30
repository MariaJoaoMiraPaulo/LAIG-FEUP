/**
 * Wall constructor
 * @param scene CGFscene where the component will be displayed
 * @param reader reader CGFXMLreader
 * @param player game player
  * @param wallNumber wall number 0 to 6
 */
function Wall(scene, reader, player, wallNumber) {
  CGFobject.call(this, scene);
  this.scene = scene;
  this.player = player;
  this.reader=reader;
  this.wallNumber = wallNumber;

  this.used = false;

  this.xPos=0;
  this.yPos=0;
  this.zPos=0;

  this.secondWallx = 0;
  this.secondWallz = 0;

  this.wallOrientation = null;

  switch (player) {
    case 1:
    this.material = this.scene.scenario.player1Material;
    break;
    case 2:
    this.material = this.scene.scenario.player2Material;
    break;
    default:

  }

  this.wall = new Cube(this.scene,this.reader,null,null);


};

Wall.prototype = Object.create(CGFobject.prototype);
Wall.prototype.constructor = Wall;

/**
 * Displays wall
 */
Wall.prototype.display = function () {

  let ratio;

  this.scene.pushMatrix();
  if(typeof this.wallOrientation != null && this.wallOrientation == 'v'){
    ratio = this.zPos - this.secondWallz;
    if(ratio < 0){
        this.scene.translate(this.xPos,this.yPos,this.zPos+0.7);
    }
    else this.scene.translate(this.xPos,this.yPos,this.zPos-0.7);
    this.scene.rotate(Math.PI/2,0,1,0);
  }
  else if(typeof this.wallOrientation != null && this.wallOrientation == 'h'){
    ratio = this.xPos - this.secondWallx;
    if(ratio < 0){
        this.scene.translate(this.xPos+0.7,this.yPos,this.zPos);
    }
    else this.scene.translate(this.xPos-0.7,this.yPos,this.zPos);
  }
  else {
    this.scene.translate(this.xPos,this.yPos,this.zPos);
  }
  this.scene.scale(2.3,0.5,0.1);
  this.material.apply();
  this.wall.display();
  this.scene.popMatrix();
}

/**
 * Returns wall number
 */
Wall.prototype.getWallNumber = function () {
  return this.wallNumber;
}

/**
 * Sets Wall X coordinate
 * @param x x position
 */
Wall.prototype.setWallXCoord = function (x) {
  this.xPos = x;
}

/**
 * Sets Wall Z coordinate
 * @param z z position
 */
Wall.prototype.setWallZCoord = function (z) {
  this.zPos = z;
}

/**
 * Sets Wall Y coordinate
 * @param y y position
 */
Wall.prototype.setWallYCoord = function (y) {
  this.yPos = y;
}

/**
 * Sets Second Wall X coordinate
 * @param x x position
 */
Wall.prototype.setSecondWallXCoord = function (x) {
  this.secondWallx = x;
}

/**
 * Sets Second Wall Z coordinate
 * @param z z position
 */
Wall.prototype.setSecondWallZCoord = function (z) {
  this.secondWallz = z;
}

/**
 * Sets Wall orientation
 * @param ori wall new orientation
 */
Wall.prototype.setWallOrientation = function(ori) {
  this.wallOrientation = ori;
}

/**
 * Sets Wall material
 */
Wall.prototype.setMaterial = function() {
  if(this.player == 1)
    this.material = this.scene.scenario.player1Material;
  else this.material = this.scene.scenario.player2Material;
}

Wall.prototype.updateTexCoords = function (s, t) {

}
