class Material {
    constructor(scene, reader, newElement) {

        this.scene = scene;
        this.reader = reader;
        this.newElement = newElement;
        this.emission = {};
        this.ambient = {};
        this.diffuse = {};
        this.specular = {};

        this.emission['r'] = this.reader.getFloat(this.newElement.getElementsByTagName('emission')[0],'r');
        this.emission['g'] = this.reader.getFloat(this.newElement.getElementsByTagName('emission')[0],'g');
        this.emission['b'] = this.reader.getFloat(this.newElement.getElementsByTagName('emission')[0],'b');
        this.emission['a'] = this.reader.getFloat(this.newElement.getElementsByTagName('emission')[0],'a');

        this.ambient['r'] = this.reader.getFloat(this.newElement.getElementsByTagName('ambient')[0],'r');
        this.ambient['g'] = this.reader.getFloat(this.newElement.getElementsByTagName('ambient')[0],'g');
        this.ambient['b'] = this.reader.getFloat(this.newElement.getElementsByTagName('ambient')[0],'b');
        this.ambient['a'] = this.reader.getFloat(this.newElement.getElementsByTagName('ambient')[0],'a');

        this.diffuse['r'] = this.reader.getFloat(this.newElement.getElementsByTagName('diffuse')[0],'r');
        this.diffuse['g'] = this.reader.getFloat(this.newElement.getElementsByTagName('diffuse')[0],'g');
        this.diffuse['b'] = this.reader.getFloat(this.newElement.getElementsByTagName('diffuse')[0],'b');
        this.diffuse['a'] = this.reader.getFloat(this.newElement.getElementsByTagName('diffuse')[0],'a');

        this.specular['r'] = this.reader.getFloat(this.newElement.getElementsByTagName('specular')[0],'r');
        this.specular['g'] = this.reader.getFloat(this.newElement.getElementsByTagName('specular')[0],'g');
        this.specular['b'] = this.reader.getFloat(this.newElement.getElementsByTagName('specular')[0],'b');
        this.specular['a'] = this.reader.getFloat(this.newElement.getElementsByTagName('specular')[0],'a');

        this.shininess = this.reader.getFloat(this.newElement.getElementsByTagName('shininess')[0], 'value');

        }
    }
