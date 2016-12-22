class Blockade {
    constructor() {
      this.player1 = new Player(1);
      this.player2 = new Player(2);
      this.board = new BlockadeBoard();
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
