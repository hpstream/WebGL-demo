attribute vec4 a_Position;

uniform mat4 u_ProjectionMatrix;
uniform mat4 u_ModelMatrix;


void main() {
  gl_Position = u_ProjectionMatrix*u_ModelMatrix*a_Position; 
}