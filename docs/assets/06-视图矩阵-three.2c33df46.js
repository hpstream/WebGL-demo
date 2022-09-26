import"./modulepreload-polyfill.b7f2da20.js";import{i as v}from"./utils.98e3bd0f.js";import{V as e,M as u}from"./vendor.36f02d62.js";var A=`attribute vec4 a_Position;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ModelMatrix;
void main() {
  gl_Position =  u_ViewMatrix * a_Position;
}`,g=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;const m=document.querySelector("#canvas");m.width=window.innerWidth;m.height=window.innerHeight;const t=m.getContext("webgl");let f=v(t,A,g);const l=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,-1],w=[0,1,1,2,2,3,3,0,0,5,1,6,2,7,3,4,4,5,5,6,6,7,7,4],_=[];w.forEach(n=>{const r=n*3;_.push(l[r]/5,l[r+1]/5,l[r+2]/5)});const M=new Float32Array(_),b=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,b);t.bufferData(t.ARRAY_BUFFER,M,t.STATIC_DRAW);const d=t.getAttribLocation(f,"a_Position");t.vertexAttribPointer(d,3,t.FLOAT,!1,0,0);t.enableVertexAttribArray(d);const F=t.getUniformLocation(f,"u_ViewMatrix");let V=y(new e(0,0,2),new e(0,0,0),new e(0,1,0)),s=.01;function x(){let n=V.multiply(new u().set(Math.cos(s),0,Math.sin(s),0,0,1,0,0,-Math.sin(s),0,Math.cos(s),0,0,0,0,1).transpose());t.uniformMatrix4fv(F,!1,n.elements),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.LINES,0,w.length),requestAnimationFrame(x)}x();function y(n,r,h){const o=new e().subVectors(n,r);o.normalize();const i=new e().crossVectors(h,o);i.normalize();const a=new e().crossVectors(o,i);a.normalize();const c=o;return new u().set(i.x,i.y,i.z,0,a.x,a.y,a.z,0,c.x,c.y,c.z,0,0,0,0,1)}
