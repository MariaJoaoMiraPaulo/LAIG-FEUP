/**
 * Reads scene objects and properties from the specified 'filename', assigning them to the specified 'scene'
 * @param filename dsx to be parsed
 * @param scene scene o be used
 * @constructor
 */
function MySceneGraph(filename, scene) {
    this.loadedOk = null;

    // Establish bidirectional references between scene and graph
    this.scene = scene;
    scene.graph = this;

    // File reading
    this.reader = new CGFXMLreader();

    this.transformations = {}; //creating the hash table for transformations id will be the keyword
    this.primitives = {}; //creating the hash table for primitives
    this.animations = {}; //creating the hash table for animations
    this.lights = {}; //creating the hash table for lights
    this.materials = {}; //creating the hash table for materials
    this.textures = {}; //creating the hash table for textures
    this.background = []; //creating the array for background elements
    this.ambient = []; //creating the array for ambient elements
    this.perspectives = []; //creating the array for perspectives
    this.perspectivesIds = []; //creating the array for perspectivesIds
    this.defaultViewIndex; // index of the default view of the scene
    this.components = {}; //creating the hash table for components
    this.rootId; // component id of the root of the graph
    this.axisLength; // lengt of the axis of the scene

    /*
     * Read the contents of the xml file, and refer to this class for loading and error handlers.
     * After the file is read, the reader calls onXMLReady on this object.
     * If any error occurs, the reader calls onXMLError on this object, with an error message
     */

    this.reader.open('scenes/' + filename, this);
}

/**
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady = function() {
    console.log("XML Loading finished.");
    var rootElement = this.reader.xmlDoc.documentElement;

    this.loadedOk = true;
    // Here should go the calls for different functions to parse the various blocks
    //var error = this.parseGlobalsExample(rootElement);
    var error = this.parseTags(rootElement);

    if (error != null) {
        this.onXMLError(error);
        return;
    }
    // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
    this.scene.onGraphLoaded();
};

/**
 * Callback to be executed on any read error
 * @param message to be displayed
 */
MySceneGraph.prototype.onXMLError = function(message) {
    console.error("XML Loading Error: " + message);
    this.loadedOk = false;
};

/**
 * Start to read Scene Tags by a specific order
 * @param rootElement elements to be proccessed
 */
MySceneGraph.prototype.parseTags = function(rootElement) {
    this.parseRoot(rootElement.getElementsByTagName('scene'));
    this.parseViews(rootElement.getElementsByTagName('views'));
    this.parseIllumination(rootElement.getElementsByTagName('illumination'));
    this.parseLights(rootElement.getElementsByTagName('lights'));
    this.parseTextures(rootElement.getElementsByTagName('textures'));
    this.parseMaterials(rootElement.getElementsByTagName('materials'));
    this.parseTransformations(rootElement.getElementsByTagName('transformations'));
    this.parseAnimations(rootElement.getElementsByTagName('animations'));
    this.parsePrimitives(rootElement.getElementsByTagName('primitives'));
    this.parseComponents(rootElement.getElementsByTagName('components'));
};

/**
 * Start to read Scene Blocks by a specific order
 * @param sceneElements scene elements to be proccessed
 */
MySceneGraph.prototype.parseRoot = function(sceneElements) {
    this.rootId = this.reader.getString(sceneElements[0], 'root');
    this.axisLength = this.reader.getFloat(sceneElements[0], 'axis_length');
    if (isNaN(this.axisLength))
        this.onXMLError("Scene Block expected a float on axis length");

    this.scene.axis = new CGFaxis(this.scene, this.axisLength);
}

