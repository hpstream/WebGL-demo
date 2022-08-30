precision mediump float;

uniform vec4 u_FragColor;

void main() {
  float dis = distance(gl_PointCoord, vec2(0.5,0.5)) ;
  
  if(dis <= 0.5) {
    gl_FragColor = u_FragColor;
  }else{
    discard;
  }

}