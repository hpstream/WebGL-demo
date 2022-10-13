import"./modulepreload-polyfill.b7f2da20.js";var _=`attribute vec4 a_Position;
// attribute float a_PointSize;

void main() {

  gl_Position = a_Position;
  gl_PointSize = 20.0;
}`,S=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;function A(r,a,n){const t=r.createProgram(),s=i(r,r.VERTEX_SHADER,a),h=i(r,r.FRAGMENT_SHADER,n);return r.attachShader(t,s),r.attachShader(t,h),r.linkProgram(t),r.useProgram(t),t}function i(r,a,n){const t=r.createShader(a);return t&&(r.shaderSource(t,n),r.compileShader(t)),t}const o=document.querySelector("#canvas");o.width=window.innerWidth;o.height=window.innerHeight;const e=o.getContext("webgl"),f=A(e,_,S),c=new Float32Array([-.2,.2,-.2,-.2,0,.2,0,-.2,.2,.2,.2,-.2]),m=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,m);e.bufferData(e.ARRAY_BUFFER,c,e.STATIC_DRAW);const d=e.getAttribLocation(f,"a_Position");e.vertexAttribPointer(d,2,e.FLOAT,!1,0,0);e.enableVertexAttribArray(d);e.clearColor(0,0,0,1);e.clear(e.COLOR_BUFFER_BIT);e.drawArrays(e.POINTS,0,c.length/2);
