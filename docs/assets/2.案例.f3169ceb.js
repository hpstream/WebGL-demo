import"./modulepreload-polyfill.b7f2da20.js";import{G as P,M as i}from"./vendor.5ec5d0b7.js";var R=`attribute vec4 a_Position;
uniform mat4 u_Matrix;

void main() {

  gl_Position = u_Matrix*a_Position;
  gl_PointSize = 20.0;
}`,v=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;function w(n,s,d){const a=n.createProgram(),F=h(n,n.VERTEX_SHADER,s),S=h(n,n.FRAGMENT_SHADER,d);return n.attachShader(a,F),n.attachShader(a,S),n.linkProgram(a),n.useProgram(a),a}function h(n,s,d){const a=n.createShader(s);return a&&(n.shaderSource(a,d),n.compileShader(a)),a}const m=document.querySelector("#canvas");m.width=window.innerWidth;m.height=window.innerHeight;const e=m.getContext("webgl"),p=w(e,R,v);let g=new Float32Array([-.2,.2,-.2,-.2,.2,.2,.2,-.2]);const C=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,C);e.bufferData(e.ARRAY_BUFFER,g,e.STATIC_DRAW);const x=e.getAttribLocation(p,"a_Position"),Y=e.getUniformLocation(p,"u_Matrix");let r=new P,t={originX:0,originY:0,rotateX:0,rotateY:0,rotateZ:0,scaleX:1,scaleY:1,positionX:0,positionY:0},c=r.addFolder("\u57FA\u70B9");c.open();c.add(t,"originX").min(-1).max(1).step(.01).onChange(o);c.add(t,"originY").min(-1).max(1).step(.01).onChange(o);let f=r.addFolder("\u65CB\u8F6C");f.open();f.add(t,"rotateZ").min(0).max(Math.PI*2).step(.01).onChange(o);let l=r.addFolder("\u7F29\u653E");l.open();l.add(t,"scaleX").min(0).max(2).step(.01).onChange(o);l.add(t,"scaleY").min(0).max(3).step(.01).onChange(o);let u=r.addFolder("\u5E73\u79FB");u.open();u.add(t,"positionX").min(0).max(1).step(.01).onChange(o);u.add(t,"positionY").min(0).max(1).step(.01).onChange(o);function o(){_(),A()}function _(){const n=new i().multiply(new i().setPosition(t.originX,t.originY,0).multiply(new i().makeRotationZ(t.rotateZ).multiply(new i().setPosition(t.positionX,t.positionY,0)).multiply(new i().makeScale(t.scaleX,t.scaleY,1))).multiply(new i().setPosition(-t.originX,-t.originY,0)));e.uniformMatrix4fv(Y,!1,n.elements)}_();e.vertexAttribPointer(x,2,e.FLOAT,!1,0,0);e.enableVertexAttribArray(x);A();function A(){e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_STRIP,0,g.length/2)}
