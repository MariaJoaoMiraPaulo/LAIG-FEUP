class Component {
  constructor(scene, reader, element, graph) {
    this.scene = scene;
    this.reader = reader;
    this.element = element;
    this.graph = graph;

    this.transformationId;
    this.transformationMatrix;
    this.primitivesRefIds = []; //guard the primitive ids
    this.materialsRefIds = [];
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
      let trans = new Transformation(this.graph, transElem);
      this.transformationMatrix = trans.matrix;
    }
  }

  readingMaterials(materialElem){
    //Declaração obrigatoria de pelo menos um material
    var materials = materialElem.getElementsByTagName('material');
    if(materials.length == 0)
      this.graph.onXMLError("components:: it must have at least one material block.");

    for( let material of materials){
      var id = this.reader.getString(material,'id');
      this.materialsRefIds.push(id);
    }
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
    this.scene.pushMatrix();
    this.scene.multMatrix(this.transformationMatrix);

    for(let id of this.primitivesRefIds){
      this.graph.primitives[id].display();
    }

    this.scene.popMatrix();
  }

}
