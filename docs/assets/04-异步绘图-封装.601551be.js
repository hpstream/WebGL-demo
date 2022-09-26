import"./modulepreload-polyfill.b7f2da20.js";import{i as n}from"./utils.98e3bd0f.js";import{P as a}from"./Ploy.cafb7963.js";var l=`attribute vec4 a_Position;

void main() {
  gl_Position = a_Position;
  gl_PointSize = 10.0;
}`,_=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const r=document.querySelector("#canvas");r.width=window.innerWidth;r.height=window.innerHeight;const e=r.getContext("webgl");let i=n(e,l,_),d=[-.2,-.2],s=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,s);e.bufferData(e.ARRAY_BUFFER,new Float32Array(d),e.STATIC_DRAW);let o=e.getAttribLocation(i,"a_Position");e.vertexAttribPointer(o,2,e.FLOAT,!1,0,0);e.enableVertexAttribArray(o);e.clearColor(0,0,0,1);const t=new a({gl:e,program:i,vertices:[0,.2]});t.draw(["POINTS"]);setTimeout(()=>{t.addVertice(-.2,-.1),e.clear(e.COLOR_BUFFER_BIT),t.draw(["POINTS"])},1e3);setTimeout(()=>{e.clear(e.COLOR_BUFFER_BIT),t.draw(["POINTS","LINE_STRIP"])},2e3);
