var v=Object.defineProperty;var A=(t,e,r)=>e in t?v(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var c=(t,e,r)=>(A(t,typeof e!="symbol"?e+"":e,r),r);import"./modulepreload-polyfill.b7f2da20.js";import{V as S,M as g}from"./vendor.e4f064a4.js";var P=`attribute vec4 a_Position;

attribute vec3 a_Color;
varying vec3 v_Color;
uniform mat4 u_ModelMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjectMatrix;

void main() {

  gl_Position = u_ProjectMatrix * u_ViewMatrix *u_ModelMatrix * a_Position;
  v_Color = a_Color;
}`,M=`precision mediump float;
uniform sampler2D u_Sampler;
varying vec3 v_Color;
void main() {
  // vec4 o = texture2D(u_Sampler, v_Pin);
  gl_FragColor = vec4(v_Color.x,v_Color.y,v_Color.z,1.0);
  
}`;function U(t,e,r){const o=t.createProgram(),n=d(t,t.VERTEX_SHADER,e),a=d(t,t.FRAGMENT_SHADER,r);if(t.attachShader(o,n),t.attachShader(o,a),t.linkProgram(o),t.useProgram(o),t.getProgramParameter(o,t.LINK_STATUS)===!1){const i=t.getProgramInfoLog(o).trim(),s=x(t,n,"vertex"),u=x(t,a,"fragment");console.error("THREE.WebGLProgram: Shader Error "+t.getError()+" - VALIDATE_STATUS "+t.getProgramParameter(o,t.VALIDATE_STATUS)+`

Program Info Log: `+i+`
`+s+`
`+u)}return o}function x(t,e,r){const o=t.getShaderParameter(e,t.COMPILE_STATUS),n=t.getShaderInfoLog(e).trim();if(o&&n==="")return"";const a=/ERROR: 0:(\d+)/.exec(n);if(a){const i=parseInt(a[1]);return r.toUpperCase()+`

`+n+`

`+w(t.getShaderSource(e),i)}else return n}function w(t,e){const r=t.split(`
`),o=[],n=Math.max(e-6,0),a=Math.min(e+6,r.length);for(let i=n;i<a;i++){const s=i+1;o.push(`${s===e?">":" "} ${s}: ${r[i]}`)}return o.join(`
`)}function d(t,e,r){const o=t.createShader(e);return o&&(t.shaderSource(o,r),t.compileShader(o)),o}const b=()=>({gl:null,program:null,type:"POINTS",source:new Float32Array,sourceSize:0,elementBytes:0,categorySize:0,categoryBytes:0,attributes:{},uniforms:{},maps:{}});class B{constructor(e){c(this,"gl");c(this,"type");c(this,"source");c(this,"attribute");c(this,"uniforms");c(this,"sourceSize");c(this,"elementBytes");c(this,"categorySize");c(this,"categoryBytes");c(this,"program");c(this,"maps");Object.assign(this,b(),e),this.init()}init(){this.calculateSourceSize(),this.initAttribute(),this.initUniforms()}calculateSourceSize(){this.elementBytes=this.source.BYTES_PER_ELEMENT;let{attribute:e,source:r}=this,o=0;Object.entries(e).forEach(([n,a])=>{o+=a.size}),this.categorySize=o,this.categoryBytes=o*this.elementBytes,this.sourceSize=r.length/o}initAttribute(){let{attribute:e,gl:r,program:o,source:n,categorySize:a,categoryBytes:i,elementBytes:s}=this;const u=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,u),r.bufferData(r.ARRAY_BUFFER,n,r.STATIC_DRAW),Object.entries(e).forEach(([h,m])=>{let l=r.getAttribLocation(o,h);r.vertexAttribPointer(l,m.size,r.FLOAT,!1,i,m.index*s),r.enableVertexAttribArray(l)})}initUniforms(){let{gl:e,program:r,uniforms:o}=this;Object.entries(o).forEach(([n,a])=>{let i=e.getUniformLocation(r,n);const{type:s,value:u}=a;s.includes("Matrix")?e[s](i,!1,u):e[s](i,u)})}initMaps(){let{gl:e,program:r,maps:o}=this;Object.entries(o).forEach(([n,a],i)=>{const{format:s="RGB",image:u,wrapS:h,wrapT:m,magFilter:l,minFilter:E}=a;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.activeTexture(e[`TEXTURE${i}`]);const R=e.createTexture();e.bindTexture(e.TEXTURE_2D,R),e.texImage2D(e.TEXTURE_2D,0,e[s],e[s],e.UNSIGNED_BYTE,u),h&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e[h]),m&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e[m]),l&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e[l]),(!E||e[E]>e.LINEAR)&&e.generateMipmap(e.TEXTURE_2D),E&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e[E]);const y=e.getUniformLocation(r,n);e.uniform1i(y,i)})}render(e=this.type){const{gl:r,sourceSize:o}=this;e&&r.drawArrays(r[e],0,o)}}const f=document.querySelector("#canvas");f.width=window.innerWidth;f.height=window.innerHeight;const _=f.getContext("webgl"),L=U(_,P,M);let I=new S(.2,.2,.2),C=new S(0,0,0),D=new S(0,1,0),z=new g().lookAt(I,C,D);const T=2,F=f.width/f.height,p=T*F,[X,O,j,N,V,G]=[-p,p,T,-T,0,4];let W=new g().makeOrthographic(X,O,j,N,V,G);const H=new Float32Array([0,.5,-.4,1,0,0,-.5,-.5,-.4,1,0,0,.5,-.5,-.4,1,0,0,0,.5,-.2,0,1,0,-.5,-.5,-.2,0,1,0,.5,-.5,-.2,0,1,0,0,.5,0,0,0,1,-.5,-.5,0,0,0,1,.5,-.5,0,0,0,1]);let Y=new B({gl:_,program:L,source:H,type:"TRIANGLES",attribute:{a_Position:{size:3,index:0},a_Color:{size:3,index:3}},uniforms:{u_ModelMatrix:{type:"uniformMatrix4fv",value:new g().elements},u_ViewMatrix:{type:"uniformMatrix4fv",value:z.elements},u_ProjectMatrix:{type:"uniformMatrix4fv",value:W.elements}}});k();function k(){_.clearColor(0,0,0,1),_.clear(_.COLOR_BUFFER_BIT),Y.render()}