/**
 * Parses the Primitives block
 * @param primitivesElems primitives block to be read
 */
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
            this.onXMLError("primitives::already exists a primitive with that id, " + idPrimitive + ".");
        }

        var newElement = elem.children[0];
        switch (newElement.tagName) {
            case 'rectangle':
                this.readingRetangle(newElement, idPrimitive);
                break;
            case 'triangle':
                this.readingTriangle(newElement, idPrimitive);
                break;
            case 'cylinder':
                this.readingCylinder(newElement, idPrimitive);
                break;
            case 'sphere':
                this.readingSphere(newElement, idPrimitive);
                break;
            case 'torus':
                this.readingTorus(newElement, idPrimitive);
                break;
            case 'plane':
                this.readingPlane(newElement, idPrimitive);
                break;
            case 'patch':
                this.readingPatch(newElement, idPrimitive);
                break;
            case 'vehicle':
                this.readingVehicle(newElement, idPrimitive);
                break;
            case 'chessboard':
                this.readingChessboard(newElement, idPrimitive);
                break;
            case 'car':
                this.readingCar(newElement, idPrimitive);
                break;
        }
    }
};

/**
 * Parses the Lights block
 * @param lightsElems lights block to be read
 */
MySceneGraph.prototype.parseLights = function(lightsElems) {

    if (lightsElems.length == 0) {
        this.onXMLError("Lights:: lights element is missing.");
    }

    var rootLights = lightsElems[0].children;
    var numberChildren = rootLights.length;

    var omniElems = lightsElems[0].getElementsByTagName('omni');
    var spotElems = lightsElems[0].getElementsByTagName('spot');

    if ((omniElems.length + spotElems.length) == 0)
        this.onXMLError("Lights:: it must exists at least one block omni or spot on lights.");

    var i = 0;
    for (let elem of rootLights) {
        var idLight = this.reader.getString(elem, 'id');

        if (typeof this.lights[idLight] != 'undefined') {
            this.onXMLError("lights::already exists a light with that id, " + idLight + ".");
        }

        switch (elem.tagName) {
            case 'omni':
                this.lights[idLight] = new Omni(this, elem, idLight, i);
                break;
            case 'spot':
                this.lights[idLight] = new Spot(this, elem, idLight, i);
                break;

            default:
        }
        i++;
    }
};

/**
 * Parses the Materials block
 * @param materialsElems materials block to be read
 */
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
            this.onXMLError("material::already exists a material with that id, " + idMaterial + ".");
        }
        this.materials[idMaterial] = this.createMaterial(elem);
    }

};

/**
 * Parses the Transformations block
 * @param transformationsElems transformations block to be read
 */
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
            this.onXMLError("transformations::already exists a transformation with that id, " + elemId + ".");
        }

        let transformation = new Transformation(this, elem);
        this.transformations[elemId] = transformation.matrix;
    }
};

/**
 * Parses the Animation block
 * @param animationElems animation block to be read
 */
MySceneGraph.prototype.parseAnimations = function(animationElems) {
    if (animationElems.length == 0) {
        this.onXMLError("animations:: element is missing.")
    }

    var elems = animationElems[0].getElementsByTagName('animation');

    //reading all animation tags
    for (let elem of elems) {

        var animationType = this.reader.getString(elem, 'type');
        var animationId = this.reader.getString(elem, 'id');
        var animationSpan = this.reader.getFloat(elem, 'span');
        if (isNaN(animationSpan))
            this.onXMLError('Animation Block expected a float number on span.');
        switch (animationType) {
            case 'linear':
                var controlPoints = elem.getElementsByTagName('controlpoint');
                var controlPointsArray = new Array();
                for (let point of controlPoints) {
                    var coord = vec3.fromValues(this.reader.getFloat(point, 'xx'), this.reader.getFloat(point, 'yy'), this.reader.getFloat(point, 'zz'));
                    if (isNaN(this.reader.getFloat(point, 'xx')) || isNaN(this.reader.getFloat(point, 'yy')) || isNaN(this.reader.getFloat(point, 'zz')))
                        this.onXMLError('Animation Block expected float numbers on controlPoints Array.');
                    controlPointsArray.push(coord);
                }
                this.animations[animationId] = new LinearAnimation(this.scene, animationId, animationSpan, controlPointsArray);
                break;
            case 'circular':
                var circularAnimationRadius = this.reader.getFloat(elem, 'radius');
                if (isNaN(circularAnimationRadius))
                    this.onXMLError('Animation Block expected a float number on radius.');
                var circularAnimationStartAng = this.reader.getFloat(elem, 'startang');
                circularAnimationStartAng = (circularAnimationStartAng * Math.PI) / 180;
                if (isNaN(circularAnimationStartAng))
                    this.onXMLError('Animation Block expected a float number on startang.');
                var circularAnimationRotAng = this.reader.getFloat(elem, 'rotang');
                circularAnimationRotAng = (circularAnimationRotAng * Math.PI) / 180;
                if (isNaN(circularAnimationRotAng))
                    this.onXMLError('Animation Block expected a float number on rotang.');
                var center = this.reader.getString(elem, 'center');
                var centerCoordinates = center.split(" ");
                var coords = vec3.fromValues(centerCoordinates[0], centerCoordinates[1], centerCoordinates[2]);
                this.animations[animationId] = new CircularAnimation(this.scene, animationId, animationSpan, coords, circularAnimationRadius, circularAnimationStartAng, circularAnimationRotAng);
                break;
            default:

        }
    }
}

