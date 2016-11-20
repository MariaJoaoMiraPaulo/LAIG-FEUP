/**
 * CircularAnimation
 * @constructor
 */
class CircularAnimation extends Animation {
    constructor(scene, id, animationTime, center, radius, startAng, rotAng) {
        super(scene, id, animationTime);
        this.center = center;
        this.centerX = this.center[0];
        this.centerY = this.center[1];
        this.centerZ = this.center[2];
        this.radius = radius;
        this.startAng = startAng;
        this.rotAng = rotAng;

        this.dist = this.rotAng * this.radius;
        this.atualdist = 0;
        this.atualAngle = 0;

        this.over = false;

    }

    display() {
        this.scene.translate(this.centerX, this.centerY, this.centerZ);
        this.scene.translate(this.radius * Math.cos(this.startAng + this.atualAngle), 0, -this.radius * Math.sin(this.startAng + this.atualAngle));
        this.scene.rotate(Math.PI + this.startAng + this.atualAngle, 0, 1, 0);
    }

    update(deltaTime) {
        if (this.atualAngle < this.rotAng) {
            this.atualdist += ((deltaTime / 1000) * this.dist) / (this.animationTime / 1000);
            this.atualAngle = this.atualdist / this.radius;
        } else {
            this.over = true;
            this.atualAngle = 0;
            this.atualdist = 0;
        }
    }

    clone() {
        var copy = new CircularAnimation(this.scene, this.id, this.animationTime, this.center, this.radius, this.startAng, this.rotAng);
        return copy;
    }

}
