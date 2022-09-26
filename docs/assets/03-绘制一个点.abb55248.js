import"./modulepreload-polyfill.b7f2da20.js";import{i as r}from"./utils.98e3bd0f.js";var i=`void main() {

  gl_Position = vec4(0, 0, 0, 1);
  gl_PointSize = 50.0;
}`,o=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const e=document.querySelector("#canvas");e.width=window.innerWidth;e.height=window.innerHeight;const n=e.getContext("webgl");r(n,i,o);n.clearColor(0,0,0,1);n.clear(n.COLOR_BUFFER_BIT);n.drawArrays(n.POINTS,0,1);
