attribute vec4 a_Position;

attribute vec3 a_Color;
varying vec3 v_Color;
uniform mat4 u_ModelMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjectMatrix;

void main() {

  gl_Position = u_ProjectMatrix * u_ViewMatrix *u_ModelMatrix * a_Position;
  v_Color = a_Color;
}