import"./modulepreload-polyfill.b7f2da20.js";import{i}from"./utils.98e3bd0f.js";var n=`attribute vec4 a_Position;

void main() {
  gl_Position = a_Position;
  gl_PointSize = 10.0;
}`,o=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const t=document.querySelector("#canvas");t.width=window.innerWidth;t.height=window.innerHeight;const e=t.getContext("webgl");let _=i(e,n,o),r=[-.2,-.2],l=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,l);e.bufferData(e.ARRAY_BUFFER,new Float32Array(r),e.STATIC_DRAW);let a=e.getAttribLocation(_,"a_Position");e.vertexAttribPointer(a,2,e.FLOAT,!1,0,0);e.enableVertexAttribArray(a);e.clearColor(0,0,0,1);e.clear(e.COLOR_BUFFER_BIT);e.drawArrays(e.POINTS,0,1);setTimeout(()=>{r.push(.2,.2),e.bufferData(e.ARRAY_BUFFER,new Float32Array(r),e.STATIC_DRAW),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.POINTS,0,2)},1e3);setTimeout(()=>{e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.POINTS,0,2),e.drawArrays(e.LINE_STRIP,0,2)},2e3);
