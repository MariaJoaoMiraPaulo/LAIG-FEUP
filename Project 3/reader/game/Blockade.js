class Blockade {
  constructor(scene, graph,gameMode) {
    this.graph = graph;
    this.scene = scene;
    this.gameMode = gameMode;

    this.player1 = new Player(1, this.graph, this.scene);
    this.player2 = new Player(2, this.graph, this.scene);

    this.player1.moveWallsToStartPosition();
    this.player2.moveWallsToStartPosition();
    this.board = [];
    this.getInitialBoard();
    this.pawns = [];

    this.player;

    this.selectWallId;
    this.firstWallx;
    this.firstWallz;
    this.secondWallx;
    this.secondWallz;

    this.currentWalls = [];

    this.state = {
      WAITING_FOR_START: 1,
      INITIALIZE_BOARD: 3,
      SELECTING_PAWN: 27,
      SELECTING_PAWN_NEXT_POSITION: 28,
      WAITING_FOR_SERVER_NEW_BOARD: 29,
      UPDATE_BOARD_WITH_SERVER_BOARD: 30,
      SELECTING_WALL: 31,
      SELECTING_FIRST_WALL_POSITION: 32,
      SELECTING_SECOND_WALL_POSITION: 33,
      WAITING_FOR_SERVER_NEW_BOARD_WALLS: 34,
      UPDATE_BOARD_WITH_SERVER_NEW_WALLS: 35,
    };
    this.currentState = this.state.WAITING_FOR_START;

  }

  getGameStateInstruction(){
    switch (this.currentState) {
      case this.state.INITIALIZE_BOARD:
        return "Preparing your game... Loading pawns";
        break;
      case this.state.SELECTING_PAWN:
        return "Select one of your pawns";
        break;
      case this.state.SELECTING_PAWN_NEXT_POSITION:
        return "Move your pawn to one of the possible cells";
        break;
      case this.state.SELECTING_WALL:
        return "Select one of your walls or just click on button to step over";
        break;
      case this.state.SELECTING_FIRST_WALL_POSITION:
        return "Select wall's first position";
        break;
      case this.state.SELECTING_SECOND_WALL_POSITION:
        return "Select wall's second position";
        break;
      default:
        return "Nothing to see..."
        break;
    }
  }

  getInitialBoard() {
    var this_t = this;

    this.scene.client.getPrologRequest('initial_board', function(data) {
      this_t.board = JSON.parse(data.target.response);

      this_t.currentState = this_t.state.INITIALIZE_BOARD;
    });
  }

  getAllBoardWalls() {

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.scene.game.board[i][j] == this.returnPrologBoardAtom("wall") || this.scene.game.board[i][j] == this.returnPrologBoardAtom("verticalwall")) {
          var z = i;
          var x = j;
          var tempArray = [z, x];
          this.currentWalls.push(tempArray);
        }
      }
    }

    return true;
  }

  getAllPawnPositions() {

    this.pawns = [];

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.scene.game.board[i][j] == this.returnPrologBoardAtom("player11") || this.scene.game.board[i][j] == this.returnPrologBoardAtom("player12") || this.scene.game.board[i][j] == this.returnPrologBoardAtom("player21") ||
        this.scene.game.board[i][j] == this.returnPrologBoardAtom("player22")) {
          var z = i;
          var x = j;
          var tempArray = [z, x];
          this.pawns.push(tempArray);
        }
      }
    }

    return true;
  }

  getCurrentState() {
    return this.currentState;
  }

  getPlayer1() {
    return this.player1;
  }

  getPlayer2() {
    return this.player2;
  }

  getBoard() {
    return this.board;
  }

  checkCurrentState() {

    switch (this.currentState) {
      case this.state.INITIALIZE_BOARD:
      this.updatePawnsPositions();
      break;
      case this.state.UPDATE_BOARD_WITH_SERVER_BOARD:
      this.updatePawnsPositions();
      this.getAllPawnPositions();
      break;
      case this.state.UPDATE_BOARD_WITH_SERVER_NEW_WALLS:
      this.changeTurn();
      this.getAllBoardWalls();
      break;

    }
  }

  changeTurn() {

    if (this.player == 1) {
      this.player = 2;
    } else this.player = 1;

    this.currentState = this.state.SELECTING_PAWN;
  }

  updatePawnsPositions() {
    var positionPlayer1 = {};
    var positionPlayer2 = {};

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] == this.returnPrologBoardAtom("player11")) {
          positionPlayer1['x1'] = Board.prototype.convertPositionOnBoard(j);
          positionPlayer1['y1'] = Board.prototype.convertPositionOnBoard(i);
        } else if (this.board[i][j] == this.returnPrologBoardAtom("player12")) {
          positionPlayer1['x2'] = Board.prototype.convertPositionOnBoard(j);
          positionPlayer1['y2'] = Board.prototype.convertPositionOnBoard(i);
        } else if (this.board[i][j] == this.returnPrologBoardAtom("player21")) {
          positionPlayer2['x1'] = Board.prototype.convertPositionOnBoard(j);
          positionPlayer2['y1'] = Board.prototype.convertPositionOnBoard(i);
        } else if (this.board[i][j] == this.returnPrologBoardAtom("player22")) {
          positionPlayer2['x2'] = Board.prototype.convertPositionOnBoard(j);
          positionPlayer2['y2'] = Board.prototype.convertPositionOnBoard(i);
        }
      }
    }

    this.player1.movePawn(positionPlayer1);
    this.player2.movePawn(positionPlayer2);

    switch (this.currentState) {
      case this.state.INITIALIZE_BOARD:
      this.currentState = this.state.SELECTING_PAWN;
      this.player = 1;
      break;
      case this.state.UPDATE_BOARD_WITH_SERVER_BOARD:
      this.currentState = this.state.SELECTING_WALL;
      default:
    }
  }

  returnPrologBoardAtom(string) {
    switch (string) {
      case "empty":
      return 0;
      break;
      case "noVerticalWall":
      return 1;
      break;
      case "noWall":
      return 2;
      break;
      case "wall":
      return 3;
      break;
      case "verticalwall":
      return 4;
      break;
      case "player11":
      return 5;
      break;
      case "player12":
      return 6;
      break;
      case "player21":
      return 7;
      break;
      case "player22":
      return 8;
      break;
      case "null":
      return 9;
      break;
      case "startPlayer1":
      return 10;
      break;
      case "startPlayer2":
      return 11;
      break;
      case "winnerplayer2":
      return 12;
      break;
      case "winnerplayer1":
      return 13;
      break;

      default:

    }
  }

  pickingHandler(obj) {

    switch (this.currentState) {
      case this.state.SELECTING_PAWN:
      this.selectingPawn(obj);
      break;
      case this.state.SELECTING_PAWN_NEXT_POSITION:
      this.selectingPawnNextPosition(obj);
      break;
      case this.state.SELECTING_WALL:
      this.selectingWall(obj);
      break;
      case this.state.SELECTING_FIRST_WALL_POSITION:
      this.selectingFirstWallPosition(obj.getPosX(), obj.getPosZ());
      break;
      case this.state.SELECTING_SECOND_WALL_POSITION:
      this.selectingSecondWallPosition(obj.getPosX(), obj.getPosZ());
      break;
      default:
      console.log('default');
    }
  }

  selectingPawn(obj) {
    this.chosenPawn = obj.pawnNumber;

    if (obj instanceof Pawn) {

      if (this.player == 1) {
        Board.prototype.validatePosition(this.player1.validPawnPosition(this.chosenPawn));
      } else if (this.player == 2) {
        Board.prototype.validatePosition(this.player2.validPawnPosition(this.chosenPawn));
      }

      this.currentState = this.state.SELECTING_PAWN_NEXT_POSITION;
    }
  }

  selectingPawnNextPosition(obj) {

    if(obj instanceof Button){
        this.currentState = this.state.SELECTING_PAWN;
    }
    else{
      var x = obj.getPosX();
      var z = obj.getPosZ();
      var direction = Board.prototype.getPawnDiretion(x, z);
      this.currentState = this.state.WAITING_FOR_SERVER_NEW_BOARD;
      this.getNewBoard(x, z, direction, this.player);
    }

  }

  selectingWall(obj) {
    if (obj instanceof Wall) {
      obj.used = true;
      this.selectWallId = obj.getWallNumber();

      this.currentState = this.state.SELECTING_FIRST_WALL_POSITION;

    } else if (obj instanceof Button) {
      this.changeTurn();
      this.currentState = this.state.SELECTING_PAWN;
    }
  }

  selectingFirstWallPosition(x, z) {
    this.firstWallx = x;
    this.firstWallz = z;
    Board.prototype.currentWallPositionX = this.firstWallx;
    Board.prototype.currentWallPositionZ = this.firstWallz;

    this.currentState = this.state.SELECTING_SECOND_WALL_POSITION;
  }

  selectingSecondWallPosition(x, z) {

    this.secondWallx = x;
    this.secondWallz = z;

    var orientation = Board.prototype.getWallOrientation(this.firstWallz, this.firstWallx, this.secondWallz, this.secondWallx);

    if (!orientation) { //if it isn't a valid orientation
    this.currentState = this.state.SELECTING_FIRST_WALL_POSITION;
  } else {
    if (this.player == 1) {
      var wall = this.player1.getWallNumber(this.selectWallId);
    } else if (this.player == 2) {
      var wall = this.player2.getWallNumber(this.selectWallId);
    }

    wall.setWallXCoord(Board.prototype.convertPositionOnBoard(this.firstWallx));
    wall.setWallZCoord(Board.prototype.convertPositionOnBoard(this.firstWallz));
    wall.setSecondWallXCoord(Board.prototype.convertPositionOnBoard(this.secondWallx));
    wall.setSecondWallZCoord(Board.prototype.convertPositionOnBoard(this.secondWallz));
    wall.setWallOrientation(orientation);
    this.getBoardWithNewWalls(orientation);

    this.currentState = this.state.WAITING_FOR_SERVER_NEW_BOARD_WALLS;

  }
}

