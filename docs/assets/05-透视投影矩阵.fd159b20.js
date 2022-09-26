var b=Object.defineProperty;var w=(a,t,e)=>t in a?b(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var i=(a,t,e)=>(w(a,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill.b7f2da20.js";import{i as x}from"./utils.98e3bd0f.js";import{P as A,V as p,M as S}from"./vendor.36f02d62.js";var P=`attribute vec4 a_Position;

uniform mat4 u_ProjectionMatrix;


void main() {
  gl_Position = u_ProjectionMatrix*a_Position; 
}`,B=`precision mediump float;

uniform vec4 u_Color;

void main() {
  gl_FragColor = u_Color;
}`;const T=()=>({paintType:"POINTS",source:[],attributes:{},uniforms:{},maps:{}});class M{constructor(t){i(this,"gl");i(this,"program");i(this,"paintType");i(this,"source");i(this,"attributes");i(this,"uniforms");i(this,"maps");i(this,"categorySize");i(this,"sourceSize");i(this,"categoryBytes");Object.assign(this,T(),t),this.init()}get elementBytes(){return this.source.BYTES_PER_ELEMENT}init(){this.calculateSize(),this.updateAttribute(),this.updateUniform()}calculateSize(){const{attributes:t,elementBytes:e,source:r}=this;let o=0;Object.values(t).forEach(n=>{o+=n.size,n.byteIndex=n.index*e}),this.categorySize=o,this.categoryBytes=o*e,this.sourceSize=r.length/o}updateAttribute(){const{gl:t,attributes:e,categoryBytes:r,source:o,program:n}=this,l=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,l),t.bufferData(t.ARRAY_BUFFER,o,t.STATIC_DRAW);for(const m in e){let{size:f,byteIndex:v}=e[m];const g=t.getAttribLocation(n,m);t.vertexAttribPointer(g,f,t.FLOAT,!1,r,v),t.enableVertexAttribArray(g)}}updateUniform(){const{gl:t,uniforms:e,program:r}=this;for(let o in e){const{type:n,value:l,transpose:m}=e[o],f=t.getUniformLocation(r,o);n.includes("Matrix")?t[n](f,!!m,l):t[n](f,l)}}draw(t=this.paintType){const{gl:e,sourceSize:r}=this;e.drawArrays(e[t],0,r)}}const s=document.querySelector("#canvas");s.width=window.innerWidth;s.height=window.innerHeight;const c=s.getContext("webgl");let R=x(c,P,B);c.clearColor(0,0,0,1);const[E,z,C,F]=[45,s.width/s.height,1,20],u=new A(E,z,C,F),I=new p(1,.5,1),j=new p(0,0,-2.5);new p(0,1,0);u.position.copy(I);u.lookAt(j);u.updateWorldMatrix(!0,!0);const h=new S().multiplyMatrices(u.projectionMatrix,u.matrixWorldInverse);console.log(h.elements);const d=_([1,0,0,1],[-.5,0,-3]),y=_([1,1,0,1],[-.5,0,-2]);L();function L(){c.clear(c.COLOR_BUFFER_BIT),d.init(),d.draw(),y.init(),y.draw()}function _(a,[t,e,r]){return new M({gl:c,program:R,source:new Float32Array([t,.3+e,r,-.3+t,-.3+e,r,.3+t,-.3+e,r]),paintType:"TRIANGLES",attributes:{a_Position:{size:3,index:0}},uniforms:{u_Color:{type:"uniform4fv",value:a},u_ProjectionMatrix:{type:"uniformMatrix4fv",value:h.elements}}})}
