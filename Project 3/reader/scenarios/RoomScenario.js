class RoomScenario {
    constructor(scene) {
        this.scene = scene;
        this.reader = this.scene.reader;
        this.graph = this.scene.graph;

        this.player2Material = new CGFappearance(this.scene);
        this.player2Material.setAmbient(0.6,0.3,0,0);
        this.player2Material.setDiffuse(0.6,0.3,0,0);
        this.player2Material.setSpecular(0.6,0.3,0,0);
        this.player2Material.setShininess(0);

        this.player1Material = new CGFappearance(this.scene);
        this.player1Material.setAmbient(0.3,0.1,0,0);
        this.player1Material.setDiffuse(0.3,0.1,0,0);
        this.player1Material.setSpecular(0.3,0.1,0,0);
        this.player1Material.setShininess(0);

        this.wallpapper = new CGFappearance(this.scene);
        this.wallpapper.setAmbient(1,1,1,0);
        this.wallpapper.setDiffuse(1,1,1,0);
        this.wallpapper.setSpecular(1,1,1,0);
        this.wallpapper.loadTexture("img/wallpapper.jpg");

        this.floorM = new CGFappearance(this.scene);
        this.floorM.setAmbient(1,1,1,0);
        this.floorM.setDiffuse(1,1,1,0);
        this.floorM.setSpecular(1,1,1,0);
        this.floorM.loadTexture("img/table.jpg");

        this.wall = new Rectangle(this.scene,0.5,0.5,-0.5,-0.5);
        this.blockadeTitle = new Obj(this.scene,"img/blockade.obj");
        this.wallLeft = new Rectangle(this.scene,0.5,0.5,-0.5,-0.5);
        this.floor = new Rectangle(this.scene,0.5,0.5,-0.5,-0.5);
        this.wallRigth = new Rectangle(this.scene,0.5,0.5,-0.5,-0.5);
        this.wallFront = new Rectangle(this.scene,0.5,0.5,-0.5,-0.5);

    }

    display(){

      this.scene.pushMatrix();
      this.scene.translate(5,0,40);
      this.scene.scale(70,40,40);
      this.wallpapper.apply();
      this.wall.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.rotate(-Math.PI,0,1,0);
      this.scene.translate(-5,0,25);
      this.scene.scale(70,40,40);
      this.wallpapper.apply();
      this.wallFront.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.rotate(-Math.PI/2,0,1,0);
      this.scene.translate(10,0,30);
      this.scene.scale(70,40,40);
      this.wallpapper.apply();
      this.wallRigth.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.rotate(Math.PI,0,1,0);
      this.scene.translate(-7,8,-40);
      this.scene.scale(0.2,0.2,0.2);
      this.blockadeTitle.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2,0,1,0);
      this.scene.translate(-10,0,40);
      this.scene.scale(70,40,40);
      this.wallpapper.apply();
      this.wallLeft.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2,1,0,0);
      this.scene.translate(5,10,20);
      this.scene.scale(70,70,80);
      this.floorM.apply();
      this.floor.display();
      this.scene.popMatrix();
    }




}
