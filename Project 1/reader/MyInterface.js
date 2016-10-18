function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();
  this.group = this.gui.addFolder('Lights');
  this.group.open();

	return true;
};

MyInterface.prototype.addALight = function(i, id){
	    this.group.add(this.scene.lightsEnabled,i, this.scene.lightsEnabled[i]).name(id);
}

MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);

  switch (event.keyCode) {
    case 86:
				this.scene.changingToNextCamera();
      break;
    case 118:
				this.scene.changingToNextCamera();
    break;
		case 109:
				this.scene.changingToNextMaterial();
    break;
		case 77:
				this.scene.changingToNextMaterial();
    break;
    default:

  }

};
