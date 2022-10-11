precision mediump float;
uniform bool u_IsPOINTS;
varying float v_Alpha;

void main() {
  if(u_IsPOINTS) {
    float dis = distance(gl_PointCoord, vec2(0.5, 0.5));
    if(dis <= 0.5) {
      gl_FragColor = vec4(0.87, 0.91, 1, v_Alpha);
    } else {
      discard;
    }
  } else {
    gl_FragColor = vec4(0.87, 0.91, 1, v_Alpha);
  }

}