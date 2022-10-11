precision mediump float;

uniform bool u_IsPOINTS;

void main() {
  if(u_IsPOINTS) {
    float dis = distance(gl_PointCoord, vec2(0.5, 0.5));
    if(dis <= 0.5) {
      gl_FragColor = vec4(1, 1, 0, 1);

    } else {
      discard;
    }
  } else {
    gl_FragColor = vec4(1, 1, 0, 1);
  }

}