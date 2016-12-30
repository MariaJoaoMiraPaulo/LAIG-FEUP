/**
 * Interface
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();
    this.group = this.gui.addFolder('Lights');
    this.group.close();
    this.options = this.gui.addFolder('Options');
    this.options.open();
    this.gameMode = this.gui.addFolder('Game Mode');
    this.gameMode.close();
    this.scenarios = this.gui.addFolder('Scenario');
    this.scenarios.close();


    let menu = {
        startGame: this.scene.startGame.bind(this.scene)
    };

		let playerVsPlayer = {
				setPlayerVsPlayer: this.scene.setPlayerVsPlayer.bind(this.scene)
		};

		let playerVsBot = {
				setPlayerVsBot: this.scene.setPlayerVsBot.bind(this.scene)
		};

		let botVsBot = {
				setBotVsBot: this.scene.setBotVsBot.bind(this.scene)
		};

    let setMovie = {
        setMovie: this.scene.setMovie.bind(this.scene)
    };

    let setScenario1 = {
        setScenario1: this.scene.setScenario1.bind(this.scene)
    };

    let setScenario2 = {
        setScenario2: this.scene.setScenario2.bind(this.scene)
    };

    let undo = {
        undo: this.scene.undo.bind(this.scene)
    };


    this.gui.add(this.scene, 'Speed', 0.1, 2.0);
    this.options.add(menu, 'startGame').name('Start Game');
    this.options.add(undo, 'undo').name('Undo');
		this.gameMode.add(playerVsPlayer, 'setPlayerVsPlayer').name('Player vs Player');
		this.gameMode.add(playerVsBot, 'setPlayerVsBot').name('Player vs Bot');
		this.gameMode.add(botVsBot, 'setBotVsBot').name('Bot vs Bot');
    this.gameMode.add(setMovie, 'setMovie').name('Watch Movie');
    this.scenarios.add(setScenario1, 'setScenario1').name('Casino');
    this.scenarios.add(setScenario2, 'setScenario2').name('Room');
    // this.options.add(this,'Exit').name('Exit');
    return true;
};

/**
 * Adds a light to the interface
 * @param i light to be added
 * @param id id of the light to be added
 */
MyInterface.prototype.addALight = function(i, id) {
    this.group.add(this.scene.lightsEnabled, i, this.scene.lightsEnabled[i]).name(id);
}

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
    // call CGFinterface default code (omit if you want to override)
    CGFinterface.prototype.processKeyboard.call(this, event);

    switch (event.keyCode) {
        case 86:
            this.scene.changingToNextCamera();
            break;
        case 118:
            this.scene.changingToNextCamera();
            break;
        case 109:
            this.scene.changingToNextMaterial();
            break;
        case 77:
            this.scene.changingToNextMaterial();
            break;
        default:

    }

};
