import"./modulepreload-polyfill.b7f2da20.js";import{M as o}from"./vendor.36f02d62.js";import{i as v}from"./utils.98e3bd0f.js";var d=`attribute vec4 a_Position;
 uniform mat4 u_ModelMatrix;
attribute vec2 a_Pin;
varying vec2 v_Pin;
void main() {
  gl_Position = u_ModelMatrix*a_Position;
  v_Pin = a_Pin;
}`,A=`precision mediump float;
uniform sampler2D u_Sampler;
varying vec2 v_Pin;
void main() {
  gl_FragColor = texture2D(u_Sampler, v_Pin);
}`;const a=document.querySelector("#canvas");a.width=window.innerWidth;a.height=window.innerHeight;const e=a.getContext("webgl");let t=v(e,d,A);e.clearColor(0,0,0,1);e.enable(e.CULL_FACE);e.enable(e.DEPTH_TEST);const c=new Float32Array([-.5,-.5,-.5,0,0,-.5,.5,-.5,0,.5,.5,-.5,-.5,.25,0,-.5,.5,-.5,0,.5,.5,.5,-.5,.25,.5,.5,-.5,-.5,.25,0,-.5,-.5,.5,.25,0,.5,-.5,.5,.5,0,-.5,.5,.5,.25,.5,-.5,.5,.5,.25,.5,.5,-.5,.5,.5,0,.5,.5,.5,.5,.5,-.5,.5,-.5,.5,0,-.5,.5,.5,.5,.5,.5,.5,-.5,.75,0,-.5,.5,.5,.5,.5,.5,.5,.5,.75,.5,.5,.5,-.5,.75,0,-.5,-.5,-.5,0,.5,.5,-.5,-.5,.25,.5,-.5,-.5,.5,0,1,-.5,-.5,.5,0,1,.5,-.5,-.5,.25,.5,.5,-.5,.5,.25,1,-.5,-.5,-.5,.25,.5,-.5,-.5,.5,.25,1,-.5,.5,-.5,.5,.5,-.5,-.5,.5,.25,1,-.5,.5,.5,.5,1,-.5,.5,-.5,.5,.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,.75,.5,.5,-.5,.5,.5,1,.5,-.5,.5,.5,1,.5,.5,-.5,.75,.5,.5,.5,.5,.75,1]),_=c.BYTES_PER_ELEMENT,s=3,l=2,m=s+l,u=m*_,g=0,R=s*_,P=c.length/m,S=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,S);e.bufferData(e.ARRAY_BUFFER,c,e.STATIC_DRAW);const f=e.getAttribLocation(t,"a_Position");e.vertexAttribPointer(f,s,e.FLOAT,!1,u,g);e.enableVertexAttribArray(f);const x=e.getAttribLocation(t,"a_Pin");e.vertexAttribPointer(x,l,e.FLOAT,!1,u,R);e.enableVertexAttribArray(x);e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1);e.activeTexture(e.TEXTURE0);const y=e.createTexture();e.bindTexture(e.TEXTURE_2D,y);const i=new Image;i.src="/static/mf.jpg";i.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR);const n=e.getUniformLocation(t,"u_Sampler");e.uniform1i(n,0),T()};const r=new o,b=new o().makeRotationX(.01),p=new o().makeRotationY(.01),E=e.getUniformLocation(t,"u_ModelMatrix");e.uniformMatrix4fv(E,!1,r.elements);(function n(){r.multiply(p).multiply(b),e.uniformMatrix4fv(E,!1,r.elements),T(),requestAnimationFrame(n)})();function T(){e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,P)}
