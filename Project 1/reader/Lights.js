class Lights {
    constructor(reader, elem) {
        this.reader = reader;
        this.elem = elem;
        this.ambientElems = [];
    }
    fillValues() {
        this.ambientElems[0] = this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0],'r');
        this.ambientElems[1] = this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0],'g');
        this.ambientElems[2] = this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0],'b');
        this.ambientElems[3] = this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0],'a');
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
