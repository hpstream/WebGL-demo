var A=Object.defineProperty;var P=(t,e,r)=>e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var c=(t,e,r)=>(P(t,typeof e!="symbol"?e+"":e,r),r);import"./modulepreload-polyfill.b7f2da20.js";import{V as x,P as M,M as T}from"./vendor.e4f064a4.js";var w=`attribute vec4 a_Position;

attribute vec3 a_Color;
varying vec3 v_Color;
uniform mat4 u_ModelMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjectMatrix;

void main() {

  gl_Position = u_ProjectMatrix * u_ViewMatrix *u_ModelMatrix * a_Position;
  v_Color = a_Color;
}`,U=`precision mediump float;
uniform sampler2D u_Sampler;
varying vec3 v_Color;
void main() {
  // vec4 o = texture2D(u_Sampler, v_Pin);
  gl_FragColor = vec4(v_Color.x,v_Color.y,v_Color.z,1.0);
  
}`;function b(t,e,r){const o=t.createProgram(),i=d(t,t.VERTEX_SHADER,e),a=d(t,t.FRAGMENT_SHADER,r);if(t.attachShader(o,i),t.attachShader(o,a),t.linkProgram(o),t.useProgram(o),t.getProgramParameter(o,t.LINK_STATUS)===!1){const n=t.getProgramInfoLog(o).trim(),s=p(t,i,"vertex"),u=p(t,a,"fragment");console.error("THREE.WebGLProgram: Shader Error "+t.getError()+" - VALIDATE_STATUS "+t.getProgramParameter(o,t.VALIDATE_STATUS)+`

Program Info Log: `+n+`
`+s+`
`+u)}return o}function p(t,e,r){const o=t.getShaderParameter(e,t.COMPILE_STATUS),i=t.getShaderInfoLog(e).trim();if(o&&i==="")return"";const a=/ERROR: 0:(\d+)/.exec(i);if(a){const n=parseInt(a[1]);return r.toUpperCase()+`

`+i+`

`+B(t.getShaderSource(e),n)}else return i}function B(t,e){const r=t.split(`
`),o=[],i=Math.max(e-6,0),a=Math.min(e+6,r.length);for(let n=i;n<a;n++){const s=n+1;o.push(`${s===e?">":" "} ${s}: ${r[n]}`)}return o.join(`
`)}function d(t,e,r){const o=t.createShader(e);return o&&(t.shaderSource(o,r),t.compileShader(o)),o}const L=()=>({gl:null,program:null,type:"POINTS",source:new Float32Array,sourceSize:0,elementBytes:0,categorySize:0,categoryBytes:0,attributes:{},uniforms:{},maps:{}});class I{constructor(e){c(this,"gl");c(this,"type");c(this,"source");c(this,"attribute");c(this,"uniforms");c(this,"sourceSize");c(this,"elementBytes");c(this,"categorySize");c(this,"categoryBytes");c(this,"program");c(this,"maps");Object.assign(this,L(),e),this.init()}init(){this.calculateSourceSize(),this.initAttribute(),this.initUniforms()}calculateSourceSize(){this.elementBytes=this.source.BYTES_PER_ELEMENT;let{attribute:e,source:r}=this,o=0;Object.entries(e).forEach(([i,a])=>{o+=a.size}),this.categorySize=o,this.categoryBytes=o*this.elementBytes,this.sourceSize=r.length/o}initAttribute(){let{attribute:e,gl:r,program:o,source:i,categorySize:a,categoryBytes:n,elementBytes:s}=this;const u=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,u),r.bufferData(r.ARRAY_BUFFER,i,r.STATIC_DRAW),Object.entries(e).forEach(([E,m])=>{let l=r.getAttribLocation(o,E);r.vertexAttribPointer(l,m.size,r.FLOAT,!1,n,m.index*s),r.enableVertexAttribArray(l)})}initUniforms(){let{gl:e,program:r,uniforms:o}=this;Object.entries(o).forEach(([i,a])=>{let n=e.getUniformLocation(r,i);const{type:s,value:u}=a;s.includes("Matrix")?e[s](n,!1,u):e[s](n,u)})}initMaps(){let{gl:e,program:r,maps:o}=this;Object.entries(o).forEach(([i,a],n)=>{const{format:s="RGB",image:u,wrapS:E,wrapT:m,magFilter:l,minFilter:h}=a;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.activeTexture(e[`TEXTURE${n}`]);const y=e.createTexture();e.bindTexture(e.TEXTURE_2D,y),e.texImage2D(e.TEXTURE_2D,0,e[s],e[s],e.UNSIGNED_BYTE,u),E&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e[E]),m&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e[m]),l&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e[l]),(!h||e[h]>e.LINEAR)&&e.generateMipmap(e.TEXTURE_2D),h&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e[h]);const R=e.getUniformLocation(r,i);e.uniform1i(R,n)})}render(e=this.type){const{gl:r,sourceSize:o}=this;e&&r.drawArrays(r[e],0,o)}}const f=document.querySelector("#canvas");f.width=window.innerWidth;f.height=window.innerHeight;const _=f.getContext("webgl"),C=b(_,w,U);let g=new x(.8,.8,4),v=new x(0,0,0),D=new x(0,1,0);const[z,F,X,j]=[45,f.width/f.height,1,20],S=new M(z,F,X,j);S.position.copy(g);S.lookAt(v);S.updateWorldMatrix(!0,!0);const O=new T().setPosition(g),N=new T().lookAt(g,v,D),V=new T().multiplyMatrices(O,N).invert();let G=S.projectionMatrix;const W=new Float32Array([0,.5,-.4,1,0,0,-.5,-.5,-.4,1,0,0,.5,-.5,-.4,1,0,0,0,.5,-.2,0,1,0,-.5,-.5,-.2,0,1,0,.5,-.5,-.2,0,1,0,0,.5,0,0,0,1,-.5,-.5,0,0,0,1,.5,-.5,0,0,0,1]);let Y=new I({gl:_,program:C,source:W,type:"TRIANGLES",attribute:{a_Position:{size:3,index:0},a_Color:{size:3,index:3}},uniforms:{u_ModelMatrix:{type:"uniformMatrix4fv",value:new T().elements},u_ViewMatrix:{type:"uniformMatrix4fv",value:V.elements},u_ProjectMatrix:{type:"uniformMatrix4fv",value:G.elements}}});k();function k(){_.clearColor(0,0,0,1),_.clear(_.COLOR_BUFFER_BIT),Y.render()}
