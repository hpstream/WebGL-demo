import"./modulepreload-polyfill.b7f2da20.js";import{i as p}from"./utils.98e3bd0f.js";var w=`attribute vec2 a_Position;
attribute float a_PointSize;

void main() {
  gl_Position = vec4(a_Position,0,1);
  gl_PointSize = a_PointSize;
}`,b=`precision mediump float;

uniform vec4 u_FragColor;

void main() {
  float dis = distance(gl_PointCoord, vec2(0.5,0.5)) ;
  
  if(dis <= 0.5) {
    gl_FragColor = u_FragColor;
  }else{
    discard;
  }

}`;const n=document.querySelector("#canvas");n.width=window.innerWidth;n.height=window.innerHeight;const t=n.getContext("webgl");let c=p(t,w,b);t.clearColor(0,0,0,1);t.clear(t.COLOR_BUFFER_BIT);let x=t.getAttribLocation(c,"a_Position"),A=t.getAttribLocation(c,"a_PointSize"),y=t.getUniformLocation(c,"u_FragColor");t.drawArrays(t.POINTS,0,1);let g=[];n.addEventListener("click",i=>{let o=i.clientX,r=i.clientY,{left:e,top:a,width:h,height:u}=n.getBoundingClientRect();const[s,d]=[h/2,u/2];let[v,f]=[o-e,r-a],[P,l]=[v-s,f-d];l=-l;const[C,F]=[P/s,l/d],S=Math.random()*50+10;let _=Math.random();g.push({x:C,y:F,size:S,color:{r:_,g:_,b:1,a:1}})});function m(){t.clear(t.COLOR_BUFFER_BIT),g.forEach(({x:i,y:o,size:r,color:e})=>{t.vertexAttrib2f(x,i,o),t.vertexAttrib1f(A,r);const a=new Float32Array([e.r,e.g,e.b,e.a]);t.uniform4fv(y,a),t.drawArrays(t.POINTS,0,1)}),requestAnimationFrame(m)}m();