/**
 * Parses the Ilumination block
 * @param illuminationElems illumination block to be read
 */
MySceneGraph.prototype.parseIllumination = function(illuminationElems) {

    if (illuminationElems.length == 0) {
        this.onXMLError("illumination:: element is missing.")
    }

    this.illuminationDoubleSided = this.reader.getBoolean(illuminationElems[0], 'doublesided');
    if (typeof this.illuminationDoubleSided != "boolean")
        this.onXMLError('Ilumination Block expected a boolean on doublesided.');
    this.illuminationLocal = this.reader.getBoolean(illuminationElems[0], 'local');
    if (typeof this.illuminationLocal != "boolean")
        this.onXMLError('Ilumination Block expected a boolean on local.');
    this.background = this.getRGBA(illuminationElems[0].getElementsByTagName('background')[0]);
    this.ambient = this.getRGBA(illuminationElems[0].getElementsByTagName('ambient')[0]);
};

/**
 * Parses the Textures block
 * @param texturesElems textures block to be read
 */
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
            this.onXMLError("texture::already exists a texture with that id, " + idTexture + ".");
        }
        var s = this.reader.getFloat(elem, 'length_s');
        if (isNaN(s))
            this.onXMLError('Expected a float number on length_s.');
        else if (s < 0)
            this.onXMLError('Expected a positive number on length_s.');
        var t = this.reader.getFloat(elem, 'length_t');
        if (isNaN(t))
            this.onXMLError('Expected a float number on length_t.');
        else if (t < 0)
            this.onXMLError('Expected a positive number on length_t.');
        this.textures[idTexture] = [{
            texture: this.createTexture(elem),
            length_s: s,
            length_t: t
        }];
    }

};

/**
 * Parses the Views block
 * @param viewsElems views block to be read
 */
MySceneGraph.prototype.parseViews = function(viewsElems) {
    if (viewsElems.length == 0) {
        this.onXMLError("views:: element is missing.")
    }

    var defaultViewId = this.reader.getString(viewsElems[0], 'default');

    var elems = viewsElems[0].getElementsByTagName('perspective');
    if (elems.length == 0) {
        this.onXMLError("views:: it must exists at least one block perspective");
    }

    var rootView = viewsElems[0].children;
    var numberChildren = rootView.length;
    var thereIsAValidDefaultView = false;

    for (let elem of rootView) {
        var idPerspective = this.reader.getString(elem, 'id');

        // checking if there is already a view with this id
        if (this.thereIsAViewWithThatId(idPerspective)) {
            this.onXMLError("views:: already exists a view with that id, " + idPerspective + ".");
        } else {
            if (idPerspective == defaultViewId) {
                this.defaultViewIndex = this.perspectives.length;
                thereIsAValidDefaultView = true;
            }

            this.perspectives.push(this.createCamera(elem));
            this.perspectivesIds.push(idPerspective);
        }
    }

    if (!thereIsAValidDefaultView) {
        this.onXMLError("views:: you have to put a valid default view.");
    }

};

/**
 * Checks if there is a view with one specific id
 * @param idPerspective perspective id
 */
MySceneGraph.prototype.thereIsAViewWithThatId = function(idPerspective) {
    for (let id of this.perspectivesIds) {
        if (id == idPerspective)
            return true;
    }

    return false;
};

