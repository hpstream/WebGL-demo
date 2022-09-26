import"./modulepreload-polyfill.b7f2da20.js";import{i as u}from"./utils.98e3bd0f.js";import{M as s,V as n}from"./vendor.36f02d62.js";var d=`attribute vec4 a_Position;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ModelMatrix;
void main() {
  gl_Position =  u_ViewMatrix * a_Position;
}`,w=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const a=document.querySelector("#canvas");a.width=window.innerWidth;a.height=window.innerHeight;const t=a.getContext("webgl");let c=u(t,d,w);const o=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,-1],l=[0,1,1,2,2,3,3,0,0,5,1,6,2,7,3,4,4,5,5,6,6,7,7,4],m=[];l.forEach(r=>{const i=r*3;m.push(o[i]/5,o[i+1]/5,o[i+2]/5)});const h=new Float32Array(m),v=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,v);t.bufferData(t.ARRAY_BUFFER,h,t.STATIC_DRAW);const f=t.getAttribLocation(c,"a_Position");t.vertexAttribPointer(f,3,t.FLOAT,!1,0,0);t.enableVertexAttribArray(f);const x=t.getUniformLocation(c,"u_ViewMatrix");let A=new s().lookAt(new n(0,0,2),new n(0,0,0),new n(0,1,0)),e=.01;function _(){let r=A.multiply(new s().set(Math.cos(e),0,Math.sin(e),0,0,1,0,0,-Math.sin(e),0,Math.cos(e),0,0,0,0,1).transpose());t.uniformMatrix4fv(x,!1,r.elements),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.LINES,0,l.length),requestAnimationFrame(_)}_();
