class RoomScenario {
    constructor(scene) {
        this.scene = scene;
        this.reader = this.scene.reader;
        this.graph = this.scene.graph;

        this.orangeMaterial = new CGFappearance(this);
        this.orangeMaterial.setAmbient(0.3,0.1,0,0);
        this.orangeMaterial.setDiffuse(0.3,0.1,0,0);
        this.orangeMaterial.setSpecular(0.3,0.1,0,0);
        this.orangeMaterial.setShininess(0);

        this.yellowMaterial = new CGFappearance(this);
        this.yellowMaterial.setAmbient(0.6,0.3,0,0);
        this.yellowMaterial.setDiffuse(0.6,0.3,0,0);
        this.yellowMaterial.setSpecular(0.6,0.3,0,0);
        this.yellowMaterial.setShininess(0);
    }

    display(){

    }




}