/**
 * Parses the Components block
 * @param componentElems components block to be read
 */
MySceneGraph.prototype.parseComponents = function(componentElems) {

    for (let component of componentElems[0].children) {
        let id = this.reader.getString(component, 'id');

        this.components[id] = new Component(this.scene, this.reader, component, this);

    }

    for (key in this.components) {
        this.components[key].conectingChildrens();
    }
}


/**
 * Returns an array with x, y and z coordinates
 * @param elem elem to be read
 */
MySceneGraph.prototype.getCoordinates = function(elem) {
    var myArray = [];

    var xCoord = this.reader.getFloat(elem, 'x');
    if (isNaN(xCoord))
        this.onXMLError('Expected a float number on coordinate x.');
    var yCoord = this.reader.getFloat(elem, 'y');
    if (isNaN(yCoord))
        this.onXMLError('Expected a float number on coordinate y.');
    var zCoord = this.reader.getFloat(elem, 'z');
    if (isNaN(zCoord))
        this.onXMLError('Expected a float number on coordinate z.');

    myArray.push({
        x: xCoord,
        y: yCoord,
        z: zCoord
    });

    return myArray;
}

/**
 * Returns an array with r, g , b and a components
 * @param elem elem to be read
 */
MySceneGraph.prototype.getRGBA = function(elem) {
    var rgbaArray = [];

    var rElem = this.reader.getFloat(elem, 'r');
    if (isNaN(rElem))
        this.onXMLError('Expected a float number on component r.');
    var gElem = this.reader.getFloat(elem, 'g');
    if (isNaN(gElem))
        this.onXMLError('Expected a float number on component g.');
    var bElem = this.reader.getFloat(elem, 'b');
    if (isNaN(bElem))
        this.onXMLError('Expected a float number on component b.');
    var aElem = this.reader.getFloat(elem, 'a');
    if (isNaN(aElem))
        this.onXMLError('Expected a float number on component a.');

    rgbaArray.push({
        r: rElem,
        g: gElem,
        b: bElem,
        a: aElem
    });

    return rgbaArray;
}

/**
 * Creates a CGF material
 * @param newElement elem to be read
 */
MySceneGraph.prototype.createMaterial = function(newElement) {

    var emission = this.getRGBA(newElement.getElementsByTagName('emission')[0]);
    var ambient = this.getRGBA(newElement.getElementsByTagName('ambient')[0]);
    var diffuse = this.getRGBA(newElement.getElementsByTagName('diffuse')[0]);
    var specular = this.getRGBA(newElement.getElementsByTagName('specular')[0]);
    var shininess = this.reader.getFloat(newElement.getElementsByTagName('shininess')[0], 'value');
    if (isNaN(shininess))
        this.onXMLError('Material Block expected a float number on shininess.');

    var newMaterial = new CGFappearance(this.scene);
    newMaterial.setSpecular(specular[0].r, specular[0].g, specular[0].b, specular[0].a);
    newMaterial.setShininess(shininess);
    newMaterial.setDiffuse(diffuse[0].r, diffuse[0].g, diffuse[0].b, diffuse[0].a);
    newMaterial.setAmbient(ambient[0].r, ambient[0].g, ambient[0].b, ambient[0].a);
    newMaterial.setEmission(emission[0].r, emission[0].g, emission[0].b, emission[0].a);

    return newMaterial;
}

/**
 * Creates a CGF texture
 * @param newElement elem to be read
 */
MySceneGraph.prototype.createTexture = function(newElement) {

    var fileElem = this.reader.getString(newElement, 'file');
    var length_sElem = this.reader.getFloat(newElement, 'length_s');
    if (isNaN(length_sElem))
        this.onXMLError('Texture Block expected a float number on length_s.');
    var length_tElem = this.reader.getFloat(newElement, 'length_t');
    if (isNaN(length_tElem))
        this.onXMLError('Texture Block expected a float number on length_t.');

    return (new CGFtexture(this.scene, fileElem));

}

/**
 * Creates a CGF camera
 * @param newElement element to be read
 */
