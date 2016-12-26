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
            SELECTING_PAWN_NEXT_POSITION_PLAYER2:13,
            WAITING_FOR_SERVER_PLAYER1_BOARD: 14,
            WAITING_FOR_SERVER_PLAYER2_BOARD: 15,
            SELECTING_CELL: 16,
            UPDATE_BOARD_FROM_PLAYER1: 17,
            UPDATE_BOARD_FROM_PLAYER2: 18
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

      // var walls;
      //
      // for (let i = 0; i < this.board.length; i++) {
      //     for (let j = 0; j < this.board[i].length; j++) {
      //         if (this.scene.game.board[i][j] == returnPrologBoardAtom("wall")) {
      //             var z = i;
      //             var x = j;
      //             var tempArray = [x,z];
      //
      //
      //         }
      //     }
      // }
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
                this.updatePawnsPositions();
                break;
            case this.state.UPDATE_BOARD_FROM_PLAYER2:
                this.updatePawnsPositions();
                break;

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
            this.currentState = this.state.SELECTING_PAWN_PLAYER2;
            break;
          case this.state.UPDATE_BOARD_FROM_PLAYER2: //TODO MUDAR PARA PAREDE
            this.currentState = this.state.SELECTING_PAWN_PLAYER1;
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
        console.log('boas');
        console.log(obj);
        console.log(this.currentState);
        switch (this.currentState) {
            case this.state.SELECTING_PAWN_PLAYER1:
                this.currentState = this.state.SELECTING_PAWN_NEXT_POSITION_PLAYER1;
                this.chosenPawn = obj.pawnNumber;
                Board.prototype.validatePosition(this.player1.validPawnPosition(this.chosenPawn));
                console.log(this.chosenPawn);
                break;
            case this.state.SELECTING_PAWN_NEXT_POSITION_PLAYER1:
                console.log("X: " + obj.getPosX());
                console.log("Z: " + obj.getPosZ());
                console.log(Board.prototype.getPawnDiretion(obj.getPosX(),obj.getPosZ()));
                var direction = Board.prototype.getPawnDiretion(obj.getPosX(),obj.getPosZ());
                this.currentState = this.state.WAITING_FOR_SERVER_PLAYER1_BOARD;
                this.getNewBoard(obj.getPosX(),obj.getPosZ(),direction,1);
                break;
            case this.state.SELECTING_PAWN_PLAYER2:
                console.log("entrei pawn2");
                this.currentState = this.state.SELECTING_PAWN_NEXT_POSITION_PLAYER2;
                this.chosenPawn = obj.pawnNumber;
                Board.prototype.validatePosition(this.player2.validPawnPosition(this.chosenPawn));
                console.log(this.chosenPawn);
                break;
            case this.state.SELECTING_PAWN_NEXT_POSITION_PLAYER2:
                console.log("X: " + obj.getPosX());
                console.log("Z: " + obj.getPosZ());
                console.log(Board.prototype.getPawnDiretion(obj.getPosX(),obj.getPosZ()));
                var direction = Board.prototype.getPawnDiretion(obj.getPosX(),obj.getPosZ());
                this.currentState = this.state.WAITING_FOR_SERVER_PLAYER2_BOARD;
                this.getNewBoard(obj.getPosX(),obj.getPosZ(),direction,2);
                break;
            default:
                console.log('default');
        }
    }

    getNewBoard(x, y, direction,player) {
        var this_t = this;

        this.scene.client.getPrologRequest("move_player(" + JSON.stringify(this.board) + ","+direction+"," + player + "," + this.chosenPawn + ")", function(data) {
            console.log(JSON.parse(data.target.response));
            //  console.log(data.target.response);
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


    display() {
        this.checkCurrentState();
        this.player1.displayPawns();
        this.player1.displayWalls();

        this.player2.displayPawns();
        this.player2.displayWalls();
    }
}
