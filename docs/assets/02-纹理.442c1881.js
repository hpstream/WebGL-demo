import"./modulepreload-polyfill.b7f2da20.js";import{i as v}from"./utils.98e3bd0f.js";var g=`attribute vec4 a_Position;
attribute vec2 a_Pin;
varying vec2 v_Pin;
void main() {
  gl_Position = a_Position;
  v_Pin = a_Pin;
}`,A=`precision mediump float;
uniform sampler2D u_Sampler;
varying vec2 v_Pin;
void main() {
  gl_FragColor = texture2D(u_Sampler, v_Pin);
}`;const n=document.querySelector("#canvas");n.width=window.innerWidth;n.height=window.innerHeight;const e=n.getContext("webgl");let r=v(e,g,A);e.clearColor(0,0,0,1);const a=1,c=1,i=new Float32Array([-.5,.5,0,a,-.5,-.5,0,0,.5,.5,c,a,.5,-.5,c,0]),s=i.BYTES_PER_ELEMENT,o=2,_=2,l=o+_,m=l*s,P=0,R=o*s,x=i.length/l,d=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,d);e.bufferData(e.ARRAY_BUFFER,i,e.STATIC_DRAW);const u=e.getAttribLocation(r,"a_Position");e.vertexAttribPointer(u,o,e.FLOAT,!1,m,P);e.enableVertexAttribArray(u);const T=e.getAttribLocation(r,"a_Pin");e.vertexAttribPointer(T,_,e.FLOAT,!1,m,R);e.enableVertexAttribArray(T);e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1);e.activeTexture(e.TEXTURE0);const f=e.createTexture();e.bindTexture(e.TEXTURE_2D,f);const t=new Image;t.src="/static/erha.jpg";t.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR);const E=e.getUniformLocation(r,"u_Sampler");e.uniform1i(E,0),S()};function S(){e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_STRIP,0,x)}
