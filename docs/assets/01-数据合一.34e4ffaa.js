import"./modulepreload-polyfill.b7f2da20.js";import{i as v}from"./utils.98e3bd0f.js";var A=`attribute vec4 a_Position;
attribute vec4 a_Color;

varying vec4 v_Color;

void main() {
  gl_Position =  a_Position;
  gl_PointSize = 50.0;
  v_Color = a_Color;

}`,g=`precision mediump float;
varying vec4 v_Color;
void main(){
  gl_FragColor = v_Color;
}`;const t=document.querySelector("#canvas");t.width=window.innerWidth;t.height=window.innerHeight;const o=t.getContext("webgl");let n=v(o,A,g);o.clearColor(0,0,0,1);const e=new Float32Array([0,.4,0,0,0,1,1,-.2,-.1,0,0,1,0,1,.2,-.1,0,1,1,0,1]),i=e.BYTES_PER_ELEMENT,r=3,a=4,c=r+a,s=c*i,d=0,u=r*i,y=e.length/c,b=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,b);o.bufferData(o.ARRAY_BUFFER,e,o.STATIC_DRAW);const l=o.getAttribLocation(n,"a_Position");o.vertexAttribPointer(l,r,o.FLOAT,!1,s,d);o.enableVertexAttribArray(l);const _=o.getAttribLocation(n,"a_Color");o.vertexAttribPointer(_,a,o.FLOAT,!1,s,u);o.enableVertexAttribArray(_);o.clear(o.COLOR_BUFFER_BIT);o.drawArrays(o.TRIANGLES,0,y);
