attribute vec4 a_Position;
attribute vec2 a_Pin;
uniform mat4 u_PvMatrix;
uniform mat4 u_ModelMatrix;
varying vec2 v_Pin;
void main() {
  gl_Position = u_PvMatrix * u_ModelMatrix * a_Position;
  v_Pin = a_Pin;
}