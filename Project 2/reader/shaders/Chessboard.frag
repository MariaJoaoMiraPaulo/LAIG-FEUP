#ifdef GL_ES
precision highp float;
#endif

uniform float r1;
uniform float g1;
uniform float b1;
uniform float a1;
uniform float r2;
uniform float g2;
uniform float b2;
uniform float a2;
uniform float rs;
uniform float gs;
uniform float bs;
uniform float as;

uniform float du;
uniform float dv;

varying float divU;
varying float divV;

uniform sampler2D uSampler;

varying vec2 vTextureCoord;

void main() {
  vec4 color1 = vec4(r1,g1,b1,a1);
  vec4 color2 = vec4(r2,g2,b2,a2);
  vec4 colors = vec4(rs,gs,bs,as);
  vec4 color;

  vec2 pos = vec2( floor(divU * vTextureCoord.x), floor(divV * vTextureCoord.y));


  vec2 ret = mod(pos,2.0);

  if(ret.x==0.0 && ret.y==0.0)
    color = color1;
  else if(ret.x==0.0 && ret.y==1.0)
    color = color2;
  else if(ret.x==1.0 && ret.y==1.0)
    color = color1;
  else if(ret.x==1.0 && ret.y==0.0)
   color = color2;

  vec4 textureColor = texture2D(uSampler, vTextureCoord);
  gl_FragColor = textureColor*color;
}
