import"./modulepreload-polyfill.b7f2da20.js";import{g,a as m}from"./vendor.36f02d62.js";import{i as b}from"./utils.98e3bd0f.js";var w=`attribute vec2 a_Position;
attribute float a_PointSize;

void main() {
  gl_Position = vec4(a_Position,0,1);
  gl_PointSize = a_PointSize;
}`,x=`precision mediump float;

uniform vec4 u_FragColor;

void main() {
  float dis = distance(gl_PointCoord, vec2(0.5,0.5)) ;
  
  if(dis < 0.5) {
    gl_FragColor = u_FragColor;
  }else{
    discard;
  }

}`;g.registerPlugin(m);const e=document.querySelector("#canvas");e.width=window.innerWidth;e.height=window.innerHeight;const t=e.getContext("webgl");t.enable(t.BLEND);t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA);let s=b(t,w,x);t.clearColor(0,0,0,0);t.clear(t.COLOR_BUFFER_BIT);let y=t.getAttribLocation(s,"a_Position"),L=t.getAttribLocation(s,"a_PointSize"),E=t.getUniformLocation(s,"u_FragColor");t.drawArrays(t.POINTS,0,1);let u=[];e.addEventListener("click",n=>{let o=n.clientX,i=n.clientY,{left:r,top:a,width:f,height:P}=e.getBoundingClientRect();const[c,d]=[f/2,P/2];let[v,C]=[o-r,i-a],[S,l]=[v-c,C-d];l=-l;const[p,A]=[S/c,l/d],F=Math.random()*3+2;let _={x:p,y:A,size:F,a:1};u.push(_),g.from(_,{a:0,yoyo:!0,repeat:-1,duration:Math.random()*1+.5,ease:m.create("custom","M0,0,C0.126,0.382,0.33,0.15,0.488,0.298,0.68,0.478,0.818,1.001,1,1")})});function h(){t.clear(t.COLOR_BUFFER_BIT),u.forEach(({x:n,y:o,size:i,a:r})=>{t.vertexAttrib2f(y,n,o),t.vertexAttrib1f(L,i);const a=new Float32Array([.87,.91,1,r]);t.uniform4fv(E,a),t.drawArrays(t.POINTS,0,1)}),requestAnimationFrame(h)}h();
