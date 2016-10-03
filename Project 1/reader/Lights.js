class Lights {
  constructor(reader, locationElem, ambient, diffuse, specular) {
    this.reader = reader;
    this.locationElem = locationElem;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;

  //  console.log("Lights:"+this.reader);
  //  console.log(this.locationElem);
  //  console.log(this.reader.getFloat(this.locationElem[0],'x'));

  }
}

class Omni extends Lights {
  constructor(reader, location, ambient, diffuse, specular) {
    super(reader, location, ambient, diffuse, specular);
    console.log("omni constructor");
  }
}

class Spot extends Lights{
  constructor(reader, target,location, ambient, diffuse, specular) {
    super(reader, location, ambient, diffuse, specular);
    this.target=target;
    console.log("spot constructor");
  }
}
