attribute vec4 a_Position;

uniform mat4 u_ProjectionMatrix;


void main() {
  gl_Position = u_ProjectionMatrix*a_Position; 
}