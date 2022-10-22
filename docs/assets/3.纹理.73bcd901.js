var f=Object.defineProperty;var d=(t,r,n)=>r in t?f(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;var E=(t,r,n)=>(d(t,typeof r!="symbol"?r+"":r,n),n);import"./modulepreload-polyfill.b7f2da20.js";var x=`attribute vec4 a_Position;
attribute vec2 a_Pin;
varying vec2 v_Pin;


void main() {

  gl_Position = a_Position;
  v_Pin = a_Pin;

}`,y=`precision mediump float;
uniform sampler2D u_Sampler;
varying vec2 v_Pin;
void main() {
  gl_FragColor = texture2D(u_Sampler, v_Pin);
}`;function I(t,r,n){const o=t.createProgram(),i=A(t,t.VERTEX_SHADER,r),s=A(t,t.FRAGMENT_SHADER,n);if(t.attachShader(o,i),t.attachShader(o,s),t.linkProgram(o),t.useProgram(o),t.getProgramParameter(o,t.LINK_STATUS)===!1){const a=t.getProgramInfoLog(o).trim(),c=R(t,i,"vertex"),m=R(t,s,"fragment");console.error("THREE.WebGLProgram: Shader Error "+t.getError()+" - VALIDATE_STATUS "+t.getProgramParameter(o,t.VALIDATE_STATUS)+`

Program Info Log: `+a+`
`+c+`
`+m)}return o}function R(t,r,n){const o=t.getShaderParameter(r,t.COMPILE_STATUS),i=t.getShaderInfoLog(r).trim();if(o&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+i+`

`+p(t.getShaderSource(r),a)}else return i}function p(t,r){const n=t.split(`
`),o=[],i=Math.max(r-6,0),s=Math.min(r+6,n.length);for(let a=i;a<s;a++){const c=a+1;o.push(`${c===r?">":" "} ${c}: ${n[a]}`)}return o.join(`
`)}function A(t,r,n){const o=t.createShader(r);return o&&(t.shaderSource(o,n),t.compileShader(o)),o}const L=()=>({gl:null,program:null,type:"POINTS",source:new Float32Array,sourceSize:0,elementBytes:0,categorySize:0,categoryBytes:0,attributes:{},uniforms:{}});class U{constructor(r){E(this,"gl");E(this,"type");E(this,"source");E(this,"attribute");E(this,"uniforms");E(this,"sourceSize");E(this,"elementBytes");E(this,"categorySize");E(this,"categoryBytes");E(this,"program");Object.assign(this,L(),r),this.init()}init(){this.calculateSourceSize(),this.initAttribute(),this.initUniforms()}calculateSourceSize(){this.elementBytes=this.source.BYTES_PER_ELEMENT;let{attribute:r,source:n}=this,o=0;Object.entries(r).forEach(([i,s])=>{o+=s.size}),this.categorySize=o,this.categoryBytes=o*this.elementBytes,this.sourceSize=n.length/o}initAttribute(){let{attribute:r,gl:n,program:o,source:i,categorySize:s,categoryBytes:a,elementBytes:c}=this;const m=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,m),n.bufferData(n.ARRAY_BUFFER,i,n.STATIC_DRAW),Object.entries(r).forEach(([g,_])=>{console.log(_.size,a,_.index*c);let T=n.getAttribLocation(o,g);n.vertexAttribPointer(T,_.size,n.FLOAT,!1,a,_.index*c),n.enableVertexAttribArray(T)})}initUniforms(){let{gl:r,program:n,uniforms:o}=this;Object.entries(o).forEach(([i,s])=>{let a=r.getUniformLocation(n,i);const{type:c,value:m}=s;c.includes("Matrix")?r[c](a,!1,m):r[c](a,m)})}render(r=this.type){const{gl:n,sourceSize:o}=this;n.drawArrays(n[r],0,o)}}const S=document.querySelector("#canvas");S.width=window.innerWidth;S.height=window.innerHeight;const e=S.getContext("webgl"),P=I(e,x,y),h=1,l=1,b=new Float32Array([-.5,.5,0,h,-.5,-.5,0,0,.5,.5,l,h,.5,-.5,l,0]);let v=new U({gl:e,program:P,source:b,type:"TRIANGLE_STRIP",attribute:{a_Position:{size:2,index:0},a_Pin:{size:2,index:2}},uniforms:{}}),u=new Image;u.src="./img/512.jpg";u.onload=()=>{e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.activeTexture(e.TEXTURE0);const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.RGB,e.RGB,e.UNSIGNED_BYTE,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.MIRRORED_REPEAT),console.log(e.LINEAR,e.NEAREST,e.NEAREST_MIPMAP_LINEAR,e.NEAREST_MIPMAP_LINEAR,e.LINEAR_MIPMAP_NEAREST,e.LINEAR_MIPMAP_LINEAR);const r=e.getUniformLocation(P,"u_Sampler");e.uniform1i(r,0),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),v.render()};
