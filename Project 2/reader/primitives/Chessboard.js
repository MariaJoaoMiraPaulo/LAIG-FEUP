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

    this.material = new CGFappearance(this.scene);
    this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.material.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.material.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.material.setShininess(100);

    this.material.setTexture(this.texture);
    this.material.setTextureWrap('REPEAT','REPEAT');

    this.shader = new CGFshader(this.scene.gl, 'shaders/Chessboard.vert', 'shaders/Chessboard.frag');

    this.shader.setUniformsValues({
        du: this.du
    });
    this.shader.setUniformsValues({
        dv: this.dv
    });
    this.shader.setUniformsValues({
        r1: this.c1[0]
    });
    this.shader.setUniformsValues({
        g1: this.c1[1]
    });
    this.shader.setUniformsValues({
        b1: this.c1[2]
    });
    this.shader.setUniformsValues({
        a1: this.c1[3]
    });
    this.shader.setUniformsValues({
        r2: this.c2[0]
    });

    this.shader.setUniformsValues({
        g2: this.c2[1]
    });

    this.shader.setUniformsValues({
        b2: this.c2[2]
    });

    this.shader.setUniformsValues({
        a2: this.c2[3]
    });
    this.shader.setUniformsValues({
        rs: this.cs[0]
    });

    this.shader.setUniformsValues({
        gs: this.cs[1]
    });

    this.shader.setUniformsValues({
        bs: this.cs[2]
    });

    this.shader.setUniformsValues({
        as: this.cs[3]
    });
    this.shader.setUniformsValues({
      uSampler: 2
    })


};

Chessboard.prototype = Object.create(CGFobject.prototype);
Chessboard.prototype.constructor = Chessboard;

/**
 * Function to display the chessboard
 */
Chessboard.prototype.display = function() {

    this.material.apply();
    this.scene.setActiveShader(this.shader);
    this.texture.bind(2);
    this.board.display();
    this.texture.unbind();
    this.scene.setActiveShader(this.scene.defaultShader);
    console.log(this.scene.defaultShader);

}

Chessboard.prototype.updateTexCoords = function(s, t) {

}
