import"./modulepreload-polyfill.b7f2da20.js";import{i as P}from"./utils.98e3bd0f.js";var u=`attribute vec4 a_Position;
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
}`;const r=document.querySelector("#canvas");r.width=window.innerWidth;r.height=window.innerHeight;const e=r.getContext("webgl");let n=P(e,u,A);e.clearColor(0,0,0,1);const a=3,c=3,i=new Float32Array([-.5,.5,0,a,-.5,-.5,0,0,.5,.5,c,a,.5,-.5,c,0]),_=i.BYTES_PER_ELEMENT,o=2,s=2,E=o+s,T=E*_,v=0,x=o*_,g=i.length/E,d=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,d);e.bufferData(e.ARRAY_BUFFER,i,e.STATIC_DRAW);const R=e.getAttribLocation(n,"a_Position");e.vertexAttribPointer(R,o,e.FLOAT,!1,T,v);e.enableVertexAttribArray(R);const l=e.getAttribLocation(n,"a_Pin");e.vertexAttribPointer(l,s,e.FLOAT,!1,T,x);e.enableVertexAttribArray(l);e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1);e.activeTexture(e.TEXTURE0);const S=e.createTexture();e.bindTexture(e.TEXTURE_2D,S);const t=new Image;t.src="/static/erha.jpg";t.onload=()=>{e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.MIRRORED_REPEAT);const m=e.getUniformLocation(n,"u_Sampler");e.uniform1i(m,0),f()};function f(){e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_STRIP,0,g)}
