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
    this.perspectives = [];
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
 * Callback to be executed on any read error
 */
MySceneGraph.prototype.onXMLError = function(message) {
    console.error("XML Loading Error: " + message);
    this.loadedOk = false;
};

MySceneGraph.prototype.parseTags = function(rootElement) {
    this.parseRoot(rootElement.children[0]);
    this.parseViews(rootElement.children[1]);
    this.parseIllumination(rootElement.children[2]);
    this.parseLights(rootElement.children[3]);
    this.parseTextures(rootElement.children[4]);
    this.parseMaterials(rootElement.children[5]);
    this.parseTransformations(rootElement.children[6]);
    this.parsePrimitives(rootElement.children[7]);
    this.parseComponents(rootElement.children[8]);
};

MySceneGraph.prototype.parseRoot = function(sceneElements) {
    if (sceneElements.nodeName == 'scene') {
        this.rootId = this.reader.getString(sceneElements, 'root');
        console.log(this.rootId);
        this.axisLength = this.reader.getFloat(sceneElements, 'axis_length');
        console.log(this.axisLength);

        this.scene.axis = new CGFaxis(this.scene, this.axisLength);
    } else this.onXMLError("The first block should be Scene. Incorrect order of blocks.");

};

MySceneGraph.prototype.parseViews = function(viewsElems) {

    if (viewsElems.length == 0) {
        this.onXMLError("views:: element is missing.")
    }

    if (viewsElems.nodeName == 'views') {
        this.defaultView = this.reader.getString(viewsElems, 'default');

        var elems = viewsElems.getElementsByTagName('perspective');
        if (elems.length == 0) {
            this.onXMLError("views:: it must exists at least one block perspective");
        }

        var rootView = viewsElems.children;
        var numberChildren = rootView.length;

        for (let elem of rootView) {
            var idPerspective = this.reader.getString(elem, 'id');
            console.log(idPerspective);

            /*  if (typeof this.perspectives[idPerspective] != 'undefined') {
                  this.onXMLError("views:: already exists a texture with that id");
              }*/
            this.perspectives.push(this.createCamera(elem));
        }

    } else this.onXMLError("The second block should be Views instead of " + viewsElems.nodeName +". Incorrect order of blocks.");

};


MySceneGraph.prototype.parseIllumination = function(illuminationElems) {

    if (illuminationElems.nodeName == 'illumination') {
        this.illuminationDoubleSided = this.reader.getBoolean(illuminationElems, 'doublesided');
        this.illuminationLocal = this.reader.getBoolean(illuminationElems, 'local');
        this.background = this.getRGBA(illuminationElems.getElementsByTagName('background')[0]);
        this.ambient = this.getRGBA(illuminationElems.getElementsByTagName('ambient')[0]);
    } else this.onXMLError("The third block should be Illumination instead of " +illuminationElems.nodeName + ". Incorrect order of blocks.");
};

MySceneGraph.prototype.parseLights = function(primitivesElems) {


    if (primitivesElems.length == 0) {
        this.onXMLError("Lights:: lights element is missing.");
    }

    if (primitivesElems.nodeName == 'lights') {
        var rootLights = primitivesElems.children;
        var numberChildren = rootLights.length;

        var omniElems = primitivesElems.getElementsByTagName('omni');
        var spotElems = primitivesElems.getElementsByTagName('spot');

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
    } else this.onXMLError("The fourth block should be Lights instead of " + primitivesElems.nodeName +". Incorrect order of blocks.");
};

MySceneGraph.prototype.parseTextures = function(texturesElems) {


    if (texturesElems.length == 0) {
        this.onXMLError("textures:: element is missing.")
    }
    if (texturesElems.nodeName == 'textures') {
        var elems = texturesElems.getElementsByTagName('texture');
        if (elems.length == 0) {
            this.onXMLError("textures::it must exists at least one block texture.");
        }
        var rootTexture = texturesElems.children;
        var numberChildren = rootTexture.length;

        for (let elem of rootTexture) {
            var idTexture = this.reader.getString(elem, 'id');
            if (typeof this.textures[idTexture] != 'undefined') {
                this.onXMLError("texture::already exists a texture with that id");
            }
            this.textures[idTexture] = this.createTexture(elem);
        }
    } else this.onXMLError("The fifth block should be Textures instead of "+ texturesElems.nodeName + ". Incorrect order of blocks.");

};

