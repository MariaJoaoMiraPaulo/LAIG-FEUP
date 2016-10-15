function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

  //  this.initLights();

    this.enableTextures(true);

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

};

XMLscene.prototype.initLights = function() {

    this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].update();
};

XMLscene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
};

// Handler called when the graph is finally loaded.
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function() {
    //	this.gl.clearColor(this.graph.background[0],this.graph.background[1],this.graph.background[2],this.graph.background[3]);
    this.lights[0].setVisible(true);
    this.lights[0].enable();

    this.setXMLIllumination();
    this.setXMLLights();
  //  this.camera = this.graph.perspectives[this.graph.defaultView];

};

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

        this.lights[0].update();
      //  this.lights[1].update();
        //render graph
        /*  for(key in this.graph.primitives){
            this.graph.primitives[key].display();
          }*/
    /*    for (key in this.graph.components) {
            this.graph.components[key].display();
        }*/


        this.graph.components[this.graph.rootId].display();

    };
};

XMLscene.prototype.setXMLIllumination = function() {
    if (this.graph.ambient.length != 0)
        this.setGlobalAmbientLight(this.graph.ambient[0].r, this.graph.ambient[0].g, this.graph.ambient[0].b, this.graph.ambient[0].a);
    if (this.graph.background.length != 0)
        this.gl.clearColor(this.graph.background[0].r, this.graph.background[0].g, this.graph.background[0].b, this.graph.background[0].a)

};

XMLscene.prototype.setXMLLights = function() {

    var i = 0;
    for (key in this.graph.lights) { //key = id
        var light = this.graph.lights[key];
        console.log(light);
        console.log(light.enabled);
        if(light.enabled)
          this.lights[i].enable();
        else this.lights[i].disable();

        this.lights[i].setAmbient(light.ambientElems[0].r,light.ambientElems[0].g,light.ambientElems[0].b,light.ambientElems[0].a);
        this.lights[i].setDiffuse(light.diffuseElems[0].r,light.diffuseElems[0].g,light.diffuseElems[0].b,light.diffuseElems[0].a);
        this.lights[i].setSpecular(light.specularElems[0].r,light.specularElems[0].g,light.specularElems[0].b,light.specularElems[0].a);
        this.lights[i].setVisible(true);

        if (this.graph.lights[key] instanceof Omni){
            console.log("OMNI");
            this.lights[i].setPosition(light.locationElems[0].x,light.locationElems[0].y,light.locationElems[0].z,light.locationElems[0].w);
        }
        else if (this.graph.lights[key] instanceof Spot){
          console.log("SPOT");
          this.lights[i].setSpotCutOff(light.angle);
          this.lights[i].setSpotExponent(light.exponent);
          var wElem =1;
          this.lights[i].setPosition(light.locationElems[0].x,light.locationElems[0].y,light.locationElems[0].z,wElem);
          var directionX = light.targetElems[0].x - light.locationElems[0].x;
          var directionY = light.targetElems[0].y - light.locationElems[0].y;
          var directionZ = light.targetElems[0].z - light.locationElems[0].z;
          this.lights[i].setSpotDirection(directionX,directionY,directionZ);
        }
        i++;
    }

    console.log(this.lights);
};
