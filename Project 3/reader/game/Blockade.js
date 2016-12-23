class Blockade {
    constructor(scene,graph) {
      this.graph = graph;
      this.scene = scene;
      this.player1 = new Player(1,this.graph,this.scene);
      this.player1.movePawnToStartPosition();
      this.player2 = new Player(2,this.graph,this.scene);
      this.player2.movePawnToStartPosition();

    }

    getPlayer1(){
      return this.player1;
    }

    getPlayer2(){
      return this.player2;
    }

    getBoard(){
      return this.board;
    }

    display(){
      console.log("ola");
      this.player1.pawn1.display();
      this.player1.pawn2.display();
      this.player2.pawn1.display();
      this.player2.pawn2.display();
    }
}
