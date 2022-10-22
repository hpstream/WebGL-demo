import"./modulepreload-polyfill.b7f2da20.js";var u=`attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;

void main() {

  gl_Position = a_Position;
  gl_PointSize = 20.0;
  v_Color = a_Color;
}`,R=`precision mediump float;

varying vec4 v_Color;

void main(){
  gl_FragColor = v_Color;
}`;function E(r,n,a){const t=r.createProgram(),f=s(r,r.VERTEX_SHADER,n),m=s(r,r.FRAGMENT_SHADER,a);return r.attachShader(t,f),r.attachShader(t,m),r.linkProgram(t),r.useProgram(t),t}function s(r,n,a){const t=r.createShader(n);return t&&(r.shaderSource(t,a),r.compileShader(t)),t}const i=document.querySelector("#canvas");i.width=window.innerWidth;i.height=window.innerHeight;const e=i.getContext("webgl"),_=E(e,u,R);let o=new Float32Array([0,.2,0,1,0,0,1,-.2,-.2,0,0,1,0,1,.2,-.2,0,0,0,1,1]),c=3,d=4,l=o.BYTES_PER_ELEMENT;console.log(l,o);let v=c+d;const h=v*l,b=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,b);e.bufferData(e.ARRAY_BUFFER,o,e.STATIC_DRAW);let A=e.getAttribLocation(_,"a_Position"),S=e.getAttribLocation(_,"a_Color");e.vertexAttribPointer(A,c,e.FLOAT,!1,h,0);e.vertexAttribPointer(S,d,e.FLOAT,!1,h,c*l);e.enableVertexAttribArray(A);e.enableVertexAttribArray(S);g();function g(){e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,o.length/v)}
