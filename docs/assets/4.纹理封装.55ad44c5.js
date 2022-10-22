var x=Object.defineProperty;var y=(t,e,r)=>e in t?x(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var c=(t,e,r)=>(y(t,typeof e!="symbol"?e+"":e,r),r);import"./modulepreload-polyfill.b7f2da20.js";var U=`attribute vec4 a_Position;
attribute vec2 a_Pin;
varying vec2 v_Pin;


void main() {

  gl_Position = a_Position;
  v_Pin = a_Pin;

}`,b=`precision mediump float;
uniform sampler2D u_Sampler;
varying vec2 v_Pin;
void main() {
  gl_FragColor = texture2D(u_Sampler, v_Pin);
}`;function v(t,e,r){const n=t.createProgram(),o=d(t,t.VERTEX_SHADER,e),a=d(t,t.FRAGMENT_SHADER,r);if(t.attachShader(n,o),t.attachShader(n,a),t.linkProgram(n),t.useProgram(n),t.getProgramParameter(n,t.LINK_STATUS)===!1){const i=t.getProgramInfoLog(n).trim(),s=f(t,o,"vertex"),m=f(t,a,"fragment");console.error("THREE.WebGLProgram: Shader Error "+t.getError()+" - VALIDATE_STATUS "+t.getProgramParameter(n,t.VALIDATE_STATUS)+`

Program Info Log: `+i+`
`+s+`
`+m)}return n}function f(t,e,r){const n=t.getShaderParameter(e,t.COMPILE_STATUS),o=t.getShaderInfoLog(e).trim();if(n&&o==="")return"";const a=/ERROR: 0:(\d+)/.exec(o);if(a){const i=parseInt(a[1]);return r.toUpperCase()+`

`+o+`

`+I(t.getShaderSource(e),i)}else return o}function I(t,e){const r=t.split(`
`),n=[],o=Math.max(e-6,0),a=Math.min(e+6,r.length);for(let i=o;i<a;i++){const s=i+1;n.push(`${s===e?">":" "} ${s}: ${r[i]}`)}return n.join(`
`)}function d(t,e,r){const n=t.createShader(e);return n&&(t.shaderSource(n,r),t.compileShader(n)),n}const B=()=>({gl:null,program:null,type:"POINTS",source:new Float32Array,sourceSize:0,elementBytes:0,categorySize:0,categoryBytes:0,attributes:{},uniforms:{},maps:{}});class L{constructor(e){c(this,"gl");c(this,"type");c(this,"source");c(this,"attribute");c(this,"uniforms");c(this,"sourceSize");c(this,"elementBytes");c(this,"categorySize");c(this,"categoryBytes");c(this,"program");c(this,"maps");Object.assign(this,B(),e),this.init()}init(){this.calculateSourceSize(),this.initAttribute(),this.initUniforms()}calculateSourceSize(){this.elementBytes=this.source.BYTES_PER_ELEMENT;let{attribute:e,source:r}=this,n=0;Object.entries(e).forEach(([o,a])=>{n+=a.size}),this.categorySize=n,this.categoryBytes=n*this.elementBytes,this.sourceSize=r.length/n}initAttribute(){let{attribute:e,gl:r,program:n,source:o,categorySize:a,categoryBytes:i,elementBytes:s}=this;const m=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,m),r.bufferData(r.ARRAY_BUFFER,o,r.STATIC_DRAW),Object.entries(e).forEach(([g,u])=>{console.log(u.size,i,u.index*s);let E=r.getAttribLocation(n,g);r.vertexAttribPointer(E,u.size,r.FLOAT,!1,i,u.index*s),r.enableVertexAttribArray(E)})}initUniforms(){let{gl:e,program:r,uniforms:n}=this;Object.entries(n).forEach(([o,a])=>{let i=e.getUniformLocation(r,o);const{type:s,value:m}=a;s.includes("Matrix")?e[s](i,!1,m):e[s](i,m)})}initMaps(){let{gl:e,program:r,maps:n}=this;console.log(n),Object.entries(n).forEach(([o,a],i)=>{const{format:s="RGB",image:m,wrapS:g,wrapT:u,magFilter:E,minFilter:S}=a;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.activeTexture(e[`TEXTURE${i}`]);const P=e.createTexture();e.bindTexture(e.TEXTURE_2D,P),e.texImage2D(e.TEXTURE_2D,0,e[s],e[s],e.UNSIGNED_BYTE,m),g&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e[g]),u&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e[u]),E&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e[E]),(!S||e[S]>e.LINEAR)&&e.generateMipmap(e.TEXTURE_2D),S&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e[S]);const A=e.getUniformLocation(r,o);e.uniform1i(A,i)})}render(e=this.type){const{gl:r,sourceSize:n}=this;e&&r.drawArrays(r[e],0,n)}}const l=document.querySelector("#canvas");l.width=window.innerWidth;l.height=window.innerHeight;const T=l.getContext("webgl"),D=v(T,U,b),R=1,p=1,z=new Float32Array([-.5,.5,0,R,-.5,-.5,0,0,.5,.5,p,R,.5,-.5,p,0]);let h=new L({gl:T,program:D,source:z,type:"TRIANGLE_STRIP",attribute:{a_Position:{size:2,index:0},a_Pin:{size:2,index:2}},uniforms:{}}),_=new Image;_.src="./img/512.jpg";_.onload=()=>{h.maps={u_Sampler:{image:_}},h.initMaps(),F()};function F(){T.clearColor(0,0,0,1),T.clear(T.COLOR_BUFFER_BIT),h.render()}
