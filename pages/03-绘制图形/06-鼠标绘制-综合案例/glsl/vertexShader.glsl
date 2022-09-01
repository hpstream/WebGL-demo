attribute vec4 a_Attr;
varying float v_Alpha;

void main() {
  gl_Position = vec4(a_Attr.x, a_Attr.y, 0.0, 1.0);
  gl_PointSize = a_Attr.z;
  v_Alpha = a_Attr.w;
}