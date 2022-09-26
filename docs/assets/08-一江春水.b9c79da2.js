import"./modulepreload-polyfill.b7f2da20.js";import{i as c}from"./utils.98e3bd0f.js";import{M as m,V as i}from"./vendor.36f02d62.js";var f=`attribute vec4 a_Position;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ModelMatrix;
void main() {
  gl_Position = u_ViewMatrix * a_Position;
  gl_PointSize=3.0;
}`,_=`
void main(){
  gl_FragColor = vec4(1,1,1,1);
}`;const n=document.querySelector("#canvas");n.width=window.innerWidth;n.height=window.innerHeight;const e=n.getContext("webgl");let s=c(e,f,_);e.clearColor(0,0,0,1);e.clear(e.COLOR_BUFFER_BIT);const[x,u,w,v]=[-.7,.8,-1,1],d=new m().lookAt(new i(.1,1,6),new i,new i(0,1,0));let o=h();console.log(o);let g=3;const A=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,A);e.bufferData(e.ARRAY_BUFFER,new Float32Array(o),e.STATIC_DRAW);const l=e.getAttribLocation(s,"a_Position");e.vertexAttribPointer(l,g,e.FLOAT,!1,0,0);e.enableVertexAttribArray(l);const P=e.getUniformLocation(s,"u_ViewMatrix");e.uniformMatrix4fv(P,!1,d.elements);e.drawArrays(e.POINTS,0,o.length/3);function h(){const a=[];for(let t=w;t<v;t+=.1)for(let r=x;r<u;r+=.1)a.push(r,0,t);return a}
