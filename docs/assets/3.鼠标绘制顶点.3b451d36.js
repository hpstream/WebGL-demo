import"./modulepreload-polyfill.b7f2da20.js";var m=`attribute vec4 a_Position;
attribute float a_PointSize;

void main() {

  gl_Position = a_Position;
  gl_PointSize = a_PointSize;
}`,S=`
precision mediump float;

uniform vec4 u_FragColor;

void main(){
  gl_FragColor = u_FragColor;
}`;function f(t,n,r){const o=t.createProgram(),i=u(t,t.VERTEX_SHADER,n),a=u(t,t.FRAGMENT_SHADER,r);return t.attachShader(o,i),t.attachShader(o,a),t.linkProgram(o),t.useProgram(o),o}function u(t,n,r){const o=t.createShader(n);return o&&(t.shaderSource(o,r),t.compileShader(o)),o}const s=document.querySelector("#canvas");s.width=window.innerWidth;s.height=window.innerHeight;const e=s.getContext("webgl"),h=f(e,m,S),v=e.getAttribLocation(h,"a_Position"),P=e.getAttribLocation(h,"a_PointSize"),p=e.getUniformLocation(h,"u_FragColor");let _=[];function c(t,n,r=!1){let o=t+(n-t)*Math.random();return r?o:Math.floor(o)}const{left:F,top:x,width:C,height:w}=s.getBoundingClientRect();s.addEventListener("click",({clientX:t,clientY:n})=>{let[r,o]=[t-F,n-x],[i,a]=[C/2,w/2],[d,g]=[(r-i)/i,-(o-a)/a],l={x:d,y:g,size:c(10,20),r:c(0,1,!0),g:c(0,1,!0),b:c(0,1,!0),a:c(.5,1,!0)};console.log(l),_.push(l),A()});e.clearColor(0,0,0,1);e.clear(e.COLOR_BUFFER_BIT);function A(){e.clear(e.COLOR_BUFFER_BIT),_.forEach(({x:t,y:n,size:r,r:o,g:i,b:a,a:d})=>{e.vertexAttrib2f(v,t,n),e.vertexAttrib1f(P,r),e.uniform4fv(p,new Float32Array([o,i,a,d])),e.drawArrays(e.POINTS,0,1)})}