MySceneGraph.prototype.parseMaterials = function(materialsElems) {


    if (materialsElems.length == 0) {
        this.onXMLError("Materials:: materials element is missing.");
    }

    if (materialsElems.nodeName == 'materials') {
        var rootMaterial = materialsElems.children;
        var numberChildren = rootMaterial.length;

        var elems = materialsElems.getElementsByTagName('material').length;

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
    } else this.onXMLError("The sixth block should be Materials instead of " + materialsElems.nodeName +  ". Incorrect order of blocks.");

};

MySceneGraph.prototype.parseTransformations = function(transformationsElems) {


    if (transformationsElems.length == 0) {
        this.onXMLError("transformations:: element is missing.")
    }

    if (transformationsElems.nodeName == 'transformations') {
        var elems = transformationsElems.getElementsByTagName('transformation');
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
    } else this.onXMLError("The seventh block should be Transformations instead of" +transformationsElems.nodeName+". Incorrect order of blocks.");
};


MySceneGraph.prototype.parsePrimitives = function(primitivesElems) {

    if (primitivesElems.length == 0) {
        this.onXMLError("primitives:: primitives element is missing.");
    }

    if (primitivesElems.nodeName == 'primitives') {
        var elems = primitivesElems.getElementsByTagName('primitive');
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
                case 'torus':
                    this.primitives[idPrimitive] = new Torus(this.scene, this.reader, newElement);
                    break;
            }
        }
    } else this.onXMLError("The eighth block should be primitives instead of"+ primitivesElems.nodeName +". Incorrect order of blocks.");
};

MySceneGraph.prototype.parseComponents = function(componentElems) {

    if (componentElems.tagName == 'components') {
        for (let component of componentElems.children) {
            let id = this.reader.getString(component, 'id');

            this.components[id] = new Component(this.scene, this.reader, component, this);

        }

        for (key in this.components) {
            this.components[key].conectingChildrens();
        }
    } else this.onXMLError("The ninth block should be Components instead of "+ componentElems.tagName + ". Incorrect order of blocks.");
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

    return myArray;
}

MySceneGraph.prototype.getRGBA = function(elem) {
    var rgbaArray = [];

    var rElem = this.reader.getFloat(elem, 'r');
    var gElem = this.reader.getFloat(elem, 'g');
    var bElem = this.reader.getFloat(elem, 'b');
    var aElem = this.reader.getFloat(elem, 'a');

    rgbaArray.push({
        r: rElem,
        g: gElem,
        b: bElem,
        a: aElem
    });

    return rgbaArray;
}

MySceneGraph.prototype.createMaterial = function(newElement) {

    var emission = this.getRGBA(newElement.getElementsByTagName('emission')[0]);
    var ambient = this.getRGBA(newElement.getElementsByTagName('ambient')[0]);
    var diffuse = this.getRGBA(newElement.getElementsByTagName('diffuse')[0]);
    var specular = this.getRGBA(newElement.getElementsByTagName('specular')[0]);
    var shininess = this.reader.getFloat(newElement.getElementsByTagName('shininess')[0], 'value');

    var newMaterial = new CGFappearance(this.scene);
    newMaterial.setSpecular(specular[0].r, specular[0].g, specular[0].b, specular[0].a);
    newMaterial.setShininess(shininess);
    newMaterial.setDiffuse(diffuse[0].r, diffuse[0].g, diffuse[0].b, diffuse[0].a);
    newMaterial.setAmbient(ambient[0].r, ambient[0].g, ambient[0].b, ambient[0].a);
    newMaterial.setEmission(emission[0].r, emission[0].g, emission[0].b, emission[0].a);

    return newMaterial;
}

MySceneGraph.prototype.createTexture = function(newElement) {

    var fileElem = this.reader.getString(newElement, 'file');
    var length_sElem = this.reader.getFloat(newElement, 'length_s');
    var length_tElem = this.reader.getFloat(newElement, 'length_t');

    //var textureArray = [{file: fileElem, length_s: length_sElem, length_t: length_tElem}];

    return (new CGFtexture(this.scene, fileElem));

}

MySceneGraph.prototype.createCamera = function(newElement) {
    var nearElem = this.reader.getFloat(newElement, 'near');
    var angleElem = this.reader.getFloat(newElement, 'angle');
    var farElem = this.reader.getFloat(newElement, 'far');
    var coordsFrom = this.getCoordinates(newElement.getElementsByTagName('from')[0]);
    var coordsTo = this.getCoordinates(newElement.getElementsByTagName('to')[0]);

    var newCamera = new CGFcamera(angleElem, nearElem, farElem, vec3.fromValues(coordsFrom[0].x, coordsFrom[0].y, coordsFrom[0].z), vec3.fromValues(coordsTo[0].x, coordsTo[0].y, coordsTo[0].y));
    return newCamera;
}
