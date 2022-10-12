attribute vec4 a_Position;
uniform mat4 u_Matrix;
uniform mat4 u_ViewMatrix;

void main() {

  gl_Position = u_ViewMatrix * u_Matrix * a_Position;
  gl_PointSize = 20.0;
}