/**
 * XMLScene
 * @constructor
 */
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
* Game Modes
*/
XMLscene.gameMode = {
    PLAYER_VS_PLAYER: 0,
    PLAYER_VS_BOT: 1,
    BOT_VS_BOT: 2,
    MOVIE: 3
};

/**
* Bot game Mode different types of difficulty
*/
XMLscene.botDifficulty = {
  EASY: 0,
  HARD: 1
}
/**
 * XMLScene init
 * @param {CGFapplication} application
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.enableTextures(true);

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    this.lightsEnabled = [];

    this.setUpdatePeriod(20);

    this.plane = new Plane(this, 3, 2, 10, 7);

    this.setPickEnabled(true);
    this.game;
    this.scenario = new Casino(this);
    this.client = new Client();
    this.botDifficulty = XMLscene.botDifficulty.EASY;

    this.movieArray;

    this.Speed = 1;


};

XMLscene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

/**
 * Sets default Appearance
 */
XMLscene.prototype.setDefaultAppearance = function() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
};

// Handler called when the graph is finally loaded.
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function() {

    this.setXMLIllumination();
    this.camera = this.graph.perspectives[this.graph.defaultViewIndex];
    this.nextPerspective = 0;
    this.interface.setActiveCamera(this.camera);
};

/**
* Starts a game
*/
XMLscene.prototype.startGame = function() {
    //this.game = new Blockade(this, this.graph,XMLscene.gameMode.PLAYER_VS_PLAYER);
  //  this.game.currentState = this.game.state.INITIALIZE_BOARD;
  this.game.getInitialBoard(1);
};

/**
* Continues a game
*/
XMLscene.prototype.continueGame = function() {
  if(this.game.gameMode == XMLscene.gameMode.MOVIE){
    this.game = this.oldGame;
  }
}

/**
* Turns off prolog server
*/
XMLscene.prototype.turnOffPrologServer = function() {
  this.game.quitServer();
}

/**
* Calls the blockade game player vs player mode
*/
XMLscene.prototype.setPlayerVsPlayer = function() {
    this.game = new Blockade(this, this.graph,XMLscene.gameMode.PLAYER_VS_PLAYER);
}

/**
* Calls the blockade game player vs bot mode
*/
XMLscene.prototype.setPlayerVsBot = function() {
    this.game = new Blockade(this, this.graph,XMLscene.gameMode.PLAYER_VS_BOT);
}

/**
* Calls the blockade game bot vs bot mode
*/
XMLscene.prototype.setBotVsBot = function() {
    this.game = new Blockade(this, this.graph,XMLscene.gameMode.BOT_VS_BOT);
}

/**
* Calls the blockade game movie
*/
XMLscene.prototype.setMovie = function() {
    this.oldGame = this.game;
    this.game = new Blockade(this, this.graph,XMLscene.gameMode.MOVIE);
}

/**
* Undos a play
*/
XMLscene.prototype.undo = function() {
    if(this.game.player == 1){
      var button = new Button(this, this.reader, 1, 2);
      this.game.pickingHandler(button);
    }
    else if(this.game.player == 2){
      var button = new Button(this, this.reader, 2, 2);
      this.game.pickingHandler(button);
    }

}

/**
* Sets First Scenario - Casino
*/
XMLscene.prototype.setScenario1 = function() {
    this.scenario = new Casino(this);
    this.game.player1.setPawnMaterial();
    this.game.player2.setPawnMaterial();
    this.game.player1.setWallsMaterial();
    this.game.player2.setWallsMaterial();
    this.game.setStartPositionMaterial();
}

/**
* Sets second Scenario - Room
*/
XMLscene.prototype.setScenario2 = function() {
    this.scenario = new Room(this);
    this.game.player1.setPawnMaterial();
    this.game.player2.setPawnMaterial();
    this.game.player1.setWallsMaterial();
    this.game.player2.setWallsMaterial();
    this.game.setStartPositionMaterial();
}

/**
 * Updates lights
 */
