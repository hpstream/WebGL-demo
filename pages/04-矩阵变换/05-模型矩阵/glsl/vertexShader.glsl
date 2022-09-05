attribute vec4 a_Position;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ModelMatrix;
void main() {
  gl_Position = u_ViewMatrix * u_ModelMatrix * a_Position;
}