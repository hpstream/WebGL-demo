import"./modulepreload-polyfill.b7f2da20.js";import{i as p}from"./utils.98e3bd0f.js";var f=`attribute vec2 a_Position;

void main() {
  gl_Position = vec4(a_Position,0,1);
  gl_PointSize = 50.0;
}`,S=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const e=document.querySelector("#canvas");e.width=window.innerWidth;e.height=window.innerHeight;const t=e.getContext("webgl");let y=p(t,f,S);t.clearColor(0,0,0,1);t.clear(t.COLOR_BUFFER_BIT);let l=t.getAttribLocation(y,"a_Position");t.vertexAttrib2f(l,.1,.1);t.drawArrays(t.POINTS,0,1);let c=[];e.addEventListener("click",n=>{let i=n.clientX,d=n.clientY,{left:_,top:g,width:h,height:m}=e.getBoundingClientRect();const[o,a]=[h/2,m/2];let[v,u]=[i-_,d-g],[w,r]=[v-o,u-a];r=-r;const[x,P]=[w/o,r/a];c.push({x,y:P})});function s(){t.clear(t.COLOR_BUFFER_BIT),c.forEach(({x:n,y:i})=>{t.vertexAttrib2f(l,n,i),t.drawArrays(t.POINTS,0,1)}),requestAnimationFrame(s)}s();
