class Blockade {
    constructor(scene,graph) {
      this.graph = graph;
      this.scene = scene;
      this.player1 = new Player(1,this.graph,this.scene);
      this.player1.movePawnToStartPosition();
      this.player2 = new Player(2,this.graph,this.scene);
      this.player2.movePawnToStartPosition();
      this.player1.moveWallsToStartPosition();
      this.player2.moveWallsToStartPosition();

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
      this.player1.displayPawns();
      this.player1.displayWalls();

      this.player2.displayPawns();
      this.player2.displayWalls();
    }
}
