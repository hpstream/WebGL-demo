import"./modulepreload-polyfill.b7f2da20.js";var _=`attribute vec4 a_Position;
attribute float a_PointSize;

void main() {

  gl_Position = a_Position;
  gl_PointSize = a_PointSize;
}`,h=`
precision mediump float;

uniform vec4 u_FragColor;

void main(){
  gl_FragColor = u_FragColor;
}`;function S(t,n,a){const o=t.createProgram(),d=c(t,t.VERTEX_SHADER,n),s=c(t,t.FRAGMENT_SHADER,a);return t.attachShader(o,d),t.attachShader(o,s),t.linkProgram(o),t.useProgram(o),o}function c(t,n,a){const o=t.createShader(n);return o&&(t.shaderSource(o,a),t.compileShader(o)),o}const e=document.querySelector("#canvas");e.width=window.innerWidth;e.height=window.innerHeight;const r=e.getContext("webgl"),i=S(r,_,h),m=r.getAttribLocation(i,"a_Position"),u=r.getAttribLocation(i,"a_PointSize"),P=r.getUniformLocation(i,"u_FragColor");r.vertexAttrib2f(m,1,1);r.vertexAttrib1f(u,50);r.uniform4fv(P,new Float32Array([1,1,1,1]));r.clearColor(0,0,0,1);r.clear(r.COLOR_BUFFER_BIT);r.drawArrays(r.POINTS,0,1);
