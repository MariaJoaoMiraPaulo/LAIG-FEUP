class Texture {
    constructor(scene, reader, newElement) {
        this.scene = scene;
        this.reader = reader;
        this.newElement = newElement;
        var file;
        var length_s;
        var length_t;
        this.fillValues();
    }

    fillValues() {
      this.file = this.reader.getString(this.newElement,'file');
      this.length_s = this.reader.getString(this.newElement,'length_s');
      this.length_t = this.reader.getString(this.newElement,'length_t');
    }
}
