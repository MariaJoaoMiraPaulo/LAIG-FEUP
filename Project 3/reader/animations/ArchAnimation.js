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

        this.zAxis = vec3.fromValues(0,0,1);

        this.atualdist = 0;
        this.atualAngle = 0;

        this.over = false;
    }

    updatingVariables() {
      this.over = true;
      this.atualdist = 0;
      this.atualAngle = 0;

    }

    update(deltaTime) {
      this.atualdist += this.velocity * (deltaTime / 1000);

      this.atualAngle = this.atualdist / this.radius;

      if (this.atualdist > this.totalDist) {
        this.updatingVariables();
      }
    }

    display() {
      this.scene.translate(this.centerX, this.centerY, this.centerZ);
      this.scene.translate(this.radius * Math.cos(this.startAng), 0, -this.radius * Math.sin(this.startAng));
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
