import"./modulepreload-polyfill.b7f2da20.js";import{i as w}from"./utils.98e3bd0f.js";var C=`attribute vec2 a_Position;
attribute float a_PointSize;

void main() {
  gl_Position = vec4(a_Position,0,1);
  gl_PointSize = a_PointSize;
}`,b=`precision mediump float;

uniform vec4 u_FragColor;


void main(){
  gl_FragColor = u_FragColor;
}`;const n=document.querySelector("#canvas");n.width=window.innerWidth;n.height=window.innerHeight;const t=n.getContext("webgl");let c=w(t,C,b);t.clearColor(0,0,0,1);t.clear(t.COLOR_BUFFER_BIT);let x=t.getAttribLocation(c,"a_Position"),A=t.getAttribLocation(c,"a_PointSize"),y=t.getUniformLocation(c,"u_FragColor");t.drawArrays(t.POINTS,0,1);let d=[];n.addEventListener("click",i=>{let o=i.clientX,r=i.clientY,{left:e,top:a,width:h,height:u}=n.getBoundingClientRect();const[s,_]=[h/2,u/2];let[v,f]=[o-e,r-a],[P,l]=[v-s,f-_];l=-l;const[F,S]=[P/s,l/_],p=Math.random()*50+10;let g=Math.random();d.push({x:F,y:S,size:p,color:{r:g,g,b:1,a:1}})});function m(){t.clear(t.COLOR_BUFFER_BIT),d.forEach(({x:i,y:o,size:r,color:e})=>{t.vertexAttrib2f(x,i,o),t.vertexAttrib1f(A,r);const a=new Float32Array([e.r,e.g,e.b,e.a]);t.uniform4fv(y,a),t.drawArrays(t.POINTS,0,1)}),requestAnimationFrame(m)}m();
