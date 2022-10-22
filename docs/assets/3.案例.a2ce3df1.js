import"./modulepreload-polyfill.b7f2da20.js";import{G as P}from"./vendor.e4f064a4.js";var p=`attribute vec4 a_Position;
// attribute float a_PointSize;

void main() {

  gl_Position = a_Position;
  gl_PointSize = 20.0;
}`,v=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;function I(t,n,a){const r=t.createProgram(),c=f(t,t.VERTEX_SHADER,n),s=f(t,t.FRAGMENT_SHADER,a);return t.attachShader(r,c),t.attachShader(r,s),t.linkProgram(r),t.useProgram(r),r}function f(t,n,a){const r=t.createShader(n);return r&&(t.shaderSource(r,a),t.compileShader(r)),r}function T({clientX:t,clientY:n},a){const{left:r,top:c,width:s,height:R}=a.getBoundingClientRect();let[F,g]=[t-r,n-c],[_,S]=[s/2,R/2],[m,E]=[(F-_)/_,-(g-S)/S];return{x:m,y:E}}const o=document.querySelector("#canvas");o.width=window.innerWidth;o.height=window.innerHeight;const e=o.getContext("webgl"),y=I(e,p,v);let b=new P,l=b.addFolder("\u7ED8\u5236\u65B9\u5F0F");l.open();let i=new Float32Array([-.2,.2,-.2,-.2,0,.2,0,-.2,.2,.2,.2,-.2]);const x=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,x);e.bufferData(e.ARRAY_BUFFER,i,e.STATIC_DRAW);const A=e.getAttribLocation(y,"a_Position");e.vertexAttribPointer(A,2,e.FLOAT,!1,0,0);e.enableVertexAttribArray(A);let u=[],h={type:"POINTS",fn:()=>{i=new Float32Array,u=[],d()}};o.addEventListener("click",t=>{let{x:n,y:a}=T(t,o);u.push(n,a),i=new Float32Array(u),d()});let w=["POINTS","TRIANGLES","TRIANGLE_STRIP","TRIANGLE_FAN","LINES","LINE_STRIP","LINE_LOOP"];l.add(h,"type",w).onChange(()=>{d()});l.add(h,"fn").name("\u5F00\u59CB\u7ED8\u5236");d();function d(){e.bufferData(e.ARRAY_BUFFER,i,e.STATIC_DRAW),e.enableVertexAttribArray(A),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e[h.type],0,i.length/2)}
