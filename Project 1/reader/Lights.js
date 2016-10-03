class Lights {
  constructor(reader, elem) {
    this.reader = reader;
    this.elem = elem;
  }
}

class Omni extends Lights {
  constructor(reader, elem) {
    super(reader, elem);
    console.log("omni constructor");
    console.log(this.reader.getFloat(elem.getElementsByTagName('location')[0],'x'));
  }
}

class Spot extends Lights{
  constructor(reader, elem) {
    super(reader, elem);
    console.log("spot constructor");
  }
}
