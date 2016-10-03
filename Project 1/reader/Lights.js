class Lights {
    constructor(reader, elem) {
        this.reader = reader;
        this.elem = elem;
        this.ambientElems = [];
    }
    fillValues() {
        this.ambientElems.push({"r" : this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0], 'r') });
        this.ambientElems.push({"g" : this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0], 'g') });
        this.ambientElems.push({"b" : this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0], 'b') });
        this.ambientElems.push({"a" : this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0], 'a') });
        console.log(this.ambientElems);
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
  //  var target = [];
    constructor(reader, elem) {
        super(reader, elem);
        console.log("spot constructor");
        super.fillValues();
    }
}
