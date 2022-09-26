import"./modulepreload-polyfill.b7f2da20.js";import{i as f}from"./utils.98e3bd0f.js";var p=`attribute vec2 a_Position;
attribute float a_PointSize;

void main() {
  gl_Position = vec4(a_Position,0,1);
  gl_PointSize = a_PointSize;
}`,b=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const e=document.querySelector("#canvas");e.width=window.innerWidth;e.height=window.innerHeight;const t=e.getContext("webgl");let c=f(t,p,b);t.clearColor(0,0,0,1);t.clear(t.COLOR_BUFFER_BIT);let A=t.getAttribLocation(c,"a_Position"),y=t.getAttribLocation(c,"a_PointSize");t.drawArrays(t.POINTS,0,1);let s=[];e.addEventListener("click",i=>{let n=i.clientX,o=i.clientY,{left:_,top:g,width:h,height:m}=e.getBoundingClientRect();const[a,l]=[h/2,m/2];let[v,P]=[n-_,o-g],[S,r]=[v-a,P-l];r=-r;const[u,w]=[S/a,r/l],x=Math.random()*50+10;s.push({x:u,y:w,size:x})});function d(){t.clear(t.COLOR_BUFFER_BIT),s.forEach(({x:i,y:n,size:o})=>{t.vertexAttrib2f(A,i,n),t.vertexAttrib1f(y,o),t.drawArrays(t.POINTS,0,1)}),requestAnimationFrame(d)}d();
