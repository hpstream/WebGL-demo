var d=Object.defineProperty;var b=(s,t,e)=>t in s?d(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var o=(s,t,e)=>(b(s,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill.b7f2da20.js";import{i as _}from"./utils.98e3bd0f.js";import{M as v}from"./vendor.36f02d62.js";var x=`attribute vec4 a_Position;

uniform mat4 u_ProjectionMatrix;


void main() {
  gl_Position = u_ProjectionMatrix*a_Position; 
}`,A=`precision mediump float;

uniform vec4 u_Color;

void main() {
  gl_FragColor = u_Color;
}`;const S=()=>({type:"POINTS",source:[],attributes:{},uniforms:{},maps:{}});class P{constructor(t){o(this,"gl");o(this,"program");o(this,"PaintType");o(this,"source");o(this,"attributes");o(this,"uniforms");o(this,"maps");o(this,"categorySize");o(this,"sourceSize");o(this,"categoryBytes");Object.assign(this,S(),t),this.init()}get elementBytes(){return this.source.BYTES_PER_ELEMENT}init(){this.calculateSize(),this.updateAttribute(),this.updateUniform()}calculateSize(){const{attributes:t,elementBytes:e,source:n}=this;let r=0;Object.values(t).forEach(i=>{r+=i.size,i.byteIndex=i.index*e}),this.categorySize=r,this.categoryBytes=r*e,this.sourceSize=n.length/r}updateAttribute(){const{gl:t,attributes:e,categoryBytes:n,source:r,program:i}=this,c=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,c),t.bufferData(t.ARRAY_BUFFER,r,t.STATIC_DRAW);for(const u in e){let{size:l,byteIndex:p}=e[u];const g=t.getAttribLocation(i,u);t.vertexAttribPointer(g,l,t.FLOAT,!1,n,p),t.enableVertexAttribArray(g)}}updateUniform(){const{gl:t,uniforms:e,program:n}=this;for(let r in e){const{type:i,value:c,transpose:u}=e[r],l=t.getUniformLocation(n,r);i.includes("Matrix")?t[i](l,!!u,c):t[i](l,c)}}draw(t=this.PaintType){const{gl:e,sourceSize:n}=this;e.drawArrays(e[t],0,n)}}const a=document.querySelector("#canvas");a.width=window.innerWidth;a.height=window.innerHeight;const m=a.getContext("webgl");let w=_(m,x,A);m.clearColor(0,0,0,1);const h=new v,f=2,z=a.width/a.height,y=f*z,[B,T,E,M,R,C]=[-y,y,f,-f,0,4];h.makeOrthographic(B,T,E,M,R,C);console.log(h);const F=new P({gl:m,program:w,source:new Float32Array([0,.3,-.2,-.3,-.3,-.2,.3,-.3,-.2]),PaintType:"TRIANGLES",attributes:{a_Position:{size:3,index:0}},uniforms:{u_Color:{type:"uniform4fv",value:[1,1,0,1]},u_ProjectionMatrix:{type:"uniformMatrix4fv",value:h.elements}}});F.draw();