MySceneGraph.prototype.createCamera = function(newElement) {
    var nearElem = this.reader.getFloat(newElement, 'near');
    if (isNaN(nearElem))
        this.onXMLError('Views Block expected a float number on near.');
    var angleElem = this.reader.getFloat(newElement, 'angle');
    if (isNaN(angleElem))
        this.onXMLError('Views Block expected a float number on angle.');
    var farElem = this.reader.getFloat(newElement, 'far');
    if (isNaN(farElem))
        this.onXMLError('Views Block expected a float number on far.');
    var coordsFrom = this.getCoordinates(newElement.getElementsByTagName('from')[0]);
    var coordsTo = this.getCoordinates(newElement.getElementsByTagName('to')[0]);

    var newCamera = new CGFcamera(angleElem, nearElem, farElem, vec3.fromValues(coordsFrom[0].x, coordsFrom[0].y, coordsFrom[0].z), vec3.fromValues(coordsTo[0].x, coordsTo[0].y, coordsTo[0].y));
    return newCamera;
}

/**
 * Reads cylinder primitives
 * @param newElement element to be read
 */
MySceneGraph.prototype.readingCylinder = function(newElement, idPrimitive) {
    let baseRadius = this.reader.getFloat(newElement, 'base');
    let topRadius = this.reader.getFloat(newElement, 'top');
    let height = this.reader.getFloat(newElement, 'height');
    let slices = this.reader.getFloat(newElement, 'slices');
    let stacks = this.reader.getFloat(newElement, 'stacks');

    this.primitives[idPrimitive] = new Cylinder(this.scene, baseRadius, topRadius, height, slices, stacks);
}

/**
 * Reads retangle primitives
 * @param newElement element to be read
 */
MySceneGraph.prototype.readingRetangle = function(newElement, idPrimitive) {
    let x1 = this.reader.getFloat(newElement, 'x1');
    let x2 = this.reader.getFloat(newElement, 'x2');
    let y1 = this.reader.getFloat(newElement, 'y1');
    let y2 = this.reader.getFloat(newElement, 'y2');

    this.primitives[idPrimitive] = new Rectangle(this.scene, x1, y1, x2, y2);
}

/**
 * Reads triangle primitives
 * @param newElement element to be read
 */
MySceneGraph.prototype.readingTriangle = function(newElement, idPrimitive) {
    let values = {};

    values['x1'] = this.reader.getFloat(newElement, 'x1');
    values['y1'] = this.reader.getFloat(newElement, 'y1');
    values['z1'] = this.reader.getFloat(newElement, 'z1');
    values['x2'] = this.reader.getFloat(newElement, 'x2');
    values['y2'] = this.reader.getFloat(newElement, 'y2');
    values['z2'] = this.reader.getFloat(newElement, 'z2');
    values['x3'] = this.reader.getFloat(newElement, 'x3');
    values['y3'] = this.reader.getFloat(newElement, 'y3');
    values['z3'] = this.reader.getFloat(newElement, 'z3');

    this.primitives[idPrimitive] = new Triangle(this.scene, values);
}

/**
 * Reads sphere primitives
 * @param newElement element to be read
 */
MySceneGraph.prototype.readingSphere = function(newElement, idPrimitive) {
    let slices = this.reader.getInteger(newElement, 'slices');
    let stacks = this.reader.getInteger(newElement, 'stacks');
    let radius = this.reader.getFloat(newElement, 'radius');

    this.primitives[idPrimitive] = new Sphere(this.scene, slices, stacks, radius);
}

/**
 * Reads torus primitives
 * @param newElement element to be read
 */
MySceneGraph.prototype.readingTorus = function(newElement, idPrimitive) {
    let inner = this.reader.getFloat(newElement, 'inner');
    let outer = this.reader.getFloat(newElement, 'outer');
    let slices = this.reader.getInteger(newElement, 'slices');
    let loops = this.reader.getInteger(newElement, 'loops');

    this.primitives[idPrimitive] = new Torus(this.scene, inner, outer, slices, loops);
}

/**
 * Reads plane primitives
 * @param newElement element to be read
 */
