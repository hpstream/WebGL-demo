var T=Object.defineProperty;var z=(n,t,e)=>t in n?T(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var r=(n,t,e)=>(z(n,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill.b7f2da20.js";import{i as R}from"./utils.98e3bd0f.js";import{M as x,O as E}from"./vendor.36f02d62.js";var C=`attribute vec4 a_Position;

uniform mat4 u_ProjectionMatrix;


void main() {
  gl_Position = u_ProjectionMatrix*a_Position; 
}`,F=`precision mediump float;

uniform vec4 u_Color;

void main() {
  gl_FragColor = u_Color;
}`;const O=()=>({type:"POINTS",source:[],attributes:{},uniforms:{},maps:{}});class j{constructor(t){r(this,"gl");r(this,"program");r(this,"PaintType");r(this,"source");r(this,"attributes");r(this,"uniforms");r(this,"maps");r(this,"categorySize");r(this,"sourceSize");r(this,"categoryBytes");Object.assign(this,O(),t),this.init()}get elementBytes(){return this.source.BYTES_PER_ELEMENT}init(){this.calculateSize(),this.updateAttribute(),this.updateUniform()}calculateSize(){const{attributes:t,elementBytes:e,source:a}=this;let i=0;Object.values(t).forEach(o=>{i+=o.size,o.byteIndex=o.index*e}),this.categorySize=i,this.categoryBytes=i*e,this.sourceSize=a.length/i}updateAttribute(){const{gl:t,attributes:e,categoryBytes:a,source:i,program:o}=this,u=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,i,t.STATIC_DRAW);for(const m in e){let{size:f,byteIndex:B}=e[m];const h=t.getAttribLocation(o,m);t.vertexAttribPointer(h,f,t.FLOAT,!1,a,B),t.enableVertexAttribArray(h)}}updateUniform(){const{gl:t,uniforms:e,program:a}=this;for(let i in e){const{type:o,value:u,transpose:m}=e[i],f=t.getUniformLocation(a,i);o.includes("Matrix")?t[o](f,!!m,u):t[o](f,u)}}draw(t=this.PaintType){const{gl:e,sourceSize:a}=this;e.drawArrays(e[t],0,a)}}const c=document.querySelector("#canvas");c.width=window.innerWidth;c.height=window.innerHeight;const l=c.getContext("webgl");let I=R(l,C,F);l.clearColor(0,0,0,1);const g=2,W=c.width/c.height,d=g*W,[_,b,v,A,w,S]=[-d,d,g,-g,0,4];let P=new x;P.makeOrthographic(_,b,v,A,w,S);const s=new E(_,b,v,A,w,S);s.position.set(0,0,2);s.updateWorldMatrix(!0,!0);const L=new x().multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse);console.log(s.matrixWorld.elements);console.log(s.matrixWorldInverse.elements);console.log(P.elements,s.projectionMatrix.elements);const p=M([1,0,0,1],[0,.3,-.2,-.3,-.3,-.2,.3,-.3,-.2]),y=M([1,1,0,1],[0,.3,.2,-.3,-.3,.2,.3,-.3,.2]);U();function U(){l.clear(l.COLOR_BUFFER_BIT),p.init(),p.draw(),y.init(),y.draw()}function M(n,t){return new j({gl:l,program:I,source:new Float32Array(t),PaintType:"TRIANGLES",attributes:{a_Position:{size:3,index:0}},uniforms:{u_Color:{type:"uniform4fv",value:n},u_ProjectionMatrix:{type:"uniformMatrix4fv",value:L.elements}}})}
