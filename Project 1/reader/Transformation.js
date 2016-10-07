class Transformation {
    constructor(scene, reader, element) {
        this.scene = scene;
        this.reader = reader;
        this.element = element;
        this.matrix;
        this.makingMatrix();
    }

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

    translate(elem) {
        var x = this.reader.getFloat(elem, 'x');
        var y = this.reader.getFloat(elem, 'y');
        var z = this.reader.getFloat(elem, 'z');

        this.scene.translate(x, y, z);

    }

    rotate(elem) {
        var axis = this.reader.getString(elem, 'axis');
        var angle = this.reader.getFloat(elem, 'angle'); //receive the angle in degrees
        angle = (angle * Math.PI) / 180; //passes the angle to radians

        if (axis == 'x')
            this.scene.rotate(angle, 1, 0, 0);
        else if (axis == 'y')
            this.scene.rotate(angle, 0, 1, 0);
        else if (axis == 'z')
            this.scene.rotate(angle, 0, 0, 1);
        else console.error("transformations::incorrect axis");
    }

    scale(elem) {
        var x = this.reader.getFloat(elem, 'x');
        var y = this.reader.getFloat(elem, 'y');
        var z = this.reader.getFloat(elem, 'z');

        this.scene.scale(x, y, z);
    }

}
