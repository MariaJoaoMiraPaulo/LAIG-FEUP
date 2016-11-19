/**
 * Chessboard
 * @param scene CGFscene where the Rectangle will be displayed
 * @constructor
 */
function Chessboard(scene, du, dv, texture, su, sv, c1, c2, cs) {
    CGFobject.call(this, scene);

    this.scene = scene;

    this.du = du;
    this.dv = dv;

    this.texture = texture;
    this.su = su;
    this.sv = sv;

    this.c1 = c1;
    this.c2 = c2;
    this.cs = cs;

    this.board = new Plane(this.scene, 1, 1, du, dv);

    this.appearance = new CGFappearance(this.scene);
    this.appearance.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.appearance.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.appearance.setShininess(100);

    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT','REPEAT');

    this.shader = new CGFshader(this.scene.gl, 'shaders/Chessboard.vert', 'shaders/Chessboard.frag');

    this.shader.setUniformsValues({
        du: this.du
    });
    this.shader.setUniformsValues({
        dv: this.dv
    });

    this.shader.setUniformsValues({
        color1: this.c1
    });
    this.shader.setUniformsValues({
        color2: this.c2
    });
    this.shader.setUniformsValues({
        colorS: this.cs
    });

};

Chessboard.prototype = Object.create(CGFobject.prototype);
Chessboard.prototype.constructor = Chessboard;

/**
 * Function to display the chessboard
 */
Chessboard.prototype.display = function() {

/*    this.appearance.apply();
    this.scene.setActiveShader(this.shader);
    this.texture.bind(1);*/
    this.board.display();
  /*  this.texture.unbind();
    this.scene.setActiveShader(this.scene.defaultShader);*/

}

Chessboard.prototype.updateTexCoords = function(s, t) {

}
