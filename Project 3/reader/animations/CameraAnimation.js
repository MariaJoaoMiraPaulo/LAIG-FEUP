/**
 * CameraAnimation
 * @constructor
 */
class CameraAnimation {
    constructor(scene, animationTime,startCamera, finalCamera) {
        this.scene = scene;
        this.animationTime = animationTime;
        this.startCamera = startCamera;
        this.finalCamera = finalCamera;

        this.midPoint = vec3.create();
        vec3.add(this.midPoint,this.startCamera.position,this.finalCamera.position);
        this.midPoint[0] = this.midPoint[0]/2;
        this.midPoint[1] = this.midPoint[1]/2;
        this.midPoint[2] = this.midPoint[2]/2;

        this.radiusVector = vec3.create();
        vec3.sub(this.radiusVector,this.startCamera.position,this.midPoint);

        this.radius = vec3.length(this.radiusVector);

        this.startCameraVector = vec3.create();
        vec3.sub(this.startCameraVector,this.startCamera.position,this.midPoint);

        this.finalCameraVector = vec3.create();
        vec3.sub(this.finalCameraVector,this.finalCamera.position,this.midPoint);

        this.direction = vec3.create();
        vec3.sub(this.direction,this.startCamera.position,this.midPoint);
        vec3.normalize(this.direction,this.direction);
        if(this.direction[0] == 0){
          this.direction[0] = 1;
        }
        if(this.direction[1] == 0){
          this.direction[1] = 1;
        }
        if(this.direction[2] == 0){
          this.direction[2] = 1;
        }

        this.angle = this.calcAngle(this.startCameraVector,this.finalCameraVector);

        this.over = false;
        this.timePassed = 0;

        this.multi = this.finalCamera.position[2]-this.startCamera.position[2];
    }

    update(deltaTime) {
        this.timePassed += deltaTime;

        let atualAngle = this.timePassed / this.animationTime * this.angle;
        if(atualAngle >= this.angle){
          this.over = true;
        }

        var fromVector = vec3.fromValues(this.midPoint[0] + this.direction[0]*this.radius*Math.sin(atualAngle), this.startCamera.position[1], this.midPoint[2] + this.direction[2]*this.radius*Math.cos(atualAngle));

        let camera = new CGFcamera(0.4, 0.1, 500, fromVector, this.startCamera.target);
        this.scene.camera = camera;
        this.scene.interface.setActiveCamera(this.scene.camera);
    }

    clone(){
      var copy = new CameraAnimation(this.scene,this.animationTime,this.startCamera,this.finalCamera);
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
