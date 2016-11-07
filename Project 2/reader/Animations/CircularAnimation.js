/**
* CircularAnimation
* @constructor
*/
class CircularAnimation extends Animation{
  constructor(id, animationTime, center, radius, startAng, rotAng){
    super(id, animationTime);
    this.center = center;
    this.radius = radius;
    this.startAng = startAng;
    this.rotAng = rotAng;

  }
}
