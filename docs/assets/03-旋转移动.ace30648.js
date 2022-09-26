import"./modulepreload-polyfill.b7f2da20.js";import{i as l}from"./utils.98e3bd0f.js";import{M as r}from"./vendor.36f02d62.js";var m=`attribute vec4 a_Position;
// \u5217\u4E3B\u5E8F
uniform mat4 u_Matrix;

void main() {
  gl_Position = u_Matrix * a_Position;
  // gl_PointSize = 10.0;
}`,s=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const e=document.querySelector("#canvas");e.width=window.innerWidth;e.height=window.innerHeight;const t=e.getContext("webgl");let i=l(t,m,s),_=new Float32Array([-.2,.2,-.2,-.2,.2,.2,.2,-.2]),c=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,c);t.bufferData(t.ARRAY_BUFFER,_,t.STATIC_DRAW);const n=t.getAttribLocation(i,"a_Position");t.vertexAttribPointer(n,2,t.FLOAT,!1,0,0);t.enableVertexAttribArray(n);let f=t.getUniformLocation(i,"u_Matrix");const a=new r;a.makeRotationZ(Math.PI/4);const o=new r;o.makeScale(2,2,2);const x=o.multiply(a);t.uniformMatrix4fv(f,!1,x.elements);t.clearColor(0,0,0,1);t.clear(t.COLOR_BUFFER_BIT);t.drawArrays(t.TRIANGLES,0,3);
