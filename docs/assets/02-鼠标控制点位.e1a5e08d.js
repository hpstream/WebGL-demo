import"./modulepreload-polyfill.b7f2da20.js";import{i as P}from"./utils.98e3bd0f.js";var S=`attribute vec2 a_Position;

void main() {
  gl_Position = vec4(a_Position,0,1);
  gl_PointSize = 50.0;
}`,p=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const e=document.querySelector("#canvas");e.width=window.innerWidth;e.height=window.innerHeight;const t=e.getContext("webgl");let u=P(t,S,p);t.clearColor(0,0,0,1);t.clear(t.COLOR_BUFFER_BIT);let c=t.getAttribLocation(u,"a_Position");t.vertexAttrib2f(c,.1,.1);t.drawArrays(t.POINTS,0,1);e.addEventListener("click",i=>{let s=i.clientX,d=i.clientY,{left:g,top:_,width:v,height:h}=e.getBoundingClientRect();const[o,r]=[v/2,h/2];let[m,w]=[s-g,d-_],[x,n]=[m-o,w-r];n=-n;const[a,l]=[x/o,n/r];console.log(a,l),t.clear(t.COLOR_BUFFER_BIT),t.vertexAttrib2f(c,a,l),t.drawArrays(t.POINTS,0,1)});
