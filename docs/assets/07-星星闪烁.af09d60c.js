import"./modulepreload-polyfill.b7f2da20.js";import{i as F}from"./utils.98e3bd0f.js";var A=`attribute vec2 a_Position;
attribute float a_PointSize;

void main() {
  gl_Position = vec4(a_Position,0,1);
  gl_PointSize = a_PointSize;
}`,L=`precision mediump float;

uniform vec4 u_FragColor;

void main() {
  float dis = distance(gl_PointCoord, vec2(0.5,0.5)) ;
  
  if(dis < 0.5) {
    gl_FragColor = u_FragColor;
  }else{
    discard;
  }

}`;class b{constructor(){this.parent=null,this.children=new Set}add(e){e.parent=this,this.children.add(e)}update(e){this.children.forEach(o=>{o.update(e)})}deleteByTarget(e){const{children:o}=this;for(let n of o)if(n.target===e){o.delete(n);break}}}class x{constructor(e){this.target=e,this.parent=null,this.start=0,this.timeLen=5,this.loop=!1,this.keyMap=new Map,this.onEnd=()=>{},this.prevTime=0}update(e){const{keyMap:o,timeLen:n,target:i,loop:l,start:d,prevTime:c}=this;let r=e-d;n>=c&&n<r&&this.onEnd(),this.prevTime=r,l&&(r=r%n);for(const[h,s]of o){const f=s.length-1;r<s[0][0]?i[h]=s[0][1]:r>s[f][0]?i[h]=s[f][1]:i[h]=k(r,s,f)}}}function k(a,e,o){for(let n=0;n<o;n++){const i=e[n],l=e[n+1];if(a>=i[0]&&a<=l[0]){const d={x:l[0]-i[0],y:l[1]-i[1]},c=d.y/d.x,r=i[1]-i[0]*c;return c*a+r}}}const p=document.querySelector("#canvas");p.width=window.innerWidth;p.height=window.innerHeight;const t=p.getContext("webgl");t.enable(t.BLEND);t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA);let g=F(t,A,L);t.clearColor(0,0,0,0);t.clear(t.COLOR_BUFFER_BIT);let E=t.getAttribLocation(g,"a_Position"),T=t.getAttribLocation(g,"a_PointSize"),B=t.getUniformLocation(g,"u_FragColor"),v=new b;t.drawArrays(t.POINTS,0,1);let w=[];p.addEventListener("click",a=>{let e=a.clientX,o=a.clientY,{left:n,top:i,width:l,height:d}=p.getBoundingClientRect();const[c,r]=[l/2,d/2];let[h,s]=[e-n,o-i],[f,_]=[h-c,s-r];_=-_;const[S,y]=[f/c,_/r],C=Math.random()*3+2;let u={x:S,y,size:C,a:1},m=new x(u);w.push(u),m.start=new Date,m.timeLen=2e3,m.loop=!0,m.keyMap=new Map([["a",[[500,u.a],[1e3,0],[1500,u.a]]]]),v.add(m)});function P(){v.update(new Date),t.clear(t.COLOR_BUFFER_BIT),w.forEach(({x:a,y:e,size:o,a:n})=>{t.vertexAttrib2f(E,a,e),t.vertexAttrib1f(T,o);const i=new Float32Array([.87,.91,1,n]);t.uniform4fv(B,i),t.drawArrays(t.POINTS,0,1)}),requestAnimationFrame(P)}P();
