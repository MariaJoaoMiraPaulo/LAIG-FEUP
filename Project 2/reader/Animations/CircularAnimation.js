/**
* CircularAnimation
* @constructor
*/
class CircularAnimation extends Animation{
  constructor(scene, id, animationTime, center, radius, startAng, rotAng){
    super(scene, id, animationTime);
    this.center=center;
    console.log("Center: "+this.center);
    this.centerX = this.center[0];
    this.centerY = this.center[1];
    this.centerZ = this.center[2];
    console.log("Center X: "+this.centerX);
    console.log("Center Y: "+this.centerY);
    console.log("Center Z: "+this.centerZ);

    this.radius = radius;
    console.log("Raio: "+this.radius);
    this.startAng = startAng;
    console.log("Angulo Inicial: " + this.startAng);
    this.rotAng = rotAng;

    console.log("Angulo Rotaçao: " + this.rotAng);

    this.dist = ((this.rotAng*Math.PI)/180)*this.radius;
    this.atualdist;
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
    if(this.atualAngle<this.rotAng){
      this.atualdist = Math.pow(deltaTime, -3)*this.dist;
      this.atualAngle+= this.atualdist/this.radius;
      console.log("atual \n" + this.atualAngle);
      console.log("rot \n" + this.rotAng);
    }
    console.log("acabei");
  }

    clone() {
        var copy = new CircularAnimation(this.scene, this.id, this.animationTime, this.center,this.radius,this.startAng,this.rotAng);
        return copy;
    }

  }
