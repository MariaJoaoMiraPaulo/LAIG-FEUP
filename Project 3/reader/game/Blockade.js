class Blockade {
    constructor(scene, graph) {
        this.graph = graph;
        this.scene = scene;
        this.player1 = new Player(1, this.graph, this.scene);
        this.player2 = new Player(2, this.graph, this.scene);
        this.player1.moveWallsToStartPosition();
        this.player2.moveWallsToStartPosition();
        this.board = [];
        this.getInitialBoard();
        this.pawns = [];

        this.selectWallId;
        this.firstWallx;
        this.firstWallz;
        this.secondWallx;
        this.secondWallz;

        this.currentWalls =[];

        this.state = {
            WAITING_FOR_START: 1,
            START_GAME: 2,
            INITIALIZE_BOARD: 3,
            PLAYER1_PLAYING: 4,
            PLAYER2_PLAYING: 5,
            PLAYING: 6,
            GAME_OVER: 7,
            SELECTING_PAWN_PLAYER1: 8,
            SELECTING_PAWN_PLAYER2: 9,
            SELECTING_WALL_PLAYER1: 10,
            SELECTING_WALL_PLAYER2: 11,
            SELECTING_PAWN_NEXT_POSITION_PLAYER1: 12,
            SELECTING_PAWN_NEXT_POSITION_PLAYER2: 13,
            WAITING_FOR_SERVER_PLAYER1_BOARD: 14,
            WAITING_FOR_SERVER_PLAYER2_BOARD: 15,
            SELECTING_CELL: 16,
            UPDATE_BOARD_FROM_PLAYER1: 17,
            UPDATE_BOARD_FROM_PLAYER2: 18,
            SELECTING_WALL_POSITION1_PLAYER1: 19,
            SELECTING_WALL_POSITION2_PLAYER1: 20,
            SELECTING_WALL_POSITION1_PLAYER2: 21,
            SELECTING_WALL_POSITION2_PLAYER2: 22,
            WAITING_FOR_SERVER_PLAYER1_WALL_BOARD: 23,
            WAITING_FOR_SERVER_PLAYER2_WALL_BOARD: 24,
            UPDATE_BOARD_FROM_PLAYER1_WALLS: 25,
            UPDATE_BOARD_FROM_PLAYER2_WALLS: 26,
        };
        this.currentState = this.state.WAITING_FOR_START;

    }

    getInitialBoard() {
        var this_t = this;

        this.scene.client.getPrologRequest('initial_board', function(data) {
            this_t.board = JSON.parse(data.target.response);

            this_t.currentState = this_t.state.INITIALIZE_BOARD;
        });
    }

    getAllBoardWalls(){

      for (let i = 0; i < this.board.length; i++) {
          for (let j = 0; j < this.board[i].length; j++) {
              if (this.scene.game.board[i][j] == this.returnPrologBoardAtom("wall") || this.scene.game.board[i][j] == this.returnPrologBoardAtom("verticalwall")) {
                  var z = i;
                  var x = j;
                  var tempArray = [z,x];
                  this.currentWalls.push(tempArray);
              }
          }
      }

      return true;
    }

    getAllPawnPositions(){

      this.pawns = [];

      for (let i = 0; i < this.board.length; i++) {
          for (let j = 0; j < this.board[i].length; j++) {
              if (this.scene.game.board[i][j] == this.returnPrologBoardAtom("player11") || this.scene.game.board[i][j] == this.returnPrologBoardAtom("player12") || this.scene.game.board[i][j] == this.returnPrologBoardAtom("player21") ||
               this.scene.game.board[i][j] == this.returnPrologBoardAtom("player22")) {
                  var z = i;
                  var x = j;
                  var tempArray = [z,x];
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
            case this.state.UPDATE_BOARD_FROM_PLAYER1:
            case this.state.UPDATE_BOARD_FROM_PLAYER2:
                this.updatePawnsPositions();
                this.getAllPawnPositions();
                break;
            case this.state.UPDATE_BOARD_FROM_PLAYER1_WALLS:
            case this.state.UPDATE_BOARD_FROM_PLAYER2_WALLS:
                this.updateWallPositions();
                this.getAllBoardWalls();
                break;

        }
    }

    updateWallPositions() {

      /*  for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
              if (this.board[i][j] == this.returnPrologBoardAtom("wall")){

              } else if (this.board[i][j] == this.returnPrologBoardAtom("verticalwall")) {

              }
            }
        }*/

        switch (this.currentState) {
            case this.state.UPDATE_BOARD_FROM_PLAYER1_WALLS:
                this.currentState = this.state.SELECTING_PAWN_PLAYER2;
                break;
            case this.state.UPDATE_BOARD_FROM_PLAYER2_WALLS:
                this.currentState = this.state.SELECTING_PAWN_PLAYER1;
                break;
            default:

        }
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
                this.currentState = this.state.SELECTING_PAWN_PLAYER1;
                break;
            case this.state.UPDATE_BOARD_FROM_PLAYER1: //TODO MUDAR PARA PAREDE
                this.currentState = this.state.SELECTING_WALL_PLAYER1;
                break;
            case this.state.UPDATE_BOARD_FROM_PLAYER2: //TODO MUDAR PARA PAREDE
                this.currentState = this.state.SELECTING_WALL_PLAYER2;
                break;
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
            case this.state.SELECTING_PAWN_PLAYER1:
                this.currentState = this.state.SELECTING_PAWN_NEXT_POSITION_PLAYER1;
                this.chosenPawn = obj.pawnNumber;
                Board.prototype.validatePosition(this.player1.validPawnPosition(this.chosenPawn));
                break;
            case this.state.SELECTING_PAWN_NEXT_POSITION_PLAYER1:
                var direction = Board.prototype.getPawnDiretion(obj.getPosX(), obj.getPosZ());
                this.currentState = this.state.WAITING_FOR_SERVER_PLAYER1_BOARD;
                this.getNewBoard(obj.getPosX(), obj.getPosZ(), direction, 1);
                break;
            case this.state.SELECTING_WALL_PLAYER1:
                if(obj instanceof Wall){
                obj.used = true;
                this.selectWallId = obj.getWallNumber();
                this.currentState = this.state.SELECTING_WALL_POSITION1_PLAYER1;
              }
              else if(obj instanceof Button){
                  this.currentState = this.state.SELECTING_PAWN_PLAYER2;
              }
                break;
            case this.state.SELECTING_WALL_POSITION1_PLAYER1:
                this.firstWallx = obj.getPosX();
                this.firstWallz = obj.getPosZ();
                Board.prototype.currentWallPositionX = this.firstWallx;
                Board.prototype.currentWallPositionZ = this.firstWallz;
                this.currentState = this.state.SELECTING_WALL_POSITION2_PLAYER1;
                break;
            case this.state.SELECTING_WALL_POSITION2_PLAYER1:
                this.secondWallx = obj.getPosX();
                this.secondWallz = obj.getPosZ();
                var orientation = Board.prototype.getWallOrientation(this.firstWallz, this.firstWallx, this.secondWallz, this.secondWallx);
                if (!orientation) {
                    this.currentState = this.state.SELECTING_WALL_POSITION1_PLAYER1;
                } else {
                    var wall=this.player1.getWallNumber(this.selectWallId);
                    wall.setWallXCoord(Board.prototype.convertPositionOnBoard(this.firstWallx));
                    wall.setWallZCoord(Board.prototype.convertPositionOnBoard(this.firstWallz));
                    wall.setSecondWallXCoord(Board.prototype.convertPositionOnBoard(this.secondWallx));
                    wall.setSecondWallZCoord(Board.prototype.convertPositionOnBoard(this.secondWallz));
                    wall.setWallOrientation(orientation);
                    this.getBoardWithNewWalls(orientation);
                    this.currentState = this.state.WAITING_FOR_SERVER_PLAYER1_WALL_BOARD;
                }
                break;
            case this.state.SELECTING_PAWN_PLAYER2:
                this.currentState = this.state.SELECTING_PAWN_NEXT_POSITION_PLAYER2;
                this.chosenPawn = obj.pawnNumber;
                Board.prototype.validatePosition(this.player2.validPawnPosition(this.chosenPawn));
                break;
            case this.state.SELECTING_PAWN_NEXT_POSITION_PLAYER2:
                var direction = Board.prototype.getPawnDiretion(obj.getPosX(), obj.getPosZ());
                this.currentState = this.state.WAITING_FOR_SERVER_PLAYER2_BOARD;
                this.getNewBoard(obj.getPosX(), obj.getPosZ(), direction, 2);
                break;
            case this.state.SELECTING_WALL_PLAYER2:
                if(obj instanceof Wall){
                  this.selectWallId = obj.getWallNumber();
                  obj.used = true;
                  this.currentState = this.state.SELECTING_WALL_POSITION1_PLAYER2;
                }
                else if(obj instanceof Button){
                    this.currentState = this.state.SELECTING_PAWN_PLAYER1;
                }
                break;
            case this.state.SELECTING_WALL_POSITION1_PLAYER2:
                this.firstWallx = obj.getPosX();
                this.firstWallz = obj.getPosZ();
                Board.prototype.currentWallPositionX = this.firstWallx;
                Board.prototype.currentWallPositionZ = this.firstWallz;
                this.currentState = this.state.SELECTING_WALL_POSITION2_PLAYER2;
                break;
            case this.state.SELECTING_WALL_POSITION2_PLAYER2:
                this.secondWallx = obj.getPosX();
                this.secondWallz = obj.getPosZ();
                var orientation = Board.prototype.getWallOrientation(this.firstWallz, this.firstWallx, this.secondWallz, this.secondWallx);
                if (!orientation) {
                    this.currentState = this.state.SELECTING_WALL_POSITION1_PLAYER2;
                } else {
                    var wall=this.player2.getWallNumber(this.selectWallId);
                    wall.setWallXCoord(Board.prototype.convertPositionOnBoard(this.firstWallx));
                    wall.setWallZCoord(Board.prototype.convertPositionOnBoard(this.firstWallz));
                    wall.setSecondWallXCoord(Board.prototype.convertPositionOnBoard(this.secondWallx));
                    wall.setSecondWallZCoord(Board.prototype.convertPositionOnBoard(this.secondWallz));
                    wall.setWallOrientation(orientation);
                    this.getBoardWithNewWalls(orientation);
                    this.currentState = this.state.WAITING_FOR_SERVER_PLAYER2_WALL_BOARD;
                }
                break;
            default:
                console.log('default');
        }
    }

    getNewBoard(x, y, direction, player) {
        var this_t = this;

        this.scene.client.getPrologRequest("move_player(" + JSON.stringify(this.board) + "," + direction + "," + player + "," + this.chosenPawn + ")", function(data) {
            this_t.board = JSON.parse(data.target.response);
            switch (this_t.currentState) {
                case this_t.state.WAITING_FOR_SERVER_PLAYER1_BOARD:
                    this_t.currentState = this_t.state.UPDATE_BOARD_FROM_PLAYER1;
                    break;
                case this_t.state.WAITING_FOR_SERVER_PLAYER2_BOARD:
                    this_t.currentState = this_t.state.UPDATE_BOARD_FROM_PLAYER2;
                    break;
                default:

            }

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

                switch (this_t.currentState) {
                    case this_t.state.WAITING_FOR_SERVER_PLAYER1_WALL_BOARD:
                        this_t.currentState = this_t.state.UPDATE_BOARD_FROM_PLAYER1_WALLS;
                        break;
                    case this_t.state.WAITING_FOR_SERVER_PLAYER2_WALL_BOARD:
                        this_t.currentState = this_t.state.UPDATE_BOARD_FROM_PLAYER2_WALLS;
                        break;
                    default:

                }
            });
    }

    display() {
        this.checkCurrentState();
        this.player1.displayPawns();
        this.player1.displayWalls();
        this.player1.displayButton();

        this.player2.displayPawns();
        this.player2.displayWalls();
        this.player2.displayButton();

    }

    update(currTime){
      this.player1.update(currTime);
      this.player2.update(currTime);
    }
}
