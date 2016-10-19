class Lights {
    constructor(sceneGraph, elem, idLight) {
        this.reader = sceneGraph.reader;
        this.sceneGraph = sceneGraph;
        this.elem = elem;
        this.id = idLight;
        this.ambientElems = [];
        this.diffuseElems = [];
        this.specularElems = [];
        this.locationElems = [];
        this.targetElems = [];
        this.enabled;
        this.angle;
        this.exponent;
    }
    fillValues() {
        this.ambientElems = this.sceneGraph.getRGBA(this.elem.getElementsByTagName('ambient')[0]);
        this.diffuseElems = this.sceneGraph.getRGBA(this.elem.getElementsByTagName('diffuse')[0]);
        this.specularElems = this.sceneGraph.getRGBA(this.elem.getElementsByTagName('specular')[0]);
        this.enabled = this.reader.getBoolean(this.elem,'enabled');
        if(typeof this.enabled != "boolean")
            this.sceneGraph.onXMLError('Lights Block expected a boolean on enabled.');
    }
}

class Omni extends Lights {
    constructor(reader, elem, idLight) {
        super(reader, elem, idLight);
        super.fillValues();
        this.fillSpecificValues();

    }
    fillSpecificValues(){
      this.xElem = this.reader.getFloat(this.elem.getElementsByTagName('location')[0],'x');
      if(isNaN(this.xElem))
          this.sceneGraph.onXMLError('Lights Block expected a float number on location.');
      this.yElem = this.reader.getFloat(this.elem.getElementsByTagName('location')[0],'y');
      if(isNaN(this.yElem))
          this.sceneGraph.onXMLError('Lights Block expected a float number on location.');
      this.zElem= this.reader.getFloat(this.elem.getElementsByTagName('location')[0],'z');
      if(isNaN(this.zElem))
          this.sceneGraph.onXMLError('Lights Block expected a float number on location.');
      this.wElem= this.reader.getFloat(this.elem.getElementsByTagName('location')[0],'w');
      if(isNaN(this.wElem))
          this.sceneGraph.onXMLError('Lights Block expected a float number on location.');
      this.locationElems = [{x: this.xElem, y: this.yElem, z: this.zElem, w: this.wElem }];
      this.angle = null;
      this.exponent = null;
    }
}

class Spot extends Lights {
    constructor(reader, elem, idLight) {
        super(reader, elem, idLight);
        super.fillValues();
        this.fillSpecificValues();
    }

    fillSpecificValues(){
      this.targetElems = this.sceneGraph.getCoordinates(this.elem.getElementsByTagName('target')[0]);
      this.locationElems = this.sceneGraph.getCoordinates(this.elem.getElementsByTagName('location')[0]);
      this.angle = this.reader.getFloat(this.elem,'angle');
      if(isNaN(this.angle))
          this.sceneGraph.onXMLError('Lights Block expected a float number on angle.');
      this.exponent = this.reader.getFloat(this.elem,'exponent');
      if(isNaN(this.exponent))
          this.sceneGraph.onXMLError('Lights Block expected a float number on exponent.');
    }
}