XMLscene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++) {
        if (!this.lightsEnabled[i])
            this.lights[i].disable();
        else this.lights[i].enable();
        this.lights[i].update();
    }
};

/**
* Updates bot difficulty to hard
*/
XMLscene.prototype.setBotToDifficulty = function() {
  this.botDifficulty = XMLscene.botDifficulty.HARD;
}

/**
* Updates bot difficulty to easy
*/
XMLscene.prototype.setBotToEasy = function() {
  this.botDifficulty = XMLscene.botDifficulty.EASY;
}

/**
 * Displays both the graph and axis and updates lights
 */
XMLscene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    this.axis.display();

    this.setDefaultAppearance();

    // ---- END Background, camera and axis setup

    // it is important that things depending on the proper loading of the graph
    // only get executed after the graph has loaded correctly.
    // This is one possible way to do it
    if (this.graph.loadedOk) {

        this.updateLights();

        this.graph.components[this.graph.rootId].display();

        if (typeof this.game == "undefined") {
            this.game = new Blockade(this, this.graph, XMLscene.gameMode.PLAYER_VS_PLAYER);
        }
        this.game.display();
        this.scenario.display();

    };

    if (typeof this.game != "undefined") {
        document.getElementById('information').innerText = this.game.getGameStateInstruction();
        document.getElementById('player').innerText = 'Player ' + (this.game.player);
        document.getElementById('time').innerText = (this.game.hours) + ' : ' + this.game.minutes + " : " + this.game.seconds;
        if(this.game.player == 1)
          this.pontuation = this.game.player1.getScore();
        else this.pontuation = this.game.player2.getScore();
        document.getElementById('pontuacao').innerText = "  Score:  " + this.pontuation;
    }

    this.logPicking();
    this.clearPickRegistration();

};

/**
 * Sets the scene Ilumination, ambient and background
 */
XMLscene.prototype.setXMLIllumination = function() {
    if (this.graph.ambient.length != 0)
        this.setGlobalAmbientLight(this.graph.ambient[0].r, this.graph.ambient[0].g, this.graph.ambient[0].b, this.graph.ambient[0].a);
    if (this.graph.background.length != 0)
        this.gl.clearColor(this.graph.background[0].r, this.graph.background[0].g, this.graph.background[0].b, this.graph.background[0].a)

};

/**
 * Changes to the next Prespective
 */
XMLscene.prototype.changingToNextCamera = function() {
    if (this.nextPerspective == this.graph.perspectives.length - 1) {
        this.nextPerspective = 0;
    } else this.nextPerspective++;

    this.camera = this.graph.perspectives[this.nextPerspective];
    this.interface.setActiveCamera(this.camera);
}

/**
 * Changes to the next Material
 */
XMLscene.prototype.changingToNextMaterial = function() {
    for (component in this.graph.components) {
        if (this.graph.components[component].cgfMaterialId != "inherit") {
            if (this.graph.components[component].nextMaterial == this.graph.components[component].cgfMaterials.length - 1)
                this.graph.components[component].nextMaterial = 0;
            else this.graph.components[component].nextMaterial++;

            this.graph.components[component].cgfMaterial = this.graph.components[component].cgfMaterials[this.graph.components[component].nextMaterial];
        }
    }
}

XMLscene.prototype.update = function(currTime) {

    var deltaTime = (currTime - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = currTime;

    for (animationId in this.graph.animations) {
        this.graph.animations[animationId].update(deltaTime);
    }

    for (componentsId in this.graph.components) {
        this.graph.components[componentsId].update(deltaTime);
    }

    if (typeof this.game != "undefined") {
        this.game.update(currTime,deltaTime);
    }
}

XMLscene.prototype.logPicking = function() {

    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            for (var i = 0; i < this.pickResults.length; i++) {
                var obj = this.pickResults[i][0];
                if (obj) {
                    obj.scene.game.pickingHandler(obj);
                }
            }
            this.pickResults.splice(0, this.pickResults.length);
        }
    }
}
