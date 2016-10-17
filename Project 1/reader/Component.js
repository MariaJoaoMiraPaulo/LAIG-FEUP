class Component {
    constructor(scene, reader, element, graph) {
        this.scene = scene;
        this.reader = reader;
        this.element = element;
        this.graph = graph;

        this.transformationId;
        this.transformationMatrix;

        this.cgfMaterials = [];
        this.cgfMaterialId;
        this.cgfMaterial;
        this.nextMaterial = 0;

        this.cgfTexture;
        this.cgfTextureId;

        this.componentsRefId = [];
        this.childrens = [];
        this.parentMaterial = null;
        this.parentTexture = null;
        this.readingComponent();
    }

    readingComponent() {
        this.readingCompTrans(this.element.getElementsByTagName('transformation')[0]);
        this.readingTextures(this.element.getElementsByTagName('texture')[0]);
        this.readingMaterials(this.element.getElementsByTagName('materials')[0]);
        this.readingChildrens(this.element.getElementsByTagName('children')[0]);
    }

    readingCompTrans(transElem) {
        //now we have to see if we heave transformationref
        //or the translates, rotates and scales
        var transRef = transElem.getElementsByTagName('transformationref');

        if (transRef.length == 1) {
            this.transformationId = this.reader.getString(transRef[0], 'id');
            this.transformationMatrix = this.graph.transformations[this.transformationId];
        } else if (transRef.length == 0) {
            let trans = new Transformation(this.graph, transElem);
            this.transformationMatrix = trans.matrix;
        }
    }

    readingMaterials(materialElem) {
        var materials = materialElem.getElementsByTagName('material');
        if (materials.length == 0)
            this.graph.onXMLError("components:: it must have at least one material block.");

        let i = 0;
        for (let material of materials) {
            var id = this.reader.getString(material, 'id');

            switch (id) {
                case 'inherit':
                    this.cgfMaterialId = "inherit";
                    break;
                case 'none':
                    this.cgfMaterial = null;
                    break;
                default:
                    if (this.graph.materials[id] == 'undefined')
                        this.graph.onXMLError("components:: it doens't exist any material with that id.");
                    else {
                        if (i == 0) {
                            this.cgfMaterial = this.graph.materials[id];
                            i++
                        }
                        this.cgfMaterials.push(this.graph.materials[id]);
                    }
            }
        }
    }

    readingTextures(textureElem) {
        //FIXME: cgftexture e parentTexture ou só uma variavel de textura?
        if (textureElem == null)
            this.graph.onXMLError("components:: it must have one texture block.");

        var id = this.reader.getString(textureElem, 'id');
        this.cgfTextureId = id;
        switch (id) {
            case 'inherit':
                //  this.cgfTexture = this.parentTexture;
                break;
            case 'none':
                this.cgfTexture = null;
                break;
            default:
                if (this.graph.textures[id] == 'undefined')
                    this.graph.onXMLError("components:: it doens't exist any texture with that id.");
                else this.cgfTexture = this.graph.textures[id];
        }

    }

    readingChildrens(childrenElem) {
        //taking care of componentref
        var components = childrenElem.getElementsByTagName('componentref');

        for (let component of components) {
            this.componentsRefId.push(this.reader.getString(component, 'id'));
        }

        var primitives = childrenElem.getElementsByTagName('primitiveref');

        for (let primitive of primitives) {
            if (typeof this.graph.primitives[this.reader.getString(primitive, 'id')] == 'undefined') {
                this.graph.onXMLError("components:: it doens't have any primitive with that id");
            }
            this.childrens.push(this.graph.primitives[this.reader.getString(primitive, 'id')]);
        }

    }

    conectingChildrens() {

        for (let componentRefId of this.componentsRefId) {
            if (typeof this.graph.components[componentRefId] == 'undefined') {
                console.log(componentRefId);
                console.log(this.graph.components[componentRefId]);
                this.graph.onXMLError("components:: it doens't have any component with that id");
            } else {
                this.childrens.push(this.graph.components[componentRefId]);
            }
        }
    }

  /*  addingInheritStuff() {
        for (let children of this.childrens) {
            if (children.cgfTextureId == "inherit") {
                children.cgfTexture = this.cgfTexture;
            }
            if (children.cgfMaterialId == "inherit") {
                children.cgfMaterial = this.cgfMaterial;
            }

            if ( children instanceof Component){
                children.addingInheritStuff();
                console.log(children);
              }
        }
    }*/

    display() {
        this.scene.pushMatrix();
        this.scene.multMatrix(this.transformationMatrix);
        if (this.cgfTexture != 'undefined' && this.cgfMaterial != null)
            this.cgfMaterial.setTexture(this.cgfTexture);
        if (this.cgfMaterial != null)
            this.cgfMaterial.apply();

        for (let children of this.childrens) {
           if (children.cgfTextureId == "inherit") {
                children.cgfTexture = this.cgfTexture;
            }
            if (children.cgfMaterialId == "inherit") {
                children.cgfMaterial = this.cgfMaterial;
            }
            children.display();
        }

        this.scene.popMatrix();
    }

}
