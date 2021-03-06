/**
 * Blockade
 */
class Blockade {
    /**
     * Blockade constructor
     * @param scene CGFscene where the component will be displayed
     * @param graph graph of the scene
     * @param gameMode mode of the game
     */
    constructor(scene, graph, gameMode) {
        this.graph = graph;
        this.scene = scene;
        this.gameMode = gameMode; // player vs bot player1=player player2=bot

        this.player1 = new Player(1, this.graph, this.scene);
        this.player2 = new Player(2, this.graph, this.scene);

        var x = Board.prototype.convertPositionOnBoard(4);
        var x1 = Board.prototype.convertPositionOnBoard(14);

        var z = Board.prototype.convertPositionOnBoard(4);
        var z1 = Board.prototype.convertPositionOnBoard(12);

        var y = 1.3;

        this.startPos11 = [x, y, z];
        this.startPos12 = [x1, y, z];
        this.startPos21 = [x, y, z1];
        this.startPos22 = [x1, y, z1];

        this.animationsSpeed = this.scene.speed;

        this.StartPos11Circle = new StartPos(this.scene, this.reader, 1);
        this.StartPos12Circle = new StartPos(this.scene, this.reader, 1);
        this.StartPos21Circle = new StartPos(this.scene, this.reader, 2);
        this.StartPos22Circle = new StartPos(this.scene, this.reader, 2);

        this.materialp1 = this.scene.scenario.player1Material;
        this.materialp2 = this.scene.scenario.player2Material;

        this.player1.moveWallsToStartPosition();
        this.player2.moveWallsToStartPosition();

        this.board = [];
        this.getInitialBoard(0);
        this.pawns = [];

        this.player = 1;

        this.selectWallId;
        this.firstWallx;
        this.firstWallz;
        this.secondWallx;
        this.secondWallz;
        this.currentPawnDirection;
        this.currentPickedWall;
        this.wallPicked = false;
        this.playNumber = 0;

        this.lastUpdateTime;
        this.firstTime = -1;
        this.currentTime = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;

        this.currentWalls = [];

        this.state = {
            WAITING_FOR_START: 1,
            INITIALIZE_BOARD: 2,
            SELECTING_PAWN: 3,
            SELECTING_PAWN_NEXT_POSITION: 4,
            WAITING_FOR_SERVER_NEW_BOARD: 5,
            UPDATE_BOARD_WITH_SERVER_BOARD: 6,
            SELECTING_WALL: 7,
            SELECTING_FIRST_WALL_POSITION: 8,
            SELECTING_SECOND_WALL_POSITION: 9,
            WAITING_FOR_SERVER_NEW_BOARD_WALLS: 10,
            UPDATE_BOARD_WITH_SERVER_NEW_WALLS: 11,
            BOT_ASK_SERVER_FOR_PAWN_AND_DIRECTION: 12,
            WAITING_FOR_SERVER_BOT_PAWN_AND_DIRECTION: 13,
            BOT_GET_NEW_BOARD: 14,
            BOT_ASK_SERVER_FOR_WALL: 15,
            WAITING_FOR_SERVER_WALL_RESPONSE: 16,
            BOT_GET_NEW_WALLS_BOARD: 17,
            WAITING_FOR_SERVER_BOARD_WALL: 18,
            WINNER: 19,
            PAWN_ANIMATION: 20,
            GET_MOVIE_PLAY_PAWN: 21,
            GET_MOVIE_PLAY_WALL: 22,
            END_MOVIE: 23,
            INVALID_GAME: 24,
            CAMERA_ANIMATION: 25,
            CONNECTION_ERROR: 26
        };
        this.currentState = this.state.WAITING_FOR_START;

        if (this.gameMode != XMLscene.gameMode.MOVIE) {
            this.scene.movieArray = [];
        } else {
            if (this.scene.movieArray.length == 0) {
                this.currentState = this.state.INVALID_GAME;
            }
        }

        this.scene.camera = this.initDefaultCamera();
        this.scene.interface.setActiveCamera(this.scene.camera);
    }

