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
    this.background = [];
    this.ambient = [];
    this.perspectives = {};
    this.defaultView;
    this.components = {};
    this.rootId;
    this.axisLength;

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
    this.parseViews(rootElement.getElementsByTagName('views'));
    this.parseIllumination(rootElement.getElementsByTagName('illumination'));
    this.parseLights(rootElement.getElementsByTagName('lights'));
    this.parseTextures(rootElement.getElementsByTagName('textures'));
    this.parseMaterials(rootElement.getElementsByTagName('materials'));
    this.parseTransformations(rootElement.getElementsByTagName('transformations'));
    this.parsePrimitives(rootElement.getElementsByTagName('primitives'));
    this.parseComponents(rootElement.getElementsByTagName('components'));
};

MySceneGraph.prototype.parseRoot = function(sceneElements) {
    this.rootId = this.reader.getString(sceneElements[0], 'root');
    this.axisLength = this.reader.getFloat(sceneElements[0], 'axis_length');
}

MySceneGraph.prototype.parsePrimitives = function(primitivesElems) {
    if (primitivesElems.length == 0) {
        this.onXMLError("primitives:: primitives element is missing.");
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
                break;
            case 'sphere':
                this.primitives[idPrimitive] = new Sphere(this.scene, this.reader, newElement);
                break;

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
                this.lights[idLigth] = new Omni(this, elem);
                break;
            case 'spot':
                this.lights[idLigth] = new Spot(this, elem);
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
        this.materials[idMaterial] = this.createMaterial(elem);
    }
};


MySceneGraph.prototype.parseTransformations = function(transformationsElems) {
    if (transformationsElems.length == 0) {
        this.onXMLError("transformations:: element is missing.")
    }

    var elems = transformationsElems[0].getElementsByTagName('transformation');
    if (elems.length == 0) {
        this.onXMLError("transformations::it must exists at least one block transfrmation.");
    }

    //reading all transformation tags
    for (let elem of elems) {
        if (elem.children.length == 0) {
            this.onXMLError("transformations::it must exists at least one transformation inside a transformation tag.");
        }

        var elemId = this.reader.getString(elem, 'id');
        if (typeof this.transformations[elemId] != 'undefined') {
            this.onXMLError("transformations::already exists a transformation with that id.");
        }

        let transformation = new Transformation(this, elem);
        this.transformations[elemId] = transformation.matrix;
    }
};

MySceneGraph.prototype.parseIllumination = function(illuminationElems) {
    this.background = this.getRGBA(illuminationElems[0].getElementsByTagName('background')[0]);
    this.ambient = this.getRGBA(illuminationElems[0].getElementsByTagName('ambient')[0]);
};


MySceneGraph.prototype.parseTextures = function(texturesElems) {
  console.log(texturesElems);
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
        this.textures[idTexture] = this.createTexture(elem);
    }

};

MySceneGraph.prototype.parseViews = function(viewsElems) {
    if (viewsElems.length == 0) {
        this.onXMLError("views:: element is missing.")
    }
    this.defaultView = this.reader.getString(viewsElems[0], 'default');

    var elems = viewsElems[0].getElementsByTagName('perspective');
    if (elems.length == 0) {
        this.onXMLError("views:: it must exists at least one block perspective");
    }

    var rootView = viewsElems[0].children;
    var numberChildren = rootView.length;

    for (let elem of rootView) {
        var idPerspective = this.reader.getString(elem, 'id');
        console.log("id:" + idPerspective);
        if (typeof this.perspectives[idPerspective] != 'undefined') {
            this.onXMLError("views:: already exists a texture with that id");
        }
        this.perspectives[idPerspective] = this.createCamera(elem);
    }

};

MySceneGraph.prototype.parseComponents = function(componentElems) {

    //TODO é preciso ter pelo menos um bloco componente?

    for (let component of componentElems[0].children) {
        let id = this.reader.getFloat(component, 'id');

        this.components[id] = new Component(this.scene, this.reader, component, this);
    }
}


MySceneGraph.prototype.getCoordinates = function(elem) {
    var myArray = [];

    var xCoord = this.reader.getFloat(elem, 'x');
    var yCoord = this.reader.getFloat(elem, 'y');
    var zCoord = this.reader.getFloat(elem, 'z');

    myArray.push({
        x: xCoord,
        y: yCoord,
        z: zCoord
    });
    console.log("Array de coordenadas:" + myArray[0].x + " " + myArray[0].y + " " + myArray[0].z);
    return myArray;
}

MySceneGraph.prototype.getRGBA = function(elem) {
    var rgbaArray = [];

    console.log(elem);

    var rElem = this.reader.getFloat(elem, 'r');
    var gElem = this.reader.getFloat(elem, 'g');
    var bElem = this.reader.getFloat(elem, 'b');
    var aElem = this.reader.getFloat(elem, 'a');

    //TODO: Array de objetos ou array?
    rgbaArray.push({
        r: rElem,
        g: gElem,
        b: bElem,
        a: aElem
    });
    console.log("Array de rgba:" + rgbaArray[0].r + " " + rgbaArray[0].g + " " + rgbaArray[0].b + " " + rgbaArray[0].a);
    return rgbaArray;
}

MySceneGraph.prototype.createMaterial = function(newElement) {

    var emission = this.getRGBA(newElement.getElementsByTagName('emission')[0]);
    var ambient = this.getRGBA(newElement.getElementsByTagName('ambient')[0]);
    var diffuse = this.getRGBA(newElement.getElementsByTagName('diffuse')[0]);
    var specular = this.getRGBA(newElement.getElementsByTagName('specular')[0]);
    var shininess = this.reader.getFloat(newElement.getElementsByTagName('shininess')[0], 'value');

    var newMaterial = new CGFappearance(this.scene);
    newMaterial.setSpecular(specular[0].r,specular[0].g,specular[0].b,specular[0].a);
    newMaterial.setShininess(shininess);
    newMaterial.setDiffuse(diffuse[0].r,diffuse[0].g,diffuse[0].b,diffuse[0].a);
    newMaterial.setAmbient(ambient[0].r,ambient[0].g,ambient[0].b,ambient[0].a);
    newMaterial.setEmission(emission[0].r,emission[0].g,emission[0].b,emission[0].a);

    return newMaterial;
}

MySceneGraph.prototype.createTexture = function(newElement) {

  var fileElem = this.reader.getString(newElement,'file');
  var length_sElem = this.reader.getFloat(newElement,'length_s');
  var length_tElem = this.reader.getFloat(newElement,'length_t');

  var textureArray = [{file: fileElem, length_s: length_sElem, length_t: length_tElem}];
  return textureArray;

}

MySceneGraph.prototype.createCamera = function(newElement) {
  var nearElem = this.reader.getFloat(newElement, 'near');
  var angleElem = this.reader.getFloat(newElement, 'angle');
  var farElem = this.reader.getFloat(newElement, 'far');
  var coordsFrom = this.getCoordinates(newElement.getElementsByTagName('from')[0]);
  var coordsTo = this.getCoordinates(newElement.getElementsByTagName('to')[0]);

  //TODO:: Target??? ultimo parametro da camara
  var newCamera = new CGFcamera(angleElem, nearElem, farElem, vec3.fromValues(coordsFrom[0].x,coordsFrom[0].y,coordsFrom[0].z), vec3.fromValues(coordsTo[0].x,coordsTo[0].y, coordsTo[0].y));
  return newCamera;
}
