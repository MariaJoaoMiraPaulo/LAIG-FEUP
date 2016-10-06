function MySceneGraph(filename, scene) {
    this.loadedOk = null;

    // Establish bidirectional references between scene and graph
    this.scene = scene;
    scene.graph = this;

    // File reading
    this.reader = new CGFXMLreader();

    this.transformations = {}; //creating the hash table for transformations id will be the keyword
    this.primitives = {}; //creating the hash table for primitives
    this.lights = {}; //creating the hash table for lights
    this.materials = {}; //creating the hash table for materials
    this.textures = {};
    this.background = {};
    this.ambient = {};
    this.perspectives = {};
    this.defaultView;

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
    this.parseTransformations(rootElement.getElementsByTagName('transformations'));
    this.parseMaterials(rootElement.getElementsByTagName('materials'));
    this.parseIllumination(rootElement.getElementsByTagName('illumination'));
    this.parseTextures(rootElement.getElementsByTagName('textures'));
    this.parseViews(rootElement.getElementsByTagName('views'));
};

MySceneGraph.prototype.parseRoot = function(sceneElements) {
    this.root = new MiddleNode(this.reader.getString(sceneElements[0], 'root'));
    this.axisLength = this.reader.getFloat(sceneElements[0], 'axis_length');
}

MySceneGraph.prototype.parsePrimitives = function(primitivesElems) {
    if (primitivesElems.length == 0) {
        this.onXMLError("primitives::primitives element is missing.");
    }

    var elems = primitivesElems[0].getElementsByTagName('primitive');
    if (elems.length == 0) {
        this.onXMLError("primitives::it must have at least one primitive block.");
    }

    for (let elem of elems) {
        //it must have only one type of primitive
        if (elem.children.length != 1) {
            this.onXMLError("primitives::it must have just one tag inside primitive tag.");
        }

        var idPrimitive = this.reader.getString(elem, 'id');
        if (typeof this.primitives[idPrimitive] != 'undefined') {
            this.onXMLError("primitives::already exists a primitive with that id");
        }

        var newElement = elem.children[0];
        switch (newElement.tagName) {
            case 'rectangle':
                this.primitives[idPrimitive] = new Rectangle(this.scene, this.reader, newElement);
                break;
            case 'triangle':
                this.primitives[idPrimitive] = new Triangle(this.scene, this.reader, newElement);
                break;
            case 'cylinder':
                this.primitives[idPrimitive] = new Cylinder(this.scene, this.reader, newElement);
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

    if ((omniElems.length + spotElems.length) == 0)
        this.onXMLError("Lights:: it must exists at least one block omni ou spot on lights.");

    for (let elem of rootLights) {
        var idLigth = this.reader.getString(elem, 'id');

        if (typeof this.lights[idLigth] != 'undefined') {
            this.onXMLError("lights::already exists a light with that id");
        }

        switch (elem.tagName) {
            case 'omni':
                this.lights[idLigth] = new Omni(this.reader, elem);
                break;
            case 'spot':
                this.lights[idLigth] = new Spot(this.reader, elem);
                break;

            default:
        }
    }
};

MySceneGraph.prototype.parseMaterials = function(materialsElems) {

    if (materialsElems.length == 0) {
        this.onXMLError("Materials:: materials element is missing.");
    }

    var rootMaterial = materialsElems[0].children;
    var numberChildren = rootMaterial.length;

    var elems = materialsElems[0].getElementsByTagName('material').length;

    if (elems == 0) {
        this.onXMLError("Material:: It must have at least one material's block");
    }

    for (let elem of rootMaterial) {
        var idMaterial = this.reader.getString(elem, 'id');
        if (typeof this.materials[idMaterial] != 'undefined') {
            this.onXMLError("material::already exists a material with that id");
        }
        this.materials[idMaterial] = new Material(this.scene, this.reader, elem);
    }

    console.log("MATERIAIS: "+ this.materials);


};


MySceneGraph.prototype.parseTransformations = function(transformationsElems) {
    if (transformationsElems.length == 0) {
        this.onXMLError("transformations:: element is missing.")
    }

    var elems = transformationsElems[0].getElementsByTagName('transformation');
    if (elems.length == 0) {
        this.onXMLError("transformations::it must exists at least one block transfrmation.");
    }

    //reading all transfrmation tags
    for (let elem of elems) {
        if (elem.children.length == 0) {
            this.onXMLError("transformations::it must exists at least one transformation inside a transformation tag.");
        }

        var elemId = this.reader.getString(elem, 'id');
        if (typeof this.transformations[elemId] != 'undefined') {
            this.onXMLError("transformations::already exists a transformation with that id.");
        }

        let transformation = new Transformation(this.scene, this.reader, elem);
        this.transformations[elemId] = transformation.matrix;
    }
};

MySceneGraph.prototype.parseIllumination = function(illuminationElems) {
  this.background['r'] = this.reader.getFloat(illuminationElems[0].getElementsByTagName('background')[0],'r');
  this.background['g'] = this.reader.getFloat(illuminationElems[0].getElementsByTagName('background')[0],'g');
  this.background['b'] = this.reader.getFloat(illuminationElems[0].getElementsByTagName('background')[0],'b');
  this.background['a'] = this.reader.getFloat(illuminationElems[0].getElementsByTagName('background')[0],'a');

  this.ambient['r'] = this.reader.getFloat(illuminationElems[0].getElementsByTagName('ambient')[0],'r');
  this.ambient['g'] = this.reader.getFloat(illuminationElems[0].getElementsByTagName('ambient')[0],'g');
  this.ambient['b'] = this.reader.getFloat(illuminationElems[0].getElementsByTagName('ambient')[0],'b');
  this.ambient['a'] = this.reader.getFloat(illuminationElems[0].getElementsByTagName('ambient')[0],'a');
};


MySceneGraph.prototype.parseTextures = function(texturesElems) {
  if (texturesElems.length == 0) {
        this.onXMLError("textures:: element is missing.")
    }

    var elems = texturesElems[0].getElementsByTagName('texture');
    if (elems.length == 0) {
        this.onXMLError("textures::it must exists at least one block texture.");
    }
    var rootTexture = texturesElems[0].children;
    var numberChildren = rootTexture.length;

   for (let elem of rootTexture) {
        var idTexture = this.reader.getString(elem, 'id');
        if (typeof this.textures[idTexture] != 'undefined') {
            this.onXMLError("texture::already exists a texture with that id");
        }
        this.textures[idTexture] = new Texture(this.scene, this.reader, elem);
    }

};

MySceneGraph.prototype.parseViews = function(viewsElems) {

  if(viewsElems.length == 0){
    this.onXMLError("views:: element is missing.")
  }

  this.defaultView = this.reader.getString(viewsElems[0],'default');

  var elems = viewsElems[0].getElementsByTagName('perspective');
  if(elems.length == 0){
    this.onXMLError("views:: it must exists at least one block perspective");
  }

  var rootView = viewsElems[0].children;
  var numberChildren = rootView.length;

  for (let elem of rootView) {
       var idPerspective = this.reader.getString(elem, 'id');
       console.log("id:" + idPerspective);
       var coordsFrom = this.getCoordinates(elem.getElementsByTagName('from'));
       var coordsTo = this.getCoordinates(elem.getElementsByTagName('to'));

   }

};

MySceneGraph.prototype.getCoordinates = function(elem){
  var myArray = [];

  var xCoord = this.reader.getFloat(elem[0],'x');
  var yCoord = this.reader.getFloat(elem[0],'y');
  var zCoord = this.reader.getFloat(elem[0],'z');

  myArray.push({ x: xCoord, y: yCoord, z:zCoord });
  console.log("Array de coordenadas:" + myArray[0].x + " " + myArray[0].y + " " + myArray[0].z);
  return myArray;
}
