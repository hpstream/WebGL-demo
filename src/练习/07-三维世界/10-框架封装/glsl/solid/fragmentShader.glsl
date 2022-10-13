precision mediump float;
uniform float u_Time;
void main() {
  float r = (sin(u_Time / 200.0) + 1.0) / 2.0;
  gl_FragColor = vec4(r, 0.7, 0.4, 1);
}