function MiddleNode(name, id) {

  if (typeof name == 'undefined')
      this.name = "default";
  else
      this.name = name;

  if(typeof id == 'undefined')
      this.id = -1;
  else
      this.id=id;

  this.children = [];

};
