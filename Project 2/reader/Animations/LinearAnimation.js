/**
* LinearAnimation
* @constructor
*/
class LinearAnimation extends Animation{
  constructor(id, animationTime, controlPoints){
    super(id, animationTime);
    this.controlPoints = controlPoints;
  }
}
