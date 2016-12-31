/**
 * Class Player
 */
class Player {
    /**
     * Player constructor
     * @param player player 1 or 2
     * @param graph graph of the scene
     * @param scene CGFscene where the component will be displayed
     */
    constructor(player, graph, scene) {
        this.player = player;
        this.scene = scene;
        this.reader = this.scene.reader;
        this.graph = graph;
        this.score = 0;

        this.selectablePawn = false;
        this.selectableWall = false;

        this.pawn1 = new Pawn(this.scene, this.reader, this.player, 1);
        this.pawn2 = new Pawn(this.scene, this.reader, this.player, 2);

        //type 1 -stepOver
        //type 2 - Back
        this.button = new Button(this.scene, this.reader, this.player, 1);
        this.backButton = new Button(this.scene, this.reader, this.player, 2);

        this.numberWalls = 7;
        this.walls = new Array(this.numberWalls - 1);

        for (var i = 0; i < this.numberWalls; i++)
            this.walls[i] = new Wall(this.scene, this.reader, this.player, i);

        this.angle = 0.4;
        this.near = 0.1;
        this.far = 500;
        this.fromVector;
        this.toVector;

        switch (player) {
            case 1:
                this.startPositionWall1 = [6.5, 0.3, -5.2];
                this.fromVector = vec3.fromValues(5.8,34,-30);
                this.toVector = vec3.fromValues(7.4,-3,3.5);
                break;
            case 2:
                this.startPositionWall1 = [6.5, 0.3, 14.2];
                this.fromVector = vec3.fromValues(5.8, 34, 41);
                this.toVector = vec3.fromValues(5.7,-4.2,6.1);
                break;
        }

        this.playerCamera = this.initCamera();
    }

    /**
     * Initialize the player camera
     * @returns {CGFcamera}
     */
    initCamera(){
      return new CGFcamera(this.angle, this.near, this.far, this.fromVector, this.toVector);
    }

    /**
     * Gets the wall with number number
     * @param number number wall
     * @returns the wall
     */
    getWallNumber(number) {
        return this.walls[number];
    }

    /**
     * Gets the number of walls
     * @returns {*}
     */
    getNumbernumberWalls() {
        return this.numberWalls();
    }

    /**
     * Sets the number of walls
     * @param numbernumberWalls
     */
    setNumbernumberWalls(numbernumberWalls) {
        this.numberWalls = numbernumberWalls;
    }

    /**
     * Gets the score
     * @returns score of the player
     */
    getScore() {
        return this.score;
    }

    /**
     * Sets the score of the player
     * @param score
     */
    setScore(score) {
        this.score += score;
    }

    /**
     * Gets the pawn 1
     * @returns obj pawn
     */
    getPawn1Id() {
        return pawn1;
    }

    /**
     * Gets the pawn 2
     * @returns obj pawn
     */
    getPawn2Id() {
        return pawn2;
    }

    /**
     * Sets the pawn material
     */
    setPawnMaterial(){
      this.pawn1.setMaterial();
      this.pawn2.setMaterial();
    }


    /**
     * Sets the wall material
     */
    setWallsMaterial(){
      for (var i = 0; i < this.numberWalls; i++)
          this.walls[i].setMaterial();
    }

    /**
     * Display step over button
     */
    displayStepOverButton() {
        if (this.scene.game.currentState == this.scene.game.state.SELECTING_WALL && this.player == this.scene.game.player && this.button.type == 1) {
            this.scene.registerForPick(100, this.button);
            this.button.display();
        } else {
            this.scene.clearPickRegistration();
            this.button.display();
        }
        this.scene.clearPickRegistration();
    }

    /**
     * Display back button
     */
    displayBackButton() {

        if ((this.scene.game.currentState == this.scene.game.state.SELECTING_PAWN_NEXT_POSITION && this.player == this.scene.game.player) ||
            (this.scene.game.currentState == this.scene.game.state.SELECTING_FIRST_WALL_POSITION && this.player == this.scene.game.player) ||
            (this.scene.game.currentState == this.scene.game.state.SELECTING_SECOND_WALL_POSITION && this.player == this.scene.game.player)) {
            this.scene.registerForPick(101, this.backButton);
            this.backButton.display();
        } else {
            this.scene.clearPickRegistration();
            this.backButton.display();
        }
        this.scene.clearPickRegistration();
    }

    /**
     * Function used to move the pawn to the new position
     * @param position
     */
    movePawn(position) {
        var pawnHeight = 0.3;

        this.pawn1.setPawnXCoord(position['x1']);
        this.pawn1.setPawnYCoord(pawnHeight);
        this.pawn1.setPawnZCoord(position['y1']);

        this.pawn2.setPawnXCoord(position['x2']);
        this.pawn2.setPawnYCoord(pawnHeight);
        this.pawn2.setPawnZCoord(position['y2']);
    }

    /**
     * Moves all the player walls to the start position
     */
    moveWallsToStartPosition() {
        for (var i = 0; i < this.numberWalls; i++) {
            this.walls[i].setWallXCoord(this.startPositionWall1[0]);
            this.walls[i].setWallYCoord(this.startPositionWall1[1]);
            this.walls[i].setWallZCoord(this.startPositionWall1[2] + i * 0.5);
        }

    }

    /**
     * Display the player walls
     */
    displayWalls() {

        if (typeof this.scene.game != "undefined") {
            if (this.scene.game.currentState == this.scene.game.state.SELECTING_WALL && this.player == this.scene.game.player) {
                this.selectableWall = true;
            } else this.selectableWall = false;
        }

        for (var i = 0; i < this.numberWalls; i++) {
            if (this.selectableWall && !this.walls[i].used)
                this.scene.registerForPick(i + 10, this.walls[i]);
            this.walls[i].display();
        }

        this.scene.clearPickRegistration();

    }

    /**
     * Verify if the position of the pawn is valid
     * @param id number of the pawn
     * @returns pawn position
     */
    validPawnPosition(id) {
        var string = "player" + this.player + id;
        var index = this.scene.game.returnPrologBoardAtom(string);

        for (let i = 0; i < this.scene.game.board.length; i++) {
            for (let j = 0; j < this.scene.game.board[i].length; j++) {
                if (this.scene.game.board[i][j] == index) {
                    var z = i;
                    var x = j;
                }
            }
        }

        return [z, x];
    }

    /**
     * Display user pawns
     */
    displayPawns() {

        if (typeof this.scene.game != "undefined") {
            if (this.scene.game.currentState == this.scene.game.state.SELECTING_PAWN && this.player == this.scene.game.player) {
                this.selectablePawn = true;
            } else this.selectablePawn = false;
        }

        if (this.selectablePawn) {
            this.scene.registerForPick(12, this.pawn1);
        }

        this.pawn1.display();

        this.scene.clearPickRegistration();

        if (this.selectablePawn) {
            this.scene.registerForPick(13, this.pawn2);
        }

        this.pawn2.display();

        this.scene.clearPickRegistration();
    }

    /**
     * Updates user variables
     * @param currTime
     */
    update(currTime) {
        this.pawn1.update(currTime);
        this.pawn2.update(currTime);
    }

    /**
     * Gets a non used wall
     * @returns a non used wall
     */
    getANonUsedWall() {
        for (var i = 0; i < this.walls.length; i++) {
            if (!this.walls[i].used) {
                return this.walls[i];
            }
        }

        return false;
    }
}