    /**
     * Sets the start position material
     */
    setStartPositionMaterial() {
        this.materialp1 = this.scene.scenario.player1Material;
        this.materialp2 = this.scene.scenario.player2Material;
    }

    /**
     * Gets the game instructions to be displayed on the screen
     * @returns insctructions to be displayed
     */
    getGameStateInstruction() {
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
            case this.state.BOT_ASK_SERVER_FOR_PAWN_AND_DIRECTION:
            case this.state.WAITING_FOR_SERVER_BOT_PAWN_AND_DIRECTION:
            case this.state.BOT_GET_NEW_BOARD:
            case this.state.BOT_ASK_SERVER_FOR_WALL:
            case this.state.WAITING_FOR_SERVER_WALL_RESPONSE:
            case this.state.BOT_GET_NEW_WALLS_BOARD:
            case this.state.WAITING_FOR_SERVER_BOARD_WALL:
                return "Bot Playing...";
                break;
            case this.state.WINNER:
                return "Player " + this.player + " is the winner!!";
                break;
            case this.state.END_MOVIE:
                return "Movie ended!!";
                break;
            case this.state.INVALID_GAME:
                return "Invalid Movie, Start a new game";
                break;
            case this.state.CONNECTION_ERROR:
                return "Connection error!! Please turn on your prolog server!";
                break;
            default:
                return " "
                break;
        }
    }

    /**
     * Gets the initial board from prolog
     * @param canIstart if the user already pressed start game button
     */
    getInitialBoard(canIstart) {
        var this_t = this;

        if (canIstart) {
            this.scene.client.getPrologRequest('initial_board', function(data) {
                this_t.board = JSON.parse(data.target.response);

                if (this_t.currentState != this_t.state.INVALID_GAME) {
                    this_t.currentState = this_t.state.INITIALIZE_BOARD;
                }
            }, function(data) {
                this_t.currentState = this_t.state.CONNECTION_ERROR;
            });
        } else {
            this.scene.client.getPrologRequest('initial_board', function(data) {
                this_t.board = JSON.parse(data.target.response);

                if (this_t.currentState != this_t.state.INVALID_GAME) {
                    this_t.currentState = this_t.state.WAITING_FOR_START;
                }
            }, function(data) {
                this_t.currentState = this_t.state.CONNECTION_ERROR;
            });
        }
    }

    /**
     * Gets all walls off the board
     * @returns {boolean}
     */
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

    /**
     * Gets all 4 positions that cointains pawns
     * @returns {boolean}
     */
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

    /**
     * Gets current state
     * @returns current state
     */
    getCurrentState() {
        return this.currentState;
    }

    /**
     * Gets player 1
     * @returns player1
     */
    getPlayer1() {
        return this.player1;
    }

    /**
     * Gets player 2
     * @returns player2}
     */
    getPlayer2() {
        return this.player2;
    }

    /**
     * Gets the game board
     * @returns board
     */
    getBoard() {
        return this.board;
    }

    /**
     * Functions used to pulling some states
     */
    checkCurrentState() {

        switch (this.currentState) {
            case this.state.WAITING_FOR_START:
                this.updatePawnsPositions2();
                break;
            case this.state.INITIALIZE_BOARD:
                this.updatePawnsPositions();
                this.scene.camera = this.player1.initCamera();
                this.scene.interface.setActiveCamera(this.scene.camera);
                break;
            case this.state.UPDATE_BOARD_WITH_SERVER_BOARD:
                this.updatePawnsPositions();
                this.getAllPawnPositions();
                break;
            case this.state.UPDATE_BOARD_WITH_SERVER_NEW_WALLS:
                //this.changeTurn();
                this.getAllBoardWalls();
                if (this.gameMode == XMLscene.gameMode.PLAYER_VS_PLAYER) {
                    this.currentState = this.state.CAMERA_ANIMATION;
                    this.initCameraAnimation();
                } else {
                    this.changeTurn();
                }
                break;

        }
    }

    /**
     * Initializes camera animation
     */
    initCameraAnimation() {
        if (this.player == 1) {
            this.cameraAnimation = new CameraAnimation(this.scene, 2, this.player1.playerCamera, this.player2.playerCamera);
        } else {
            this.cameraAnimation = new CameraAnimation(this.scene, 2, this.player2.playerCamera, this.player1.playerCamera);
        }
    }

    /**
     * Changes the turn to the next player
     */
    changeTurn() {
        if (this.gameMode == XMLscene.gameMode.PLAYER_VS_BOT && this.player == 1) {
            this.currentState = this.state.BOT_ASK_SERVER_FOR_PAWN_AND_DIRECTION;
        } else if (this.gameMode == XMLscene.gameMode.MOVIE) {
            if (this.playNumber == this.scene.movieArray.length - 1)
                this.currentState = this.state.END_MOVIE;
            else {
                this.playNumber++;
                this.currentState = this.state.GET_MOVIE_PLAY_PAWN;
            }
        } else this.currentState = this.state.SELECTING_PAWN;


        if (this.gameMode != XMLscene.gameMode.MOVIE) {
            this.pawnMovie = [this.player, this.currentPawnDirection, this.chosenPawn];
            if (this.wallPicked) {
                this.wallMovie = [this.wallPicked, this.currentWallOrientation, this.firstWallx, this.firstWallz, this.secondWallx, this.secondWallz, this.currentPickedWall.wallNumber];
            } else this.wallMovie = [this.wallPicked];

            this.play = [this.pawnMovie, this.wallMovie];
            this.scene.movieArray.push(this.play);
            this.wallPicked = false;
        }

        if (this.player == 1) {
            this.player = 2;
        } else this.player = 1;

        if (this.gameMode == XMLscene.gameMode.PLAYER_VS_PLAYER || (this.gameMode == XMLscene.gameMode.PLAYER_VS_BOT && this.player == 1)) {
            if (this.player == 1) {
                this.scene.camera = this.player1.initCamera();
                this.scene.interface.setActiveCamera(this.scene.camera);
            } else if (this.player == 2) {
                this.scene.camera = this.player2.initCamera();
                this.scene.interface.setActiveCamera(this.scene.camera);
            }
        }
    }

    /**
     * Updates pawns position from prolog board
     */
    updatePawnsPositions2() {
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
    }

    /**
     * Updates pawns position from prolog board
     */
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
                this.checkGameMode();
                break;
            case this.state.UPDATE_BOARD_WITH_SERVER_BOARD:
                if (this.isAWinner) {
                    this.currentState = this.state.WINNER;
                } else {
                    if (this.gameMode == XMLscene.gameMode.BOT_VS_BOT || (this.gameMode == XMLscene.gameMode.PLAYER_VS_BOT && this.player == 2)) {
                        this.currentState = this.state.BOT_ASK_SERVER_FOR_WALL;
                    } else if (this.gameMode == XMLscene.gameMode.MOVIE) {
                        this.currentState = this.state.GET_MOVIE_PLAY_WALL;
                    } else {
                        this.currentState = this.state.SELECTING_WALL;
                    }
                }
            default:
        }
    }

    /**
     * Verify the game mode to start the game
     */
    checkGameMode() {
        if (this.gameMode == XMLscene.gameMode.BOT_VS_BOT) {
            this.currentState = this.state.BOT_ASK_SERVER_FOR_PAWN_AND_DIRECTION;
        } else if (this.gameMode == XMLscene.gameMode.MOVIE) {
            this.currentState = this.state.GET_MOVIE_PLAY_PAWN;
        } else {
            this.currentState = this.state.SELECTING_PAWN;
        }
        this.player = 1;
    }

    /**
     * Translates the string board of prolog to the number used in prolog
     * @param string to be translated
     * @returns number
     */
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

    /**
     * Handler to deal with picking and changing game state According
     * @param obj
     */
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
                this.selectingFirstWallPosition(obj);
                break;
            case this.state.SELECTING_SECOND_WALL_POSITION:
                this.selectingSecondWallPosition(obj);
                break;
            default:
                console.log('default');
        }
    }

    /**
     * Handler to deal with game mode movie
     */
    movieHandler() {
        switch (this.currentState) {
            case this.state.WAITING_FOR_START:
                this.updatePawnsPositions2();
                break;
            case this.state.INITIALIZE_BOARD:
                this.updatePawnsPositions();
                this.scene.camera = this.initBotCamera();
                this.scene.interface.setActiveCamera(this.scene.camera);
                break;
            case this.state.GET_MOVIE_PLAY_PAWN:
                this.currentState = this.state.WAITING_FOR_SERVER_NEW_BOARD;
                this.getPawnByMovieArray();
                break;
            case this.state.UPDATE_BOARD_WITH_SERVER_BOARD:
                this.updatePawnsPositions();
                this.getAllPawnPositions();
                break;
            case this.state.GET_MOVIE_PLAY_WALL:
                this.currentState = this.state.WAITING_FOR_SERVER_NEW_BOARD;
                this.getWallByMoviePawn();
                break;
            case this.state.UPDATE_BOARD_WITH_SERVER_NEW_WALLS:
                this.changeTurn();
                this.getAllBoardWalls();
                break;
        }
    }

    /**
     * Gets pawn of the movie array to be displayed
     */
    getPawnByMovieArray() {
        this.player = this.scene.movieArray[this.playNumber][0][0];
        this.currentPawnDirection = this.scene.movieArray[this.playNumber][0][1];
        this.chosenPawn = this.scene.movieArray[this.playNumber][0][2];

        this.getNewBoard();
    }

    /**
     * Gets wall of the movie aray to be displayed
     */
    getWallByMoviePawn() {

        var flag = this.scene.movieArray[this.playNumber][1][0];

        if (flag) {
            this.currentWallOrientation = this.scene.movieArray[this.playNumber][1][1];
            this.firstWallx = this.scene.movieArray[this.playNumber][1][2];
            this.firstWallz = this.scene.movieArray[this.playNumber][1][3];
            this.secondWallx = this.scene.movieArray[this.playNumber][1][4];
            this.secondWallz = this.scene.movieArray[this.playNumber][1][5];
            var wallNumber = this.scene.movieArray[this.playNumber][1][6];

            if (this.player == 1)
                var wall = this.player1.getWallNumber(wallNumber);
            else var wall = this.player2.getWallNumber(wallNumber);

            wall.setWallOrientation(this.currentWallOrientation);
            wall.used = true;
            wall.setWallXCoord(Board.prototype.convertPositionOnBoard(this.firstWallx));
            wall.setWallZCoord(Board.prototype.convertPositionOnBoard(this.firstWallz));
            wall.setSecondWallXCoord(Board.prototype.convertPositionOnBoard(this.secondWallx));
            wall.setSecondWallZCoord(Board.prototype.convertPositionOnBoard(this.secondWallz));

            this.getBoardWithNewWalls();
        } else this.changeTurn();

    }

    /**
     * Handler to deal with bot and changing state according
     */
    botHandler() {
        switch (this.currentState) {
            case this.state.WAITING_FOR_START:
                this.updatePawnsPositions2();
                break;
            case this.state.INITIALIZE_BOARD:
                this.updatePawnsPositions();
                this.scene.camera = this.initBotCamera();
                this.scene.interface.setActiveCamera(this.scene.camera);
                break;
            case this.state.BOT_ASK_SERVER_FOR_PAWN_AND_DIRECTION:
                this.currentState = this.state.WAITING_FOR_SERVER_BOT_PAWN_AND_DIRECTION;
                this.getBotPawnAndDirection(this.scene.botDifficulty);
                break;
            case this.state.BOT_GET_NEW_BOARD:
                this.currentState = this.state.WAITING_FOR_SERVER_NEW_BOARD;
                this.getNewBoard();
            case this.state.UPDATE_BOARD_WITH_SERVER_BOARD:
                this.updatePawnsPositions();
                this.getAllPawnPositions();
                break;
            case this.state.BOT_ASK_SERVER_FOR_WALL:
                this.currentState = this.state.WAITING_FOR_SERVER_WALL_RESPONSE;
                this.doesBotWantToPutWalls();
                break;
            case this.state.BOT_GET_NEW_WALLS_BOARD:
                this.currentState = this.state.WAITING_FOR_SERVER_BOARD_WALL;
                this.getBotNewWallsBoard();
            default:

        }
    }

    /**
     * Function used to deal with the selection of the pawn
     * @param obj
     */
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

    /**
     * Function used to deal with the selection of the next position of the pawn
     * @param obj
     */
    selectingPawnNextPosition(obj) {

        if (obj instanceof Button) {
            this.currentState = this.state.SELECTING_PAWN;
        } else {
            var x = obj.getPosX();
            var z = obj.getPosZ();
            this.currentPawnDirection = Board.prototype.getPawnDiretion(x, z);
            this.currentState = this.state.WAITING_FOR_SERVER_NEW_BOARD;
            this.getNewBoard();
        }

    }

    /**
     * Function used to deal with the selection of the wall
     * @param obj
     */
    selectingWall(obj) {
        if (obj instanceof Wall) {
            obj.used = true;
            this.selectWallId = obj.getWallNumber();

            this.currentState = this.state.SELECTING_FIRST_WALL_POSITION;

        } else if (obj instanceof Button) {
            if (this.gameMode == XMLscene.gameMode.PLAYER_VS_PLAYER) {
                this.currentState = this.state.CAMERA_ANIMATION;
                this.initCameraAnimation();
            } else {
                this.changeTurn();
            }
        }
    }

    /**
     * Function used to deal with the selection of the first position of the wall
     * @param obj
     */
    selectingFirstWallPosition(obj) {

        if (obj instanceof Button) {
            this.currentState = this.state.SELECTING_WALL;
        } else {
            var x = obj.getPosX();
            var z = obj.getPosZ()
            this.firstWallx = x;
            this.firstWallz = z;
            Board.prototype.currentWallPositionX = this.firstWallx;
            Board.prototype.currentWallPositionZ = this.firstWallz;

            this.currentState = this.state.SELECTING_SECOND_WALL_POSITION;
        }

    }

    /**
     * Function used to deal with the selection of the second position of the wall
     * @param obj
     */
    selectingSecondWallPosition(obj) {

        if (obj instanceof Button) {
            this.currentState = this.state.SELECTING_FIRST_WALL_POSITION;
        } else {
            var x = obj.getPosX();
            var z = obj.getPosZ();

            this.secondWallx = x;
            this.secondWallz = z;

            this.currentWallOrientation = Board.prototype.getWallOrientation(this.firstWallz, this.firstWallx, this.secondWallz, this.secondWallx);

            if (!this.currentWallOrientation) { //if it isn't a valid orientation
                this.currentState = this.state.SELECTING_FIRST_WALL_POSITION;
            } else {
                if (this.player == 1) {
                    this.currentPickedWall = this.player1.getWallNumber(this.selectWallId);
                } else if (this.player == 2) {
                    this.currentPickedWall = this.player2.getWallNumber(this.selectWallId);
                }

                this.currentPickedWall.setWallXCoord(Board.prototype.convertPositionOnBoard(this.firstWallx));
                this.currentPickedWall.setWallZCoord(Board.prototype.convertPositionOnBoard(this.firstWallz));
                this.currentPickedWall.setSecondWallXCoord(Board.prototype.convertPositionOnBoard(this.secondWallx));
                this.currentPickedWall.setSecondWallZCoord(Board.prototype.convertPositionOnBoard(this.secondWallz));
                if (this.player == 1)
                    this.player1.setScore(this.getScore(this.firstWallx, this.firstWallz, this.secondWallx, this.secondWallz));
                else if (this.player == 2)
                    this.player2.setScore(this.getScore(this.firstWallx, this.firstWallz, this.secondWallx, this.secondWallz));
                this.currentPickedWall.setWallOrientation(this.currentWallOrientation);
                this.getBoardWithNewWalls();

                this.currentState = this.state.WAITING_FOR_SERVER_NEW_BOARD_WALLS;
            }
        }
    }

    /**
     * Gets the new board from prolog after pawn gets moved by user
     */
    getNewBoard() {
        var this_t = this;

        this.scene.client.getPrologRequest("move_player(" + JSON.stringify(this.board) + "," + this.currentPawnDirection + "," + this.player + "," + this.chosenPawn + ")", function(data) {
            var info = JSON.parse(data.target.response);

            this_t.board = info[0];

            if (info[1]) {
                this_t.isAWinner = 1;
            } else {
                this_t.isAWinner = 0;
            }

            if (this_t.player == 1) {
                if (this_t.chosenPawn == 1) {
                    this_t.player1.pawn1.setFinalAnimation(this_t.currentPawnDirection);
                } else {
                    this_t.player1.pawn2.setFinalAnimation(this_t.currentPawnDirection);
                }
            } else if (this_t.player == 2) {
                if (this_t.chosenPawn == 1) {
                    this_t.player2.pawn1.setFinalAnimation(this_t.currentPawnDirection);
                } else {
                    this_t.player2.pawn2.setFinalAnimation(this_t.currentPawnDirection);
                }
            }
            this_t.currentState = this_t.state.PAWN_ANIMATION;
        }, function(data) {
            this_t.currentState = this_t.state.CONNECTION_ERROR;
        });
    }

    /**
     * Gets the new board from prolog after the walls gets positioned by user
     */
    getBoardWithNewWalls() {
        var this_t = this;

        var firstx = this.firstWallx + 1;
        var firstz = this.firstWallz + 1;
        var secondx = this.secondWallx + 1;
        var secondz = this.secondWallz + 1;

        this.scene.client.getPrologRequest("put_wall(" + JSON.stringify(this.board) + "," + this.currentWallOrientation + "," + firstx + "," +
            firstz + "," + secondx + "," + secondz + ")",
            function(data) {
                this_t.board = JSON.parse(data.target.response);

                this_t.currentState = this_t.state.UPDATE_BOARD_WITH_SERVER_NEW_WALLS;

                this_t.wallPicked = true;
            },
            function(data) {
                this_t.currentState = this_t.state.CONNECTION_ERROR;
            });
    }

    /**
     * Gets from prolog the pawn and direction to be used by bot
     * @param difficulty bot difficulty
     */
    getBotPawnAndDirection(difficulty) {
        var this_t = this;

        if (difficulty == XMLscene.botDifficulty.EASY) {
            this.scene.client.getPrologRequest("bot_pawn_and_direction(" + JSON.stringify(this.board) + "," + this.player + ")", function(data) {
                //     JSON.parse(data.target.response);
                var info = JSON.parse(data.target.response);
                this_t.chosenPawn = info[0];
                this_t.currentPawnDirection = info[1];
                this_t.currentState = this_t.state.BOT_GET_NEW_BOARD;

            }, function(data) {
                this_t.currentState = this_t.state.CONNECTION_ERROR;
            });
        } else if (difficulty == XMLscene.botDifficulty.HARD) {
            this.scene.client.getPrologRequest("bot_hard_pawn_and_direction(" + JSON.stringify(this.board) + "," + this.player + ")", function(data) {
                //     JSON.parse(data.target.response);
                var info = JSON.parse(data.target.response);
                this_t.chosenPawn = info[0];
                this_t.currentPawnDirection = info[1];
                this_t.currentState = this_t.state.BOT_GET_NEW_BOARD;

            }, function(data) {
                this_t.currentState = this_t.state.CONNECTION_ERROR;
            });
        }
    }

    /**
     * Asking to prolog if bot want to put a wall
     */
    doesBotWantToPutWalls() {
        var this_t = this;

        this.scene.client.getPrologRequest("want_walls", function(data) {
            var info = JSON.parse(data.target.response);

            //TODO Adicionar o if
            this_t.currentState = this_t.state.BOT_GET_NEW_WALLS_BOARD;
        }, function(data) {
            this_t.currentState = this_t.state.CONNECTION_ERROR;
        });
    }

    /**
     * Turning off the server
     */
    quitServer() {
        var this_t = this;

        this.scene.client.getPrologRequest("quit", function(data) {

        }, function(data) {
            this_t.currentState = this_t.state.CONNECTION_ERROR;
        });
    }

    /**
     * Gets new board with bot walls already on the board
     */
    getBotNewWallsBoard() {
        var this_t = this;

        this.scene.client.getPrologRequest("bot_put_walls(" + JSON.stringify(this.board) + ")", function(data) {

            var info = JSON.parse(data.target.response);

            this_t.board = info[0];
            this_t.firstWallx = info[1] - 1;
            this_t.firstWallz = info[2] - 1;
            this_t.secondWallx = info[3] - 1;
            this_t.secondWallz = info[4] - 1;
            this_t.currentWallOrientation = info[5];

            if (this_t.currentWallOrientation != "fail") {
                if (this_t.player == 1) {
                    this_t.currentPickedWall = this_t.player1.getANonUsedWall();
                } else if (this_t.player == 2) {
                    this_t.currentPickedWall = this_t.player2.getANonUsedWall();
                }

                if (this_t.currentPickedWall != false) {
                    this_t.currentPickedWall.used = true;
                    this_t.wallPicked = true;

                    this_t.currentPickedWall.setWallXCoord(Board.prototype.convertPositionOnBoard(this_t.firstWallx));
                    this_t.currentPickedWall.setWallZCoord(Board.prototype.convertPositionOnBoard(this_t.firstWallz));
                    this_t.currentPickedWall.setSecondWallXCoord(Board.prototype.convertPositionOnBoard(this_t.secondWallx));
                    this_t.currentPickedWall.setSecondWallZCoord(Board.prototype.convertPositionOnBoard(this_t.secondWallz));
                    this_t.currentPickedWall.setWallOrientation(this_t.currentWallOrientation);
                }

            }

            this_t.changeTurn();
            if (this_t.gameMode == XMLscene.gameMode.BOT_VS_BOT) {
                this_t.currentState = this_t.state.BOT_ASK_SERVER_FOR_PAWN_AND_DIRECTION;
            } else {
                this_t.currentState = this_t.state.SELECTING_PAWN;
            }

        }, function(data) {
            this_t.currentState = this_t.state.CONNECTION_ERROR;
        });
    }

    /**
     * Function to display the game state
     */
    display() {
        if (this.gameMode == XMLscene.gameMode.BOT_VS_BOT || (this.gameMode == XMLscene.gameMode.PLAYER_VS_BOT && this.player == 2)) {
            this.botHandler();
        } else if (this.gameMode == XMLscene.gameMode.MOVIE) {
            this.movieHandler();
        } else {
            this.checkCurrentState();
        }
        this.player1.displayPawns();
        this.player1.displayWalls();
        this.player1.displayStepOverButton();
        this.player1.displayBackButton();

        this.player2.displayPawns();
        this.player2.displayWalls();
        this.player2.displayStepOverButton();
        this.player2.displayBackButton();

        this.scene.pushMatrix();
        this.scene.translate(this.startPos11[0], 0.35, this.startPos11[2]);
        this.materialp1.apply();
        this.StartPos11Circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.startPos12[0], 0.35, this.startPos12[2]);
        this.materialp1.apply();
        this.StartPos12Circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.startPos21[0], 0.35, this.startPos21[2]);
        this.materialp2.apply();
        this.StartPos21Circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.startPos22[0], 0.35, this.startPos22[2]);
        this.materialp2.apply();
        this.StartPos22Circle.display();
        this.scene.popMatrix();

    }

    /**
     * Update function
     * @param currTime time passed since 1970
     * @param deltaTime time passed since last update
     */
    update(currTime, deltaTime) {

        if (this.currentState != this.state.CAMERA_ANIMATION) {
            this.player1.update(deltaTime);
            this.player2.update(deltaTime);

            if (this.firstTime == -1) {
                this.lastUpdateTime = currTime;
                this.firstTime = 1;
            } else if (this.currentState != this.state.WINNER && this.currentState != this.state.WAITING_FOR_START) {
                this.currentTime = (currTime - this.lastUpdateTime) / 1000;
            }

            this.currentTime = Math.round(this.currentTime).toFixed(2);


            this.getTime(this.currentTime);
        } else {
            this.cameraAnimation.update(deltaTime);
            if (this.cameraAnimation.over) {
                this.changeTurn();
            }
        }
    }

    /**
     * Gets the time to be displayed on the screen
     * @param secs Seconds passed to be processed in hours/minuts/seconds format
     */
    getTime(secs) {
        secs = Math.round(secs);
        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        if (hours < 10) {
            this.hours = "0" + hours;
        } else {
            this.hours = hours;
        }

        if (minutes < 10) {
            this.minutes = "0" + minutes;
        } else {
            this.minutes = minutes;
        }

        if (seconds < 10) {
            this.seconds = "0" + seconds;
        } else {
            this.seconds = seconds;
        }
    }

    /**
     * Gets the atual score
     * @param firstWallx
     * @param firstWallz
     * @param secondWallx
     * @param secondWallz
     * @returns {number}
     */
    getScore(firstWallx, firstWallz, secondWallx, secondWallz) {

        var startPos11 = [4, 1.3, 4];
        var startPos12 = [14, 1.3, 4];
        var startPos21 = [4, 1.3, 12];
        var startPos22 = [14, 1.3, 12];

        if (this.player == 1) {
            if (firstWallz >= 1 && firstWallz <= 7 && firstWallx >= 1 && firstWallx <= 7)
                return 3;
            else if (secondWallz >= 1 && secondWallz <= 7 && secondWallx >= 1 && secondWallx <= 7)
                return 3;
            else if (firstWallz >= 1 && firstWallz <= 7 && firstWallx >= 11 && firstWallx <= 17)
                return 3;
            else if (secondWallz >= 1 && secondWallz <= 7 && secondWallx >= 11 && secondWallx <= 17)
                return 3;
            else
                return 1;
        } else if (this.player == 2) {
            if (firstWallz >= 12 && firstWallz <= 15 && firstWallx >= 1 && firstWallx <= 7)
                return 3;
            else if (secondWallz >= 12 && secondWallz <= 15 && secondWallx >= 1 && secondWallx <= 7)
                return 3;
            else if (firstWallz >= 12 && firstWallz <= 15 && firstWallx >= 11 && firstWallx <= 17)
                return 3;
            else if (secondWallz >= 12 && secondWallz <= 15 && secondWallx >= 11 && secondWallx <= 17)
                return 3;
            else
                return 1;
        }


        return 1;
    }


    /**
     * Initializes the default camera of the game
     * @returns {CGFcamera}
     */
    initDefaultCamera() {
        let angle = 0.4;
        let near = 0.1;
        let far = 500;
        let fromVector = vec3.fromValues(-7.9, 20, -100.4);
        let toVector = vec3.fromValues(7.4, -3, 3.5);
        return new CGFcamera(angle, near, far, fromVector, toVector);
    }

    /**
     * Initializes the bot camera
     * @returns {CGFcamera}
     */
    initBotCamera() {
        let angle = 0.4;
        let near = 0.1;
        let far = 500;
        let fromVector = vec3.fromValues(-23, 29.6, -19.7);
        let toVector = vec3.fromValues(7, -1.2, 6);
        return new CGFcamera(angle, near, far, fromVector, toVector);
    }
}
