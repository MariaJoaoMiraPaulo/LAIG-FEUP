/**
 * ArchAnimation
 * @constructor
 */
class ArchAnimation extends Animation {
    constructor(scene,id, animationTime, radius, center) {
        super(scene, id, animationTime);
        this.radius = radius;
        this.center = center;

        this.ANGLE = Math.PI;

        this.totalDist = this.ANGLE * this.radius;
        this.velocity = this.totalDist/this.animationTime;

        this.v1 = vec3.fromValues(1, 1, 1);
        this.v2 = vec3.fromValues(2, 2, 2);

        this.direction = vec3.create();
        vec3.sub(this.direction, this.controlPoints[1], this.controlPoints[0]);

        this.zAxis = vec3.fromValues(0,0,1);

        this.travelledDistance = 0;

        this.over = false;
    }

    updatingVariables() {

        this.atualPointIdArray++;
        if (this.atualPointIdArray == this.controlPoints.length) {
            this.atualPointIdArray = 1;
            this.over = true;
        }

        vec3.sub(this.direction, this.controlPoints[this.atualPointIdArray], this.controlPoints[this.atualPointIdArray - 1]);
        this.pointsDistance = vec3.length(this.direction);

    }

    update(deltaTime) {
        let distance = deltaTime * this.velocity;

        this.travelledDistance += distance;
        let r;

        if (this.travelledDistance > this.totalDist) {
            this.updatingVariables();
        }

        r = this.distanceSinceLastPoint / this.pointsDistance;
        vec3.scale(this.atualPosition, this.direction, r);
    }

    display() {
      let x = this.controlPoints[this.atualPointIdArray-1][0];
      let y = this.controlPoints[this.atualPointIdArray-1][1];
      let z = this.controlPoints[this.atualPointIdArray-1][2];
      this.scene.translate(x,y,z);
      this.scene.translate(this.atualPosition[0],this.atualPosition[1],this.atualPosition[2]);
      this.scene.rotate(this.horizontalAngle, 0, 1, 0);
      this.scene.rotate(-this.verticalAngle, 1, 0, 0);
    }

    clone(){
      var copy = new ArchAnimation(this.scene,this.id,this.animationTime,this.radius,this.center);
      return copy;
    }

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