MySceneGraph.prototype.readingPlane = function(newElement, idPrimitive) {
    let dimX = this.reader.getFloat(newElement, 'dimX');
    let dimY = this.reader.getFloat(newElement, 'dimY');
    let partsX = this.reader.getFloat(newElement, 'partsX');
    let partsY = this.reader.getFloat(newElement, 'partsY');

    this.primitives[idPrimitive] = new Plane(this.scene, dimX, dimY, partsX, partsY);
}

/**
 * Reads patch primitives
 * @param newElement element to be read
 */
MySceneGraph.prototype.readingPatch = function(newElement, idPrimitive) {
    let orderU = this.reader.getFloat(newElement, 'orderU');
    let orderV = this.reader.getFloat(newElement, 'orderV');
    let partsU = this.reader.getFloat(newElement, 'partsU');
    let partsV = this.reader.getFloat(newElement, 'partsV');
    let controlPoints = [];
    let points = newElement.getElementsByTagName("controlpoint");

    if (points.length != (orderV + 1) * (orderU + 1)) {
        this.onXMLError("Patch can't be created because the number of controlPoints must be (orderV+1)*(orderU+1)");
    }
    if(points.length < 2){
        this.onXMLError("It must have at least 2 control points");
    }
    for (let point of points) {
        let x = this.reader.getFloat(point, 'x');
        let y = this.reader.getFloat(point, 'y');
        let z = this.reader.getFloat(point, 'z');
        controlPoints.push([x, y, z, 1]);
    }
    this.primitives[idPrimitive] = new Patch(this.scene, orderU, orderV, partsU, partsV, controlPoints);
}

/**
 * Reads vehicle primitives
 * @param newElement element to be read
 */
MySceneGraph.prototype.readingVehicle = function(newElement, idPrimitive) {
    this.primitives[idPrimitive] = new Vehicle(this.scene, this.reader);
}

/**
 * Reads chessboard primitives
 * @param newElement element to be read
 */
MySceneGraph.prototype.readingChessboard = function(newElement, idPrimitive) {
    let du = this.reader.getInteger(newElement, 'du');
    if (du == null) {
        this.onXMLError("du element is need");
    }

    let dv = this.reader.getInteger(newElement, 'dv');
    if (dv == null) {
        this.onXMLError("dv element is need");
    }

    let textureId = this.reader.getString(newElement, 'textureref');
    if (textureId == null) {
        this.onXMLError("textureref element is need");
    }

    let texture = this.textures[textureId][0].texture;
      
    if(typeof texture == 'undefined'){
      this.onXMLError("Doesnt exists any texture with that id");
    }

    let su = this.reader.getInteger(newElement, 'su');
    if (su == null) {
        this.onXMLError("su element is need");
    }

    let sv = this.reader.getInteger(newElement, 'sv');
    if (sv == null) {
        this.onXMLError("sv element is need");
    }

    let c1Element = newElement.getElementsByTagName("c1");
    let c2Element = newElement.getElementsByTagName("c2");
    let csElement = newElement.getElementsByTagName("cs");

    if (c1Element.length != 1) {
        this.onXMLError("There can only be one c1 element");
    }
    let c1 = this.readingChessboardColor(c1Element[0]);

    if (c2Element.length != 1) {
        this.onXMLError("There can only be one c2 element");
    }
    let c2 = this.readingChessboardColor(c2Element[0]);

    if (csElement.length != 1) {
        this.onXMLError("There can only be one cs element");
    }
    let cs = this.readingChessboardColor(csElement[0]);

    this.primitives[idPrimitive] = new Chessboard(this.scene, du, dv, texture, su, sv, c1, c2, cs);
}

MySceneGraph.prototype.readingChessboardColor = function(colorElement) {

    let r = this.reader.getFloat(colorElement, 'r');
    let g = this.reader.getFloat(colorElement, 'g');
    let b = this.reader.getFloat(colorElement, 'b');
    let a = this.reader.getFloat(colorElement, 'a');

    let color = [r, g, b, a];

    return color;
}

MySceneGraph.prototype.readingCar = function(newElement, idPrimitive) {
    this.primitives[idPrimitive] = new Car(this.scene, this.reader);
}
