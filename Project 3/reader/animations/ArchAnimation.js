/**
 * LinearAnimation
 * @constructor
 */
class ArchAnimation extends Animation {
    /**
     * ArchAnimation
     * @param scene CGFscene where the component will be displayed
     * @param id animation id
     * @param animationTime time of the animation
     * @param controlPoints control points of the animation
     */
    constructor(scene, id, animationTime, controlPoints) {
        super(scene, id, animationTime);
        this.controlPoints = controlPoints;
        this.v1 = vec3.fromValues(1, 1, 1);
        this.v2 = vec3.fromValues(2, 2, 2);

        this.direction = vec3.create();
        vec3.sub(this.direction, this.controlPoints[1], this.controlPoints[0]);

        this.zAxis = vec3.fromValues(0,0,1);

        this.settingAngles();

        this.atualPosition = vec3.create();

        this.pointsDistance = vec3.length(this.direction);
        this.distanceSinceLastPoint = 0;
        this.atualPointIdArray = 1;

        this.totalDist;
        this.velocity;

        this.getTotalDistanceAndVelocity();

        this.over = false;
    }

    /**
     * Gets the total distante of the animation and velocity
     */
    getTotalDistanceAndVelocity() {
        this.totalDist = 0;
        var dir = vec3.create();

        for (let i = 1; i < this.controlPoints.length; i++) {
            vec3.sub(dir, this.controlPoints[i], this.controlPoints[i - 1]);
            this.totalDist += vec3.length(dir);
        }

        this.velocity = this.totalDist / this.animationTime;
    }

    /**
     * Updates animation variables
     */
    updatingVariables() {

        this.atualPointIdArray++;
        if (this.atualPointIdArray == this.controlPoints.length) {
            this.atualPointIdArray = 1;
            this.over = true;
        }

        vec3.sub(this.direction, this.controlPoints[this.atualPointIdArray], this.controlPoints[this.atualPointIdArray - 1]);
        this.pointsDistance = vec3.length(this.direction);

        this.settingAngles();
    }

    /**
     * Updates animation variables
     * @param deltaTime time since last update
     */
    update(deltaTime) {
        let distance = deltaTime * this.velocity;

        this.distanceSinceLastPoint += distance;
        let r;

        if (this.distanceSinceLastPoint > this.pointsDistance) {
            this.distanceSinceLastPoint -= this.pointsDistance;
            this.updatingVariables();
        }

        r = this.distanceSinceLastPoint / this.pointsDistance;
        vec3.scale(this.atualPosition, this.direction, r);
    }

    /**
     * Displays animation state
     */
    display() {
      let x = this.controlPoints[this.atualPointIdArray-1][0];
      let y = this.controlPoints[this.atualPointIdArray-1][1];
      let z = this.controlPoints[this.atualPointIdArray-1][2];
      this.scene.translate(x,y,z);
      this.scene.translate(this.atualPosition[0],this.atualPosition[1],this.atualPosition[2]);
    //  this.scene.rotate(this.horizontalAngle, 0, 1, 0);
  //    this.scene.rotate(-this.verticalAngle, 1, 0, 0);
    }

    /**
     * Clones the animation
     * @returns {ArchAnimation}
     */
    clone(){
      var copy = new ArchAnimation(this.scene,this.id,this.animationTime,this.controlPoints);
      return copy;
    }

    /**
     * Sets up orientation angles
     */
    settingAngles(){
      this.directionXZ = vec3.fromValues(this.direction[0],this.direction[1],this.direction[2]);
      this.directionXZ[1] = 0;

      this.directionYZ = vec3.fromValues(this.direction[0],this.direction[1],this.direction[2]);
      if(this.directionYZ[2] == 0){
        this.directionYZ[2] = this.directionYZ[0];
      }
      this.directionYZ[0] = 0;


      if(this.directionYZ[2] < 0){
        this.directionYZ[2] = -this.directionYZ[2];
      }

      this.horizontalAngle = this.calcAngle(this.zAxis,this.directionXZ);

      if(this.directionYZ[1] == 0){
        this.verticalAngle = 0;
      }
      else{
        this.verticalAngle = this.calcAngle(this.zAxis, this.directionYZ);
      }

      if((this.directionXZ[0] <= 0 && this.directionXZ[2] <=0) || (this.directionXZ[0] <= 0 && this.directionXZ[2] >= 0)){
        this.horizontalAngle = -this.horizontalAngle;
      }

      if(this.directionYZ[1] <= 0 && this.directionYZ[2] >= 0){
        this.verticalAngle = -this.verticalAngle;
      }
    }

    /**
     * Calculates the angle between two vectors
     * @param a vector
     * @param b vector
     * @returns angle between to vectors
     */
    calcAngle(a,b){
      var tempA = vec3.fromValues(a[0], a[1], a[2]);
      var tempB = vec3.fromValues(b[0], b[1], b[2]);

      vec3.normalize(tempA, tempA);
      vec3.normalize(tempB, tempB);

      var cosine = vec3.dot(tempA, tempB);
      if (cosine > 1.0) {
          return 0;
      } else {
          return Math.acos(cosine);
      }
    }
}
