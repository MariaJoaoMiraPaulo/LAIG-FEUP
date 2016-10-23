/**
* Transformation
 * @constructor
*/
class Transformation {
    constructor(sceneGraph, element) {
        this.sceneGraph = sceneGraph;
        this.scene = sceneGraph.scene;
        this.reader = sceneGraph.reader;
        this.element = element;
        this.matrix;
        this.makingMatrix();
    }

    /**
    * Creates the matrix of a transformation
    * @constructor
    */
    makingMatrix() {

        this.scene.pushMatrix();
        this.scene.loadIdentity();

        for (let elem of this.element.children) {
            let attributes = [];
            switch (elem.tagName) {
                case 'translate':
                    this.translate(elem);
                    break;
                case 'rotate':
                    this.rotate(elem);
                    break;
                case 'scale':
                    this.scale(elem);
                    break;
                default:

            }
        }
        this.matrix = this.scene.getMatrix();
        this.scene.popMatrix();
    }

    /**
    * Translate
    * @param elem elem to be translate
    */
    translate(elem) {
        var coords = this.sceneGraph.getCoordinates(elem);
        this.scene.translate(coords[0].x,coords[0].y,coords[0].z);

    }

    /**
    * Rotate
    * @param elem elem to be rotate
    */
    rotate(elem) {
        var axis = this.reader.getString(elem, 'axis');
        var angle = this.reader.getFloat(elem, 'angle'); //receive the angle in degrees
        if(isNaN(angle))
            this.sceneGraph.onXMLError('Transformation Block expected a float number on angle.');
        angle = (angle * Math.PI) / 180; //passes the angle to radians

        if (axis == 'x')
            this.scene.rotate(angle, 1, 0, 0);
        else if (axis == 'y')
            this.scene.rotate(angle, 0, 1, 0);
        else if (axis == 'z')
            this.scene.rotate(angle, 0, 0, 1);
        else console.error("transformations::incorrect axis");
    }

    /**
    * Scale
    * @param elem elem to be scale
    */
    scale(elem) {
      var coords = this.sceneGraph.getCoordinates(elem);
      this.scene.scale(coords[0].x,coords[0].y,coords[0].z);
    }

}
