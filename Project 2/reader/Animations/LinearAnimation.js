/**
 * LinearAnimation
 * @constructor
 */
class LinearAnimation extends Animation {
    constructor(scene, id, animationTime, controlPoints) {
        super(scene, id, animationTime);
        this.controlPoints = controlPoints;

      //  vec3.subtract(this.direction, this.controlPoints[1], this.controlPoints[0]);
        this.distanceToNextPoint = 0;
        this.atualPointIdArray = 1;
        this.distanceCovered = 0;

        this.totalDist;
        this.velocity;
    }

    getTotalDistanceAndVelocity() {
        this.totalDist = 0;

        for (let i = 0; i < controlPoints.length; i++) {
            this.totalDist += vec3.length(controlPoints[i]);
        }

        this.velocity = this.totalDist / this.animationTime;
    }

    update(deltaTime){
    /*  let distance =  Math.pow(deltaTime,-3) * this.velocity;
      this.distanceCovered+=distance;
      let r = this.distanceCovered /vec3.length(this.direction);

      if(this.distanceCovered+distance > this.distanceToNextPoint){
        this.distanceCovered+=distance;
        this.distanceToNextPoint = vec3.length();
        this.distanceCovered=this.distanceCovered-this.distanceToNextPoint;
        this.atualPointIdArray++;
        if(this.atualPointIdArray==this.controlPoints.length){
          this.atualPointIdArray=0;
        }
        else {

        }
      }*/
    }
}
