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
	return true;
};

MyInterface.prototype.onGraphLoaded = function(){
    var group = this.gui.addFolder('Lights');
    group.open();
	var self = this;

	for(key in this.scene.lightsEnabled){
	    var controller = group.add(this.scene.lightsEnabled, key);
	    controller.onChange(function(enable) {
	    	self.scene.updateLight(key, enable);
	    });
	}
}

MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);

  switch (event.keyCode) {
    case 86:
        console.log("Key 'V' pressed... Mudar Vista");
				this.scene.changingToNextCamera();
      break;
    case 118:
        console.log("Key 'v' pressed... Mudar Vista");
				this.scene.changingToNextCamera();
    break;
    default:

  }

};
