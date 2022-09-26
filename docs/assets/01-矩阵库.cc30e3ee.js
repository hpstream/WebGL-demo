import"./modulepreload-polyfill.b7f2da20.js";import{i as a}from"./utils.98e3bd0f.js";import{M as r}from"./vendor.36f02d62.js";var s=`attribute vec4 a_Position;
// \u5217\u4E3B\u5E8F
uniform mat4 u_Matrix;

void main() {
  gl_Position = u_Matrix * a_Position;
  // gl_PointSize = 10.0;
}`,l=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const e=document.querySelector("#canvas");e.width=window.innerWidth;e.height=window.innerHeight;const t=e.getContext("webgl");let n=a(t,s,l),c=new Float32Array([-.2,.2,-.2,-.2,.2,.2,.2,-.2]),m=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,m);t.bufferData(t.ARRAY_BUFFER,c,t.STATIC_DRAW);const i=t.getAttribLocation(n,"a_Position");t.vertexAttribPointer(i,2,t.FLOAT,!1,0,0);t.enableVertexAttribArray(i);let _=t.getUniformLocation(n,"u_Matrix");const[f,x]=[.2,.3],[d,g]=[.1,.1],u=new r().set(1,0,0,f,0,1,0,x,0,0,1,0,0,0,0,1),v=new r().set(1,0,0,d,0,1,0,g,0,0,1,0,0,0,0,1),o=v.multiply(u);console.log(o);t.uniformMatrix4fv(_,!1,o.elements);t.clearColor(0,0,0,1);t.clear(t.COLOR_BUFFER_BIT);t.drawArrays(t.TRIANGLES,0,3);
