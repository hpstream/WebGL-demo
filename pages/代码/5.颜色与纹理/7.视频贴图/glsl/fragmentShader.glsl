precision mediump float;
uniform sampler2D u_Sampler;
varying vec2 v_Pin;
void main() {
  vec4 o = texture2D(u_Sampler, v_Pin);
  gl_FragColor = o;
  
}