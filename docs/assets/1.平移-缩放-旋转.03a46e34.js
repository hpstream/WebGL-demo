import"./modulepreload-polyfill.b7f2da20.js";import{M as n}from"./vendor.5ec5d0b7.js";var _=`attribute vec4 a_Position;
uniform mat4 u_Matrix;

void main() {

  gl_Position = u_Matrix*a_Position;
  gl_PointSize = 20.0;
}`,f=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;function l(e,a,o){const r=e.createProgram(),h=c(e,e.VERTEX_SHADER,a),u=c(e,e.FRAGMENT_SHADER,o);return e.attachShader(r,h),e.attachShader(r,u),e.linkProgram(r),e.useProgram(r),r}function c(e,a,o){const r=e.createShader(a);return r&&(e.shaderSource(r,o),e.compileShader(r)),r}const i=document.querySelector("#canvas");i.width=window.innerWidth;i.height=window.innerHeight;const t=i.getContext("webgl"),s=l(t,_,f);let m=new Float32Array([-.2,.2,-.2,-.2,.2,.2,.2,-.2]);const S=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,S);t.bufferData(t.ARRAY_BUFFER,m,t.STATIC_DRAW);const d=t.getAttribLocation(s,"a_Position"),x=t.getUniformLocation(s,"u_Matrix");new n;const A=new n().multiply(new n().makeRotationZ(Math.PI/6)).multiply(new n().setPosition(.1,.1,0)).multiply(new n().makeScale(.5,.5,1));t.uniformMatrix4fv(x,!1,A.elements);t.vertexAttribPointer(d,2,t.FLOAT,!1,0,0);t.enableVertexAttribArray(d);R();function R(){t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLE_STRIP,0,m.length/2)}
