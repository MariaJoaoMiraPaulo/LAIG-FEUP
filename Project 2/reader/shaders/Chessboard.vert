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
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	vTextureCoord = aTextureCoord;
}
