class Lights {
    constructor(reader, elem) {
        this.reader = reader;
        this.elem = elem;
    }
    fillValues() {
        console.log("ola");
        console.log(this.reader.getFloat(this.elem.getElementsByTagName('location')[0], 'x'));
    }

}

class Omni extends Lights {
    constructor(reader, elem) {
        super(reader, elem);
        console.log("omni constructor");
        super.fillValues();

    }
}

class Spot extends Lights {
    constructor(reader, elem) {
        super(reader, elem);
        console.log("spot constructor");
        super.fillValues();
    }
}
