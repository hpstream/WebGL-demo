var P=Object.defineProperty;var R=(t,e,r)=>e in t?P(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var c=(t,e,r)=>(R(t,typeof e!="symbol"?e+"":e,r),r);import"./modulepreload-polyfill.b7f2da20.js";import{M as x}from"./vendor.e4f064a4.js";var v=`attribute vec4 a_Position;

attribute vec2 a_Pin;
varying vec2 v_Pin;
uniform mat4 u_ModelMatrix;

void main() {

  gl_Position = u_ModelMatrix * a_Position;
  v_Pin = a_Pin;

}`,U=`precision mediump float;
uniform sampler2D u_Sampler;
varying vec2 v_Pin;
void main() {
  vec4 o = texture2D(u_Sampler, v_Pin);
  gl_FragColor = o;
  
}`;function b(t,e,r){const n=t.createProgram(),i=p(t,t.VERTEX_SHADER,e),o=p(t,t.FRAGMENT_SHADER,r);if(t.attachShader(n,i),t.attachShader(n,o),t.linkProgram(n),t.useProgram(n),t.getProgramParameter(n,t.LINK_STATUS)===!1){const a=t.getProgramInfoLog(n).trim(),s=g(t,i,"vertex"),u=g(t,o,"fragment");console.error("THREE.WebGLProgram: Shader Error "+t.getError()+" - VALIDATE_STATUS "+t.getProgramParameter(n,t.VALIDATE_STATUS)+`

Program Info Log: `+a+`
`+s+`
`+u)}return n}function g(t,e,r){const n=t.getShaderParameter(e,t.COMPILE_STATUS),i=t.getShaderInfoLog(e).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const a=parseInt(o[1]);return r.toUpperCase()+`

`+i+`

`+L(t.getShaderSource(e),a)}else return i}function L(t,e){const r=t.split(`
`),n=[],i=Math.max(e-6,0),o=Math.min(e+6,r.length);for(let a=i;a<o;a++){const s=a+1;n.push(`${s===e?">":" "} ${s}: ${r[a]}`)}return n.join(`
`)}function p(t,e,r){const n=t.createShader(e);return n&&(t.shaderSource(n,r),t.compileShader(n)),n}const M=()=>({gl:null,program:null,type:"POINTS",source:new Float32Array,sourceSize:0,elementBytes:0,categorySize:0,categoryBytes:0,attributes:{},uniforms:{},maps:{}});class I{constructor(e){c(this,"gl");c(this,"type");c(this,"source");c(this,"attribute");c(this,"uniforms");c(this,"sourceSize");c(this,"elementBytes");c(this,"categorySize");c(this,"categoryBytes");c(this,"program");c(this,"maps");Object.assign(this,M(),e),this.init()}init(){this.calculateSourceSize(),this.initAttribute(),this.initUniforms()}calculateSourceSize(){this.elementBytes=this.source.BYTES_PER_ELEMENT;let{attribute:e,source:r}=this,n=0;Object.entries(e).forEach(([i,o])=>{n+=o.size}),this.categorySize=n,this.categoryBytes=n*this.elementBytes,this.sourceSize=r.length/n}initAttribute(){let{attribute:e,gl:r,program:n,source:i,categorySize:o,categoryBytes:a,elementBytes:s}=this;const u=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,u),r.bufferData(r.ARRAY_BUFFER,i,r.STATIC_DRAW),Object.entries(e).forEach(([_,l])=>{let T=r.getAttribLocation(n,_);r.vertexAttribPointer(T,l.size,r.FLOAT,!1,a,l.index*s),r.enableVertexAttribArray(T)})}initUniforms(){let{gl:e,program:r,uniforms:n}=this;Object.entries(n).forEach(([i,o])=>{let a=e.getUniformLocation(r,i);const{type:s,value:u}=o;s.includes("Matrix")?e[s](a,!1,u):e[s](a,u)})}initMaps(){let{gl:e,program:r,maps:n}=this;Object.entries(n).forEach(([i,o],a)=>{const{format:s="RGB",image:u,wrapS:_,wrapT:l,magFilter:T,minFilter:S}=o;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.activeTexture(e[`TEXTURE${a}`]);const A=e.createTexture();e.bindTexture(e.TEXTURE_2D,A),e.texImage2D(e.TEXTURE_2D,0,e[s],e[s],e.UNSIGNED_BYTE,u),_&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e[_]),l&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e[l]),T&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e[T]),(!S||e[S]>e.LINEAR)&&e.generateMipmap(e.TEXTURE_2D),S&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e[S]);const y=e.getUniformLocation(r,i);e.uniform1i(y,a)})}render(e=this.type){const{gl:r,sourceSize:n}=this;e&&r.drawArrays(r[e],0,n)}}const f=document.querySelector("#canvas");f.width=window.innerWidth;f.height=window.innerHeight;const m=f.getContext("webgl"),B=b(m,v,U);m.enable(m.DEPTH_TEST);m.enable(m.CULL_FACE);const D=new Float32Array([-.5,.4,0,1,-.5,-.4,0,0,.5,.4,1,1,.5,-.4,1,0]);let h=new I({gl:m,program:B,source:D,type:"TRIANGLE_STRIP",attribute:{a_Position:{size:2,index:0},a_Pin:{size:2,index:2}},uniforms:{u_ModelMatrix:{type:"uniformMatrix4fv",value:new x().elements}}});const E=document.createElement("video");E.src="http://img.yxyy.name/ripples.mp4";E.autoplay=!0;E.muted=!0;E.loop=!0;E.setAttribute("crossOrigin","Anonymous");E.play();E.addEventListener("playing",()=>{h.maps.u_Sampler={image:E,wrapS:"CLAMP_TO_EDGE",wrapT:"CLAMP_TO_EDGE",minFilter:"LINEAR"}});d();function d(){h.initMaps(),F(),requestAnimationFrame(d)}function F(){m.clearColor(0,0,0,1),m.clear(m.COLOR_BUFFER_BIT),h.render()}
