function MySceneGraph(filename, scene) {
    this.loadedOk = null;

    // Establish bidirectional references between scene and graph
    this.scene = scene;
    scene.graph = this;

    // File reading
    this.reader = new CGFXMLreader();

    this.primitives = {};   //creating the hash table for primitives
    this.lights = {};

    /*
     * Read the contents of the xml file, and refer to this class for loading and error handlers.
     * After the file is read, the reader calls onXMLReady on this object.
     * If any error occurs, the reader calls onXMLError on this object, with an error message
     */

    this.reader.open('scenes/' + filename, this);
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady = function() {
    console.log("XML Loading finished.");
    var rootElement = this.reader.xmlDoc.documentElement;

    // Here should go the calls for different functions to parse the various blocks
    //var error = this.parseGlobalsExample(rootElement);
    var error = this.parseTags(rootElement);

    if (error != null) {
        this.onXMLError(error);
        return;
    }

    this.loadedOk = true;

    // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
    this.scene.onGraphLoaded();
};



/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobalsExample = function(rootElement) {

    var elems = rootElement.getElementsByTagName('globals');
    if (elems == null) {
        return "globals element is missing.";
    }

    if (elems.length != 1) {
        return "either zero or more than one 'globals' element found.";
    }

    // various examples of different types of access
    var globals = elems[0];
    this.background = this.reader.getRGBA(globals, 'background');
    this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill", "line", "point"]);
    this.cullface = this.reader.getItem(globals, 'cullface', ["back", "front", "none", "frontandback"]);
    this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw", "cw"]);

    console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");

    var tempList = rootElement.getElementsByTagName('list');

    if (tempList == null || tempList.length == 0) {
        return "list element is missing.";
    }

    this.list = [];
    // iterate over every element
    var nnodes = tempList[0].children.length;
    for (var i = 0; i < nnodes; i++) {
        var e = tempList[0].children[i];

        // process each element and store its information
        this.list[e.id] = e.attributes.getNamedItem("coords").value;
        console.log("Read list item id " + e.id + " with value " + this.list[e.id]);
    };

};

/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError = function(message) {
    console.error("XML Loading Error: " + message);
    this.loadedOk = false;
};


MySceneGraph.prototype.parseTags = function(rootElement) {
    this.parseRoot(rootElement.getElementsByTagName('scene'));
    this.parsePrimitives(rootElement.getElementsByTagName('primitives'));
    this.parseLights(rootElement.getElementsByTagName('lights'));
};

MySceneGraph.prototype.parseRoot = function(sceneElements) {
    this.root = new MiddleNode(this.reader.getString(sceneElements[0], 'root'));
    this.axisLength = this.reader.getFloat(sceneElements[0], 'axis_length');
}

MySceneGraph.prototype.parsePrimitives = function(primitivesElems) {
    if (primitivesElems == null) {
        this.onXMLError("primitives element is missing.");
    }

    //  var elems = primitivesElems[0].getElementsByTagName('primitive');
    var elems = primitivesElems[0].getElementsByTagName('primitive');

    if (elems == null) {
        this.onXMLError("It must have at least one primitive's block");
    }

    var i;
    for (i = 0; i < elems.length; i++) {
        //it must have only one type of primitive
        if (elems[i].children.length != 1) {
          this.onXMLError("It must have just one tag inside primitive tag, error on index " + i + ".");
        }

        var idPrimitive = this.reader.getString(elems[i], 'id');
        if(typeof this.primitives[idPrimitive] != 'undefined'){
          this.onXMLError("Already exists a primitive with that id");
        }

        var newElement = elems[i].children[0];
        switch (newElement.tagName) {
            case 'rectangle':
                this.primitives[idPrimitive]  = new Rectangle(this.scene,this.reader,newElement);
                break;
            case 'triangle':
                this.primitives[idPrimitive] = new Triangle(this.scene,
                    this.reader.getFloat(newElement, 'x1'),
                    this.reader.getFloat(newElement, 'y1'),
                    this.reader.getFloat(newElement, 'z1'),
                    this.reader.getFloat(newElement, 'x2'),
                    this.reader.getFloat(newElement, 'y2'),
                    this.reader.getFloat(newElement, 'z2'),
                    this.reader.getFloat(newElement, 'x3'),
                    this.reader.getFloat(newElement, 'y3'),
                    this.reader.getFloat(newElement, 'z3')
                );
                break;
            case 'cylinder':
                this.primitives[idPrimitive] = new Cylinder(this.scene,
                    this.reader.getFloat(newElement, 'base'),
                    this.reader.getFloat(newElement, 'top'),
                    this.reader.getFloat(newElement, 'height'),
                    this.reader.getFloat(newElement, 'slices'),
                    this.reader.getFloat(newElement, 'stacks')
                );
        }

    }

};

MySceneGraph.prototype.parseLights = function(primitivesElems) {

    if (primitivesElems.length == 0) {
        this.onXMLError("Lights:: lights element is missing.");
    }

    var rootLights = primitivesElems[0].children;
    var numberChildren = rootLights.length;

    var omniElems = primitivesElems[0].getElementsByTagName('omni');
    var spotElems = primitivesElems[0].getElementsByTagName('spot');

    if( (omniElems.length + spotElems.length) == 0)
      this.onXMLError("Lights:: it must exists at least one block omni ou spot on lights.");

    for(let elem of rootLights){
      var idLigth = this.reader.getString(elem, 'id');
      switch(elem.tagName){
        case 'omni':
            this.lights[idLigth] = new Omni(this.reader,elem);
            break;
        case 'spot':
            this.lights[idLigth] = new Spot(this.reader,elem);
            break;

        default:
      }
    }
};
