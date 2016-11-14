/**
* LinearAnimation
* @constructor
*/
class LinearAnimation extends Animation{
  constructor(scene, id, animationTime, controlPoints){
    super(scene, id, animationTime);
    this.controlPoints = controlPoints;
  }

  update(deltaTime){
    console.log("entrei");
  }
}
