attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float du;
uniform float dv;

uniform float su;
uniform float sv;

uniform float normScale;

varying float divU;
varying float divV;

varying float posUs;
varying float posVs;

varying vec2 vTextureCoord;

void main() {

	divU = du;
	divV = dv;
	posUs = su;
	posVs = sv;
	vTextureCoord = aTextureCoord;

	vec2 pos = floor(vec2( du * vTextureCoord.x, dv * vTextureCoord.y));

	float scale;

	if(pos.x == su && pos.y == sv){
		scale = normScale;
	}
	else {
		scale = 0.0;
	}

	  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+aVertexNormal*scale*0.1, 1.0);
}
