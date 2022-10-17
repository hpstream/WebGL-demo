precision mediump float;
uniform sampler2D u_Sampler;
uniform sampler2D u_Pattern1;
uniform sampler2D u_Pattern2;
uniform sampler2D u_Mask;
uniform float u_Ratio;
varying vec2 v_Pin;
void main() {
  vec4 o = texture2D(u_Sampler, v_Pin);
  vec4 p1 = texture2D(u_Pattern1, v_Pin);
  vec4 p2 = texture2D(u_Pattern2, v_Pin);
  vec4 m = texture2D(u_Mask, v_Pin);
  vec4 p3 = vec4(1, 1, 1, 1);
  if(m.x > 0.5) {
    p3 = mix(p1, p2, u_Ratio);

  }
  
  gl_FragColor = p3 * o;
  

}