precision mediump float;
uniform sampler2D u_Sampler;
varying vec3 v_Color;
void main() {
  // vec4 o = texture2D(u_Sampler, v_Pin);
  gl_FragColor = vec4(v_Color.x,v_Color.y,v_Color.z,1.0);
  
}