var v=Object.defineProperty;var w=(n,t,e)=>t in n?v(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var r=(n,t,e)=>(w(n,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill.b7f2da20.js";import{i as A}from"./utils.98e3bd0f.js";import{V as d,O as S,M as P}from"./vendor.36f02d62.js";var B=`attribute vec4 a_Position;

uniform mat4 u_ProjectionMatrix;


void main() {
  gl_Position = u_ProjectionMatrix*a_Position; 
}`,M=`precision mediump float;

uniform vec4 u_Color;

void main() {
  gl_FragColor = u_Color;
}`;const T=()=>({type:"POINTS",source:[],attributes:{},uniforms:{},maps:{}});class z{constructor(t){r(this,"gl");r(this,"program");r(this,"PaintType");r(this,"source");r(this,"attributes");r(this,"uniforms");r(this,"maps");r(this,"categorySize");r(this,"sourceSize");r(this,"categoryBytes");Object.assign(this,T(),t),this.init()}get elementBytes(){return this.source.BYTES_PER_ELEMENT}init(){this.calculateSize(),this.updateAttribute(),this.updateUniform()}calculateSize(){const{attributes:t,elementBytes:e,source:a}=this;let o=0;Object.values(t).forEach(i=>{o+=i.size,i.byteIndex=i.index*e}),this.categorySize=o,this.categoryBytes=o*e,this.sourceSize=a.length/o}updateAttribute(){const{gl:t,attributes:e,categoryBytes:a,source:o,program:i}=this,l=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,l),t.bufferData(t.ARRAY_BUFFER,o,t.STATIC_DRAW);for(const m in e){let{size:f,byteIndex:b}=e[m];const h=t.getAttribLocation(i,m);t.vertexAttribPointer(h,f,t.FLOAT,!1,a,b),t.enableVertexAttribArray(h)}}updateUniform(){const{gl:t,uniforms:e,program:a}=this;for(let o in e){const{type:i,value:l,transpose:m}=e[o],f=t.getUniformLocation(a,o);i.includes("Matrix")?t[i](f,!!m,l):t[i](f,l)}}draw(t=this.PaintType){const{gl:e,sourceSize:a}=this;e.drawArrays(e[t],0,a)}}const c=document.querySelector("#canvas");c.width=window.innerWidth;c.height=window.innerHeight;const u=c.getContext("webgl");let R=A(u,B,M);u.clearColor(0,0,0,1);const g=2,E=c.width/c.height,p=g*E,[C,F,I,O,W,j]=[-p,p,g,-g,0,4],L=new d(1,0,3),U=new d(.5,.5,0);new d(0,1,0);const s=new S(C,F,I,O,W,j);s.position.copy(L);s.lookAt(U);s.updateWorldMatrix(!0,!0);const k=new P().multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse);console.log(s.matrixWorld.elements);console.log(s.matrixWorldInverse.elements);const y=_([1,0,0,1],[0,.3,-.2,-.3,-.3,-.2,.3,-.3,-.2]),x=_([1,1,0,1],[0,.3,.2,-.3,-.3,.2,.3,-.3,.2]);N();function N(){u.clear(u.COLOR_BUFFER_BIT),y.init(),y.draw(),x.init(),x.draw()}function _(n,t){return new z({gl:u,program:R,source:new Float32Array(t),PaintType:"TRIANGLES",attributes:{a_Position:{size:3,index:0}},uniforms:{u_Color:{type:"uniform4fv",value:n},u_ProjectionMatrix:{type:"uniformMatrix4fv",value:k.elements}}})}
