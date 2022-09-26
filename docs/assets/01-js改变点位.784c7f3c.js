import"./modulepreload-polyfill.b7f2da20.js";import{i as n}from"./utils.98e3bd0f.js";var o=`attribute vec4 a_Position;

void main() {
  gl_Position = a_Position;
  gl_PointSize = 50.0;
}`,e=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const i=document.querySelector("#canvas");i.width=window.innerWidth;i.height=window.innerHeight;const t=i.getContext("webgl");let r=n(t,o,e);t.clearColor(0,0,0,1);t.clear(t.COLOR_BUFFER_BIT);let a=t.getAttribLocation(r,"a_Position");t.vertexAttrib2f(a,.1,.1);t.drawArrays(t.POINTS,0,1);
