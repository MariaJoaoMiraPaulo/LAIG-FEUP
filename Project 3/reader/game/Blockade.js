class Blockade {
    constructor(scene,graph) {
      this.graph = graph;
      this.scene = scene;
      this.player1 = new Player(1,this.graph,this.scene);
      this.player1.movePawnToStartPosition();
      this.player2 = new Player(2,this.graph,this.scene);
      this.player2.movePawnToStartPosition();
      this.player1.moveWallToStartPosition();
      this.player2.moveWallToStartPosition();

      var state = {
        SELECTING_PAWN:1,
        SELECTING_CELL:2,
        SELECTING_WALL:3,
        SELECTING_WALL_POSITION:4,
        PLAYING:5,
        GAME_OVER:6,
        PLAYER1_PLAYING:7,
        PLAYER2_PLAYING:8,
        WAITING_FOR_START:9,
        START_GAME:10
      };
      this.currentState = state.WAITING_FOR_START;

    }

    getCurrentState(){
      return this.currentState;
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
      //TODO: Melhorar
      this.player1.pawn1.display();
      this.player1.pawn2.display();
      this.player2.pawn1.display();
      this.player2.pawn2.display();
      this.player1.wall1.display();
      this.player2.wall1.display();
    }
}
