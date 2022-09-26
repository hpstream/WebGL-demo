import"./modulepreload-polyfill.b7f2da20.js";import{i}from"./utils.98e3bd0f.js";var n=`attribute vec4 a_Position;

void main() {
  gl_Position = a_Position;
  gl_PointSize = 10.0;
}`,a=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const t=document.querySelector("#canvas");t.width=window.innerWidth;t.height=window.innerHeight;const e=t.getContext("webgl");let o=i(e,n,a),l=new Float32Array([-.2,.2,-.2,-.2,.2,.2,.2,.2,-.2,-.2,.2,-.2]),_=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,_);e.bufferData(e.ARRAY_BUFFER,l,e.STATIC_DRAW);let r=e.getAttribLocation(o,"a_Position");e.vertexAttribPointer(r,2,e.FLOAT,!1,0,0);e.enableVertexAttribArray(r);e.clearColor(0,0,0,1);e.clear(e.COLOR_BUFFER_BIT);e.drawArrays(e.TRIANGLES,0,6);
