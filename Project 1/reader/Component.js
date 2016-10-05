class Component {
  constructor(scene, reader, element, graph) {
    this.scene = scene;
    this.reader = reader;
    this.element = element;
    this.graph = graph;

    this.transformationId;
    this.transformationMatrix;
    this.primitivesRefIds = []; //guard the primitive ids
    this.readingComponent();
  }

  readingComponent(){
    this.readingCompTrans(this.element.getElementsByTagName('transformation')[0]);
    this.readingMaterials(this.element.getElementsByTagName('materials')[0]);
    this.readingTextures(this.element.getElementsByTagName('texture')[0]);
    this.readingChildrens(this.element.getElementsByTagName('children')[0]);
  }

  readingCompTrans(transElem){
    console.log(transElem.children.length);

    //now we have to see if we heave transformationref
    //or the translates, rotates and scales
    var transRef = transElem.getElementsByTagName('transformationref');

    if(transRef.length == 1){
      this.transformationId = this.reader.getString(transRef[0], 'id');
    }
    else if(transRef.length == 0){
      let trans = new Transformation(this.scene, this.reader, transElem);
      this.transformationMatrix = trans.matrix;
    }
  }

  readingMaterials(materialElem){

  }

  readingTextures(textureElem){

  }

  readingChildrens(childrenElem){
    console.log(childrenElem.tagName);

    //taking care of componentref

    var primitives = childrenElem.getElementsByTagName('primitiveref');

    for(let primitive of primitives){
      this.primitivesRefIds.push(this.reader.getString(primitive, 'id'));
    }

  }

  display(){

    console.log(this.primitivesRefIds);

    for(let id of this.primitivesRefIds){
      this.graph.primitives[id].display();
    }
  }

}
