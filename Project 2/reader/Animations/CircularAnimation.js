/**
* CircularAnimation
* @constructor
*/
class CircularAnimation extends Animation{
  constructor(scene, id, animationTime, center, radius, startAng, rotAng){
    super(scene, id, animationTime);
    this.center=center;
    console.log("Center: "+this.center);
    this.centerX = this.center[0];
    this.centerY = this.center[1];
    this.centerZ = this.center[2];
    console.log("Center X: "+this.centerX);
    console.log("Center Y: "+this.centerY);
    console.log("Center Z: "+this.centerZ);

    this.radius = radius;
    console.log("Raio: "+this.radius);
    this.startAng = startAng;
    console.log("Angulo Inicial: " + this.startAng);
    this.rotAng = rotAng;    
    console.log("Angulo Rotaçao: " + this.rotAng);

  }

  display(){
    this.scene.translate(-this.centerX,-this.centerY,-this.centerZ);
  }

  update(deltaTime){
    console.log("entrei Circular");
  }
}
