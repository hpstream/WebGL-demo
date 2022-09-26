import"./modulepreload-polyfill.b7f2da20.js";import{M as a,V as r}from"./vendor.36f02d62.js";import{i as m}from"./utils.98e3bd0f.js";var _=`attribute vec4 a_Position;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ModelMatrix;
void main() {
  gl_Position = u_ViewMatrix * u_ModelMatrix * a_Position;
}`,x=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const n=document.querySelector("#canvas");n.width=window.innerWidth;n.height=window.innerHeight;const t=n.getContext("webgl");let o=m(t,_,x);const i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,-1],s=[0,1,1,2,2,3,3,0,0,5,1,6,2,7,3,4,4,5,5,6,6,7,7,4],c=[];s.forEach(f=>{const e=f*3;c.push(i[e]/5,i[e+1]/5,i[e+2]/5)});const d=new Float32Array(c),u=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,u);t.bufferData(t.ARRAY_BUFFER,d,t.STATIC_DRAW);const l=t.getAttribLocation(o,"a_Position");t.vertexAttribPointer(l,3,t.FLOAT,!1,0,0);t.enableVertexAttribArray(l);const w=t.getUniformLocation(o,"u_ViewMatrix"),M=t.getUniformLocation(o,"u_ModelMatrix"),v=new a().lookAt(new r(.2,.2,2),new r(0,0,0),new r(0,1,0)),g=new a;t.uniformMatrix4fv(w,!1,v.elements);t.uniformMatrix4fv(M,!1,g.elements);t.clearColor(0,0,0,1);t.clear(t.COLOR_BUFFER_BIT);t.drawArrays(t.LINES,0,s.length);
