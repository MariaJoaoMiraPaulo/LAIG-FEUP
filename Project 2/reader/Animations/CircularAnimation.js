/**
* CircularAnimation
* @constructor
*/
class CircularAnimation extends Animation{
  constructor(scene, id, animationTime, center, radius, startAng, rotAng){
    super(scene, id, animationTime);
    this.center=center;
    this.centerX = this.center[0];
    this.centerY = this.center[1];
    this.centerZ = this.center[2];

    this.radius = radius;
    this.startAng = startAng;
    this.rotAng = rotAng;

    this.dist = ((this.rotAng*Math.PI)/180)*this.radius;
    this.atualdist=0;
    this.atualAngle=0;
    console.log("Dist:"+this.dist);

  }

  display(){
    this.scene.translate(-this.centerX,-this.centerY,-this.centerZ);
    this.scene.rotate((this.startAng*Math.PI)/180,0,1,0);
    this.scene.rotate(this.atualAngle,0,1,0);
    //this.scene.rotate((this.startAng*Math.PI)/180,1,0,0);
    this.scene.translate(this.centerX,this.centerY,this.centerZ);
  }

  update(deltaTime){
    if(this.atualAngle<((this.rotAng*Math.PI)/180)){
      this.atualdist+= ((deltaTime/1000)*this.dist)/(this.animationTime/1000);
      this.atualAngle = this.atualdist/this.radius;
      console.log("atual \n" + this.atualAngle);
    }
    else console.log("acabei");
  }

    clone() {
        var copy = new CircularAnimation(this.scene, this.id, this.animationTime, this.center,this.radius,this.startAng,this.rotAng);
        return copy;
    }

  }
