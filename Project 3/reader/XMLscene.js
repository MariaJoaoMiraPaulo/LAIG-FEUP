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
    this.client = new Client();


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

        // this.verifyGameStart();
        //TODO:BLOCKADE HERE??
        if(typeof this.game == "undefined"){
            this.game = new Blockade(this, this.graph);
        }
        this.game.display();
    };



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
}

// XMLscene.prototype.verifyGameStart = function(){
//
//   var count = 0;
//
//   for (component in this.graph.components) {
//       if (this.graph.components[component].id == 'board' ||
//           this.graph.components[component].id == 'p11' ||
//           this.graph.components[component].id == 'p12' ||
//           this.graph.components[component].id == 'p21' ||
//           this.graph.components[component].id == 'p22')
//         count++;
//   }
//
//   if(count==5)
//     console.log("You are ready to play!!");
//   else this.graph.onXMLError("You are not ready to play :( ! You must have 4 pawns and one board.)");
//
// }

XMLscene.prototype.logPicking = function() {

    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            for (var i = 0; i < this.pickResults.length; i++) {
                var obj = this.pickResults[i][0];
                if (obj) {
                    console.log(obj);
                    // console.log("X: " + obj.getPosX());
                    // console.log("Y: " + obj.getPosY());

                    // if (obj.getPosX() == 0 && obj.getPosY() == 0) {
                    //     this.client.getPrologRequest('quit', function(data) {
                    //         console.log('boas');
                    //     });
                    // } else {
                    //     //  client.getPrologRequest("send_initial_board("+JSON.stringify(a)+")", function(data) {
                    //     this.client.getPrologRequest('initial_board', function(data) {
                    //         console.log(JSON.parse(data.target.response));
                    //     });
                    // }
                }
            }
            this.pickResults.splice(0, this.pickResults.length);
        }
    }
}
