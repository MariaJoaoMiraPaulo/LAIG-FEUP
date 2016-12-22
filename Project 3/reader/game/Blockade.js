class Blockade {
    constructor(graph) {
      this.graph = graph;
      this.player1 = new Player(1,this.graph);
      this.player2 = new Player(2,this.graph);
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
}
