class Component {
    constructor(scene, reader, element, graph) {
        this.scene = scene;
        this.reader = reader;
        this.element = element;
        this.graph = graph;

        this.transformationId;
        this.transformationMatrix;
        this.materialsRefIds = [];
        this.cgfMaterials = [];
        this.componentsRefId = [];
        this.childrens = [];
        this.parentMaterial = null;
        this.readingComponent();
    }

    readingComponent() {
        this.readingCompTrans(this.element.getElementsByTagName('transformation')[0]);
        this.readingMaterials(this.element.getElementsByTagName('materials')[0]);
        this.readingTextures(this.element.getElementsByTagName('texture')[0]);
        this.readingChildrens(this.element.getElementsByTagName('children')[0]);
    }

    readingCompTrans(transElem) {
        //now we have to see if we heave transformationref
        //or the translates, rotates and scales
        var transRef = transElem.getElementsByTagName('transformationref');

        if (transRef.length == 1) {
            this.transformationId = this.reader.getString(transRef[0], 'id');
        } else if (transRef.length == 0) {
            let trans = new Transformation(this.graph, transElem);
            this.transformationMatrix = trans.matrix;
        }
    }

    readingMaterials(materialElem) {
        var materials = materialElem.getElementsByTagName('material');
        if (materials.length == 0)
            this.graph.onXMLError("components:: it must have at least one material block.");

        for (let material of materials) {
            var id = this.reader.getString(material, 'id');
            console.log("id" + id);
            this.cgfMaterials.push(this.graph.materials[id]);
          //  this.materialsRefIds.push(id);
            //console.log(this.graph.materials['1']);
            //this.CGFmaterials.push(this.scene.materials[id]);
        }
    }

    readingTextures(textureElem) {

    }

    readingChildrens(childrenElem) {
        //taking care of componentref
        var components = childrenElem.getElementsByTagName('componentref');

        for (let component of components) {
            this.componentsRefId.push(this.reader.getString(component, 'id'));
        }

        var primitives = childrenElem.getElementsByTagName('primitiveref');

        for (let primitive of primitives) {
            if (typeof this.graph.primitives[this.reader.getString(primitive, 'id')] == 'undefined')
                this.graph.onXMLError("components:: it doens't have any primitive with that id");
            this.childrens.push(this.graph.primitives[this.reader.getString(primitive, 'id')]);
        }

    }

    conectingChildrens(){
      for(let componentRefId of this.componentsRefId){
        if (typeof this.graph.components[componentRefId] == 'undefined')
                   this.graph.onXMLError("components:: it doens't have any component with that id");
               else {
                   //Cada nó recebe propriedades de aspeto do seu antecessor. Adicionando material do Pai ao filho
                   this.graph.components[componentRefId].parentMaterial = this.materialsRefIds[0];
                   this.childrens.push(this.graph.components[componentRefId]);
               }
      }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.multMatrix(this.transformationMatrix);
        this.cgfMaterials[0].apply();

        for (let children of this.childrens) {
            children.display();
        }

        this.scene.popMatrix();
    }

}
