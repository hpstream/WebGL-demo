var A=Object.defineProperty;var M=(n,t,e)=>t in n?A(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var r=(n,t,e)=>(M(n,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill.b7f2da20.js";import{i as P}from"./utils.98e3bd0f.js";import{V as p,O as S,M as f}from"./vendor.36f02d62.js";var B=`attribute vec4 a_Position;

uniform mat4 u_ProjectionMatrix;


void main() {
  gl_Position = u_ProjectionMatrix*a_Position; 
}`,T=`precision mediump float;

uniform vec4 u_Color;

void main() {
  gl_FragColor = u_Color;
}`;const z=()=>({type:"POINTS",source:[],attributes:{},uniforms:{},maps:{}});class R{constructor(t){r(this,"gl");r(this,"program");r(this,"PaintType");r(this,"source");r(this,"attributes");r(this,"uniforms");r(this,"maps");r(this,"categorySize");r(this,"sourceSize");r(this,"categoryBytes");Object.assign(this,z(),t),this.init()}get elementBytes(){return this.source.BYTES_PER_ELEMENT}init(){this.calculateSize(),this.updateAttribute(),this.updateUniform()}calculateSize(){const{attributes:t,elementBytes:e,source:a}=this;let i=0;Object.values(t).forEach(o=>{i+=o.size,o.byteIndex=o.index*e}),this.categorySize=i,this.categoryBytes=i*e,this.sourceSize=a.length/i}updateAttribute(){const{gl:t,attributes:e,categoryBytes:a,source:i,program:o}=this,u=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,i,t.STATIC_DRAW);for(const l in e){let{size:m,byteIndex:v}=e[l];const h=t.getAttribLocation(o,l);t.vertexAttribPointer(h,m,t.FLOAT,!1,a,v),t.enableVertexAttribArray(h)}}updateUniform(){const{gl:t,uniforms:e,program:a}=this;for(let i in e){const{type:o,value:u,transpose:l}=e[i],m=t.getUniformLocation(a,i);o.includes("Matrix")?t[o](m,!!l,u):t[o](m,u)}}draw(t=this.PaintType){const{gl:e,sourceSize:a}=this;e.drawArrays(e[t],0,a)}}const s=document.querySelector("#canvas");s.width=window.innerWidth;s.height=window.innerHeight;const c=s.getContext("webgl");let E=P(c,B,T);c.clearColor(0,0,0,1);const g=2,C=s.width/s.height,y=g*C,[F,O,j,I,L,U]=[-y,y,g,-g,0,4],w=new p(1,0,3),W=new p(.5,.5,0),k=new p(0,1,0),_=new S(F,O,j,I,L,U);_.updateWorldMatrix(!0,!0);const N=new f().setPosition(w),V=new f().lookAt(w,W,k),Y=new f().multiplyMatrices(N,V).invert(),D=_.projectionMatrix,H=new f().multiplyMatrices(D,Y),d=b([1,0,0,1],[0,.3,-.2,-.3,-.3,-.2,.3,-.3,-.2]),x=b([1,1,0,1],[0,.3,.2,-.3,-.3,.2,.3,-.3,.2]);q();function q(){c.clear(c.COLOR_BUFFER_BIT),d.init(),d.draw(),x.init(),x.draw()}function b(n,t){return new R({gl:c,program:E,source:new Float32Array(t),PaintType:"TRIANGLES",attributes:{a_Position:{size:3,index:0}},uniforms:{u_Color:{type:"uniform4fv",value:n},u_ProjectionMatrix:{type:"uniformMatrix4fv",value:H.elements}}})}
