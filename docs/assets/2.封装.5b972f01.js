var y=Object.defineProperty;var _=(e,r,t)=>r in e?y(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var s=(e,r,t)=>(_(e,typeof r!="symbol"?r+"":r,t),t);import"./modulepreload-polyfill.b7f2da20.js";var A=`attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;

void main() {

  gl_Position = a_Position;
  gl_PointSize = 20.0;
  v_Color = a_Color;
}`,E=`precision mediump float;

varying vec4 v_Color;

void main(){
  gl_FragColor = v_Color;
}`;function v(e,r,t){const o=e.createProgram(),n=g(e,e.VERTEX_SHADER,r),a=g(e,e.FRAGMENT_SHADER,t);if(e.attachShader(o,n),e.attachShader(o,a),e.linkProgram(o),e.useProgram(o),e.getProgramParameter(o,e.LINK_STATUS)===!1){const i=e.getProgramInfoLog(o).trim(),c=f(e,n,"vertex"),u=f(e,a,"fragment");console.error("THREE.WebGLProgram: Shader Error "+e.getError()+" - VALIDATE_STATUS "+e.getProgramParameter(o,e.VALIDATE_STATUS)+`

Program Info Log: `+i+`
`+c+`
`+u)}return o}function f(e,r,t){const o=e.getShaderParameter(r,e.COMPILE_STATUS),n=e.getShaderInfoLog(r).trim();if(o&&n==="")return"";const a=/ERROR: 0:(\d+)/.exec(n);if(a){const i=parseInt(a[1]);return t.toUpperCase()+`

`+n+`

`+T(e.getShaderSource(r),i)}else return n}function T(e,r){const t=e.split(`
`),o=[],n=Math.max(r-6,0),a=Math.min(r+6,t.length);for(let i=n;i<a;i++){const c=i+1;o.push(`${c===r?">":" "} ${c}: ${t[i]}`)}return o.join(`
`)}function g(e,r,t){const o=e.createShader(r);return o&&(e.shaderSource(o,t),e.compileShader(o)),o}const b=()=>({gl:null,program:null,type:"POINTS",source:new Float32Array,sourceSize:0,elementBytes:0,categorySize:0,categoryBytes:0,attributes:{},uniforms:{}});class p{constructor(r){s(this,"gl");s(this,"type");s(this,"source");s(this,"attribute");s(this,"uniforms");s(this,"sourceSize");s(this,"elementBytes");s(this,"categorySize");s(this,"categoryBytes");s(this,"program");Object.assign(this,b(),r),this.init()}init(){this.calculateSourceSize(),this.initAttribute(),this.initUniforms()}calculateSourceSize(){this.elementBytes=this.source.BYTES_PER_ELEMENT;let{attribute:r,source:t}=this,o=0;Object.entries(r).forEach(([n,a])=>{o+=a.size}),this.categorySize=o,this.categoryBytes=o*this.elementBytes,this.sourceSize=t.length/o}initAttribute(){let{attribute:r,gl:t,program:o,source:n,categorySize:a,categoryBytes:i,elementBytes:c}=this;const u=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW),Object.entries(r).forEach(([d,l])=>{let S=t.getAttribLocation(o,d);t.vertexAttribPointer(S,l.size,t.FLOAT,!1,i,l.index*c),t.enableVertexAttribArray(S)})}initUniforms(){let{gl:r,program:t,uniforms:o}=this;Object.entries(o).forEach(([n,a])=>{let i=r.getUniformLocation(t,n);const{type:c,value:u}=a;c.includes("Matrix")?r[c](i,!1,u):r[c](i,u)})}render(r=this.type){const{gl:t,sourceSize:o}=this;t.drawArrays(t[r],0,o)}}const m=document.querySelector("#canvas");m.width=window.innerWidth;m.height=window.innerHeight;const h=m.getContext("webgl"),P=v(h,A,E);let R=new Float32Array([0,.2,0,1,0,0,1,-.2,-.2,0,0,1,0,1,.2,-.2,0,0,0,1,1]),x=new p({gl:h,program:P,source:R,type:"TRIANGLES",attribute:{a_Position:{size:3,index:0},a_Color:{size:4,index:3}},uniforms:{}});h.clearColor(0,0,0,1);h.clear(h.COLOR_BUFFER_BIT);x.render();
