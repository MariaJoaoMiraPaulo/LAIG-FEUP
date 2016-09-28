function MySceneGraph(filename, scene) {
    this.loadedOk = null;

    // Establish bidirectional references between scene and graph
    this.scene = scene;
    scene.graph = this;

    // File reading
    this.reader = new CGFXMLreader();



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


MySceneGraph.prototype.parseTags = function(rootPrimitives) {
    this.parsePrimitives(rootPrimitives.getElementsByTagName('primitives'));
};

MySceneGraph.prototype.parsePrimitives = function(primitivesElems) {
    if (primitivesElems == null) {
        console.log("primitives element is missing.");
        return;
    }

    //  var elems = primitivesElems[0].getElementsByTagName('primitive');
    var elems = primitivesElems[0].getElementsByTagName('primitive');

    if (elems == null) {
        console.log("It must have at least one primitive's block");
        return;
    }

    console.log("tamanho : " + elems.length);

    var i;
    for (i = 0; i < elems.length; i++) {
        //it must have only one type of primitive
        console.log("tamanho : " + elems[i].tagName + "   " + elems[i].id +
            "   " + elems[i].getElementsByTagName('*').length);

        if (elems[i].getElementsByTagName('*').length != 1) {
            console.log("It must have just one tag inside primitive tag, error on index " + i + ".");
            return;
        }

        var newElement = elems[i].getElementsByTagName('*')[0];
        console.log("tagname: " + newElement.tagName);
        switch (newElement.tagName) {
            case 'rectangle':
            console.log("Entrei");
                this.rectangle = new Rectangle(this.scene,
                this.reader.getFloat(newElement, 'x1'),
                this.reader.getFloat(newElement, 'y1'),
                this.reader.getFloat(newElement, 'x2'),
                this.reader.getFloat(newElement, 'y2')
              );
                break;
        }
        //  this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill", "line", "point"]);
        /*    this.quad = new Rectangle(this.scene,
                this.reader.getFloat());*/

    }

};
