 /**
  * Represents scene component to be read
  * @param scene CGFscene where the component will be displayed
  * @param reader CGFXMLreader
  * @param newElement component to be read
  * @param graph scene graph
  * @constructor
  */
class Component {
    constructor(scene, reader, element, graph) {
        this.scene = scene;
        this.reader = reader;
        this.element = element;
        this.graph = graph;

        this.transformationMatrix;

        this.cgfMaterials = [];
        this.cgfMaterialId;
        this.cgfMaterial;
        this.nextMaterial = 0;

        this.cgfTexture;
        this.length_sTexture;
        this.length_tTexture;
        this.cgfTextureId;

        this.componentsRefId = [];
        this.childrens = [];
        this.readingComponent();
    }

  /*
 * Reads the component's transformation tag, texture tag, material tag and children
 */
    readingComponent() {
        this.readingCompTrans(this.element.getElementsByTagName('transformation')[0]);
        this.readingTextures(this.element.getElementsByTagName('texture')[0]);
        this.readingMaterials(this.element.getElementsByTagName('materials')[0]);
        this.readingChildren(this.element.getElementsByTagName('children')[0]);
    }

    /*
   * Reads the component's transformation tag
   */
    readingCompTrans(transElem) {
        //now we have to see if we heave transformationref
        //or the translates, rotates and scales
        var transRef = transElem.getElementsByTagName('transformationref');

        if (transRef.length == 1) {
            let id = this.reader.getString(transRef[0], 'id');
            this.transformationMatrix = this.graph.transformations[id];
        } else if (transRef.length == 0) {
            // creating component transformation matrix
            let trans = new Transformation(this.graph, transElem);
            this.transformationMatrix = trans.matrix;
        } else {
            this.graph.onXMLError("components:: Only can exist one transformationref tag.");
        }
    }

    /*
   * Reads the component's material tag
   */
    readingMaterials(materialElem) {
        var materials = materialElem.getElementsByTagName('material');
        if (materials.length == 0)
            this.graph.onXMLError("components:: it must have at least one material block.");

        let i = 0;
        for (let material of materials) {
            var id = this.reader.getString(material, 'id');
            if (id == "inherit") {
                this.cgfMaterialId = "inherit";
                break;
            } else if (typeof this.graph.materials[id] == 'undefined')
                this.graph.onXMLError("components:: it doens't exist any material with that id, " + id + ".");
            else {
                if (i == 0) {
                    this.cgfMaterial = this.graph.materials[id];
                    i++
                }
                this.cgfMaterials.push(this.graph.materials[id]);
            }
        }
    }

    /*
   * Reads the component's texture tag
   */
    readingTextures(textureElem) {

        if (textureElem == null)
            this.graph.onXMLError("components:: it must have one texture block.");

        var id = this.reader.getString(textureElem, 'id');
        this.cgfTextureId = id;

        if (id == "inherit") {
            this.cgfTexture = null;
        } else if (id == "none") {
            this.cgfTexture = null;
        } else if (id != "inherit" && id != "none") {
            if (typeof this.graph.textures[id] == 'undefined')
                this.graph.onXMLError("components:: it doens't exist any texture with that id, " + id + ".");
            else{
                this.cgfTexture = this.graph.textures[id][0].texture;
                this.length_sTexture =  this.graph.textures[id][0].length_s;
                this.length_tTexture = this.graph.textures[id][0].length_t;
            }


        }

    }

    /*
   * Reads the component's children. Adds component's primitives children to the graph scene.
   */
    readingChildren(childrenElem) {
        //taking care of componentref
        var components = childrenElem.getElementsByTagName('componentref');

        for (let component of components) {
            this.componentsRefId.push(this.reader.getString(component, 'id'));
        }

        var primitives = childrenElem.getElementsByTagName('primitiveref');

        for (let primitive of primitives) {
            let id = this.reader.getString(primitive, 'id');
            if (typeof this.graph.primitives[id] == 'undefined') {
                this.graph.onXMLError("components:: it doens't have any primitive with that id, " + id + ".");
            }
            this.childrens.push(this.graph.primitives[this.reader.getString(primitive, 'id')]);
        }

    }

    /*
   * Reads the component's children. Adds component's components children to the graph scene.
   */
    conectingChildrens() {

        for (let componentRefId of this.componentsRefId) {
            if (typeof this.graph.components[componentRefId] == 'undefined') {
                this.graph.onXMLError("components:: it doens't have any component with that id, " + componentRefId + ".");
            } else {
                this.childrens.push(this.graph.components[componentRefId]);
            }
        }
    }

  /**
  * Depth-first display of components.
  */
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
            if(!(children instanceof Component)){
        /*      let wrapS = 'CLAMP_TO_EDGE';
              let wrapT = 'CLAMP_TO_EDGE';

              if(this.length_sTexture < 1)
              {
                wrapS = 'REPEAT';
              }
              if(this.length_tTexture < 1)
              {
                wrapT = 'REPEAT';
              }

              this.cgfMaterial.setTextureWrap(wrapS, wrapT);
              this.cgfMaterial.apply();
              
              children.updateTexCoords(this.length_sTexture,this.length_tTexture);*/
            }
            children.display();
        }

        this.scene.popMatrix();
    }

}
