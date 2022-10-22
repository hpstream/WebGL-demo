import"./modulepreload-polyfill.b7f2da20.js";import{G as S,V as s,M as l}from"./vendor.e4f064a4.js";var M=`attribute vec4 a_Position;
uniform mat4 u_Matrix;
uniform mat4 u_ViewMatrix;

void main() {

  gl_Position = u_ViewMatrix * u_Matrix * a_Position;
  gl_PointSize = 20.0;
}`,R=`
void main(){
  gl_FragColor = vec4(1,1,1,1);
}`;function V(e,r,c){const n=e.createProgram(),o=h(e,e.VERTEX_SHADER,r),i=h(e,e.FRAGMENT_SHADER,c);return e.attachShader(n,o),e.attachShader(n,i),e.linkProgram(n),e.useProgram(n),n}function h(e,r,c){const n=e.createShader(r);return n&&(e.shaderSource(n,c),e.compileShader(n)),n}const x=document.querySelector("#canvas");x.width=window.innerWidth;x.height=window.innerHeight;const t=x.getContext("webgl"),f=V(t,M,R),u=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,-1],g=[0,1,1,2,2,3,3,0,0,5,1,6,2,7,3,4,4,5,5,6,6,7,7,4],_=[];g.forEach(e=>{const r=e*3;_.push(u[r]/5,u[r+1]/5,u[r+2]/5)});const p=new Float32Array(_),b=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,b);t.bufferData(t.ARRAY_BUFFER,p,t.STATIC_DRAW);const w=t.getAttribLocation(f,"a_Position"),y=t.getUniformLocation(f,"u_Matrix"),F=t.getUniformLocation(f,"u_ViewMatrix");let P=new S,a={originX:.1,originY:.2,translateX:0,translateY:0},m=P.addFolder("\u89C6\u70B9");m.open();m.add(a,"originX").min(-1).max(1).step(.01).onChange(d);m.add(a,"originY").min(-1).max(1).step(.01).onChange(d);m.add(a,"translateX").min(-1).max(1).step(.01).onChange(d);m.add(a,"translateY").min(-1).max(1).step(.01).onChange(d);function d(){A(),v()}function A(){let e=C(new s(a.originX,a.originY,.5),new s(a.translateX,a.translateY,0),new s(0,1,0));console.log(e),t.uniformMatrix4fv(F,!1,e)}A();t.uniformMatrix4fv(y,!1,new l().elements);t.vertexAttribPointer(w,3,t.FLOAT,!1,0,0);t.enableVertexAttribArray(w);function C(e,r,c){const n=new s().subVectors(e,r).normalize(),o=new s().crossVectors(c,n).normalize(),i=new s().crossVectors(n,o).normalize();return new l().set(...o.toArray(),0,...i.toArray(),0,-n.x,-n.y,-n.z,0,0,0,0,1),[o.x,o.y,o.z,0,i.x,i.y,i.z,0,n.x,n.y,n.z,0,0,0,0,1]}v();function v(){t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.LINES,0,g.length)}
