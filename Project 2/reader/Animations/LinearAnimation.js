/**
 * LinearAnimation
 * @constructor
 */
class LinearAnimation extends Animation {
    constructor(scene, id, animationTime, controlPoints) {
        super(scene, id, animationTime);
        this.controlPoints = controlPoints;
        this.v1 = vec3.fromValues(1, 1, 1);
        this.v2 = vec3.fromValues(2, 2, 2);

        this.direction = vec3.create();
        vec3.sub(this.direction, this.controlPoints[1], this.controlPoints[0]);

        this.atualPosition = vec3.create();

        this.pointsDistance = vec3.length(this.direction);
        this.distanceSinceLastPoint = 0;
        this.atualPointIdArray = 1;

        this.totalDist;
        this.velocity;

        this.getTotalDistanceAndVelocity();

        this.over = false;
    }

    getTotalDistanceAndVelocity() {
        this.totalDist = 0;
        var dir = vec3.create();

        for (let i = 1; i < this.controlPoints.length; i++) {
            vec3.sub(dir, this.controlPoints[i], this.controlPoints[i - 1]);
            this.totalDist += vec3.length(dir);
        }

        this.velocity = this.totalDist / this.animationTime;
        console.log(this.totalDist);
        console.log(this.velocity);
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

        this.distanceSinceLastPoint += distance;
        let r;

        if (this.distanceSinceLastPoint > this.pointsDistance) {
            this.distanceSinceLastPoint -= this.pointsDistance;
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
    }

    clone(){
      var copy = new LinearAnimation(this.scene,this.id,this.animationTime,this.controlPoints);
      return copy;
    }
}