getNewBoard(x, y, direction, player) {
  var this_t = this;

  this.scene.client.getPrologRequest("move_player(" + JSON.stringify(this.board) + "," + direction + "," + player + "," + this.chosenPawn + ")", function(data) {
    this_t.board = JSON.parse(data.target.response);

    this_t.currentState = this_t.state.UPDATE_BOARD_WITH_SERVER_BOARD;

  });
}

getBoardWithNewWalls(orientation) {
  var this_t = this;

  var firstx = this.firstWallx + 1;
  var firstz = this.firstWallz + 1;
  var secondx = this.secondWallx + 1;
  var secondz = this.secondWallz + 1;

  this.scene.client.getPrologRequest("put_wall(" + JSON.stringify(this.board) + "," + orientation + "," + firstx + "," +
  firstz + "," + secondx + "," + secondz + ")",
  function(data) {
    this_t.board = JSON.parse(data.target.response);

    this_t.currentState = this_t.state.UPDATE_BOARD_WITH_SERVER_NEW_WALLS;
  });
}

display() {
  this.checkCurrentState();
  this.player1.displayPawns();
  this.player1.displayWalls();
  this.player1.displayStepOverButton();
  this.player1.displayBackButton();

  this.player2.displayPawns();
  this.player2.displayWalls();
  this.player2.displayStepOverButton();
  this.player2.displayBackButton();

}

update(currTime) {
  this.player1.update(currTime);
  this.player2.update(currTime);
}
}
