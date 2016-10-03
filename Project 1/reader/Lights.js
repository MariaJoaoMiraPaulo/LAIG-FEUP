class Lights {
    constructor(reader, elem) {
        this.reader = reader;
        this.elem = elem;
        this.ambientElems = {};
        this.diffuseElems = {};
        this.specularElems = {};
        this.locationElems = {};
        this.targetElems = {};
    }
    fillValues() {
        this.ambientElems['r'] = this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0],'r');
        this.ambientElems['g'] = this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0],'g');
        this.ambientElems['b'] = this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0],'b');
        this.ambientElems['a'] = this.reader.getFloat(this.elem.getElementsByTagName('ambient')[0],'a');

        this.diffuseElems['r'] = this.reader.getFloat(this.elem.getElementsByTagName('diffuse')[0],'r');
        this.diffuseElems['g'] = this.reader.getFloat(this.elem.getElementsByTagName('diffuse')[0],'g');
        this.diffuseElems['b'] = this.reader.getFloat(this.elem.getElementsByTagName('diffuse')[0],'b');
        this.diffuseElems['a'] = this.reader.getFloat(this.elem.getElementsByTagName('diffuse')[0],'a');

        this.specularElems['r'] = this.reader.getFloat(this.elem.getElementsByTagName('specular')[0],'r');
        this.specularElems['g'] = this.reader.getFloat(this.elem.getElementsByTagName('specular')[0],'g');
        this.specularElems['b'] = this.reader.getFloat(this.elem.getElementsByTagName('specular')[0],'b');
        this.specularElems['a'] = this.reader.getFloat(this.elem.getElementsByTagName('specular')[0],'a');

    }

}

class Omni extends Lights {
    constructor(reader, elem) {
        super(reader, elem);
        console.log("omni constructor");
        super.fillValues();
        this.fillSpecificValues();
        console.log(this.locationElems);
        console.log(this.ambientElems);
        console.log(this.diffuseElems);
        console.log(this.specularElems);

    }
    fillSpecificValues(){
      this.locationElems['x'] = this.reader.getFloat(this.elem.getElementsByTagName('location')[0],'x');
      this.locationElems['y'] = this.reader.getFloat(this.elem.getElementsByTagName('location')[0],'y');
      this.locationElems['z'] = this.reader.getFloat(this.elem.getElementsByTagName('location')[0],'z');
      this.locationElems['w'] = this.reader.getFloat(this.elem.getElementsByTagName('location')[0],'w');
    }
}

class Spot extends Lights {
    constructor(reader, elem) {
        super(reader, elem);
        console.log("spot constructor");
        super.fillValues();
        this.fillSpecificValues();
        console.log(this.targetElems);
        console.log(this.locationElems);
        console.log(this.ambientElems);
        console.log(this.diffuseElems);
        console.log(this.specularElems);

    }

    fillSpecificValues(){
      this.targetElems['x'] = this.reader.getFloat(this.elem.getElementsByTagName('target')[0],'x');
      this.targetElems['y'] = this.reader.getFloat(this.elem.getElementsByTagName('target')[0],'y');
      this.targetElems['z'] = this.reader.getFloat(this.elem.getElementsByTagName('target')[0],'z');

      this.locationElems['x'] = this.reader.getFloat(this.elem.getElementsByTagName('location')[0],'x');
      this.locationElems['y'] = this.reader.getFloat(this.elem.getElementsByTagName('location')[0],'y');
      this.locationElems['z'] = this.reader.getFloat(this.elem.getElementsByTagName('location')[0],'z');
    }
}
