class Lights {
    constructor(graph, elem, idLight, i) {
        this.reader = graph.reader;
        this.sceneGraph = graph;
        this.scene = graph.scene;
        this.elem = elem;
        this.id = idLight;
        this.i=i;
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

    setXMLLightOnSceneComponentsRgb(){
      if (this.enabled)
        this.scene.lights[this.i].enable();

      else this.scene.lights[this.i].disable();

      this.scene.lights[this.i].setAmbient(this.ambientElems[0].r,this.ambientElems[0].g, this.ambientElems[0].b, this.ambientElems[0].a);
      this.scene.lights[this.i].setDiffuse(this.diffuseElems[0].r,this.diffuseElems[0].g, this.diffuseElems[0].b, this.diffuseElems[0].a);
      this.scene.lights[this.i].setSpecular(this.specularElems[0].r, this.specularElems[0].g, this.specularElems[0].b, this.specularElems[0].a);
      this.scene.lights[this.i].setVisible(true);

    }

    addLight(){
      this.scene.lightsEnabled.push(this.enabled);
      this.scene.interface.addALight(this.i, this.id);
    }
}

class Omni extends Lights {
    constructor(scene, elem, idLight,i) {
        super(scene, elem, idLight,i);
        super.fillValues();
        this.fillSpecificValues();
        super.setXMLLightOnSceneComponentsRgb();
        this.setXMLLightSpecificValues();
        super.addLight();

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

    setXMLLightSpecificValues(){
      this.scene.lights[this.i].setPosition(this.locationElems[0].x,this.locationElems[0].y,this.locationElems[0].z,this.locationElems[0].w);
    }
}

class Spot extends Lights {
    constructor(scene, elem, idLight,i) {
        super(scene, elem, idLight, i);
        super.fillValues();
        this.fillSpecificValues();
        super.setXMLLightOnSceneComponentsRgb();
        this.setXMLLightSpecificValues();
        super.addLight();
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

    setXMLLightSpecificValues(){
      this.scene.lights[this.i].setSpotCutOff(this.angle);
      this.scene.lights[this.i].setSpotExponent(this.exponent);
      var wElem = 1;
      this.scene.lights[this.i].setPosition(this.locationElems[0].x, this.locationElems[0].y, this.locationElems[0].z, wElem);
      var directionX = this.targetElems[0].x - this.locationElems[0].x;
      var directionY = this.targetElems[0].y - this.locationElems[0].y;
      var directionZ = this.targetElems[0].z - this.locationElems[0].z;
      this.scene.lights[this.i].setSpotDirection(directionX, directionY, directionZ);
    }
}
