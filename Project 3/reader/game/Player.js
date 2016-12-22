class Player {
    constructor(player) {
      this.player = player;
      this.score = 0;
      this.walls = 9;

      switch (player) {
        case 1:
            this.pawn1 = p11;  //id do componente com a peça 1 do player 1
            this.pawn2 = p12;  //id do componente com a peça 2 do player 1
            break;
        case 2:
            this.pawn1 = p21; //id do componente com a peça 1 do player 2
            this.pawn2 = p22; //id do componente com a peça 2 do player 2
            break;
        default:

      }
    }

    getNumberWalls(){
      return this.walls();
    }

    setNumberWalls(numberWalls){
      this.walls = numberWalls;
    }

    getScore(){
      return this.score;
    }

    setScore(score){
      this.score = score;
    }

    getPawn1Id(){
      return pawn1;
    }

    getPawn2Id(){
      return pawn2;
    }
}
