var y=Object.defineProperty;var U=(t,e,r)=>e in t?y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var m=(t,e,r)=>(U(t,typeof e!="symbol"?e+"":e,r),r);import"./modulepreload-polyfill.b7f2da20.js";import{M as b,g as D,i as M}from"./vendor.e4f064a4.js";var I=`attribute vec4 a_Position;

attribute vec2 a_Pin;
varying vec2 v_Pin;
uniform mat4 u_ModelMatrix;

void main() {

  gl_Position = u_ModelMatrix * a_Position;
  v_Pin = a_Pin;

}`,L=`precision mediump float;
uniform sampler2D u_Sampler;
uniform sampler2D u_Pattern1;
uniform sampler2D u_Pattern2;
uniform sampler2D u_Mask;
uniform float u_Ratio;
varying vec2 v_Pin;
void main() {
  vec4 o = texture2D(u_Sampler, v_Pin);
  vec4 p1 = texture2D(u_Pattern1, v_Pin);
  vec4 p2 = texture2D(u_Pattern2, v_Pin);
  vec4 m = texture2D(u_Mask, v_Pin);
  vec4 p3 = vec4(1, 1, 1, 1);
  if(m.x > 0.5) {
    p3 = mix(p1, p2, u_Ratio);

  }
  
  gl_FragColor = p3 * o;
  

}`;function B(t,e,r){const n=t.createProgram(),a=R(t,t.VERTEX_SHADER,e),o=R(t,t.FRAGMENT_SHADER,r);if(t.attachShader(n,a),t.attachShader(n,o),t.linkProgram(n),t.useProgram(n),t.getProgramParameter(n,t.LINK_STATUS)===!1){const i=t.getProgramInfoLog(n).trim(),s=d(t,a,"vertex"),l=d(t,o,"fragment");console.error("THREE.WebGLProgram: Shader Error "+t.getError()+" - VALIDATE_STATUS "+t.getProgramParameter(n,t.VALIDATE_STATUS)+`

Program Info Log: `+i+`
`+s+`
`+l)}return n}function d(t,e,r){const n=t.getShaderParameter(e,t.COMPILE_STATUS),a=t.getShaderInfoLog(e).trim();if(n&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const i=parseInt(o[1]);return r.toUpperCase()+`

`+a+`

`+w(t.getShaderSource(e),i)}else return a}function w(t,e){const r=t.split(`
`),n=[],a=Math.max(e-6,0),o=Math.min(e+6,r.length);for(let i=a;i<o;i++){const s=i+1;n.push(`${s===e?">":" "} ${s}: ${r[i]}`)}return n.join(`
`)}function R(t,e,r){const n=t.createShader(e);return n&&(t.shaderSource(n,r),t.compileShader(n)),n}function T(t){return new Promise((e,r)=>{let n=new Image;n.src=t,n.onload=()=>{e(n)},n.onerror=a=>{r(a)}})}const F=()=>({gl:null,program:null,type:"POINTS",source:new Float32Array,sourceSize:0,elementBytes:0,categorySize:0,categoryBytes:0,attributes:{},uniforms:{},maps:{}});class z{constructor(e){m(this,"gl");m(this,"type");m(this,"source");m(this,"attribute");m(this,"uniforms");m(this,"sourceSize");m(this,"elementBytes");m(this,"categorySize");m(this,"categoryBytes");m(this,"program");m(this,"maps");Object.assign(this,F(),e),this.init()}init(){this.calculateSourceSize(),this.initAttribute(),this.initUniforms()}calculateSourceSize(){this.elementBytes=this.source.BYTES_PER_ELEMENT;let{attribute:e,source:r}=this,n=0;Object.entries(e).forEach(([a,o])=>{n+=o.size}),this.categorySize=n,this.categoryBytes=n*this.elementBytes,this.sourceSize=r.length/n}initAttribute(){let{attribute:e,gl:r,program:n,source:a,categorySize:o,categoryBytes:i,elementBytes:s}=this;const l=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,l),r.bufferData(r.ARRAY_BUFFER,a,r.STATIC_DRAW),Object.entries(e).forEach(([g,_])=>{let f=r.getAttribLocation(n,g);r.vertexAttribPointer(f,_.size,r.FLOAT,!1,i,_.index*s),r.enableVertexAttribArray(f)})}initUniforms(){let{gl:e,program:r,uniforms:n}=this;Object.entries(n).forEach(([a,o])=>{let i=e.getUniformLocation(r,a);const{type:s,value:l}=o;s.includes("Matrix")?e[s](i,!1,l):e[s](i,l)})}initMaps(){let{gl:e,program:r,maps:n}=this;Object.entries(n).forEach(([a,o],i)=>{const{format:s="RGB",image:l,wrapS:g,wrapT:_,magFilter:f,minFilter:p}=o;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.activeTexture(e[`TEXTURE${i}`]);const v=e.createTexture();e.bindTexture(e.TEXTURE_2D,v),e.texImage2D(e.TEXTURE_2D,0,e[s],e[s],e.UNSIGNED_BYTE,l),g&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e[g]),_&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e[_]),f&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e[f]),(!p||e[p]>e.LINEAR)&&e.generateMipmap(e.TEXTURE_2D),p&&e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e[p]);const A=e.getUniformLocation(r,a);e.uniform1i(A,i)})}render(e=this.type){const{gl:r,sourceSize:n}=this;e&&r.drawArrays(r[e],0,n)}}const S=document.querySelector("#canvas");S.width=window.innerWidth;S.height=window.innerHeight;const c=S.getContext("webgl"),C=B(c,I,L);c.enable(c.DEPTH_TEST);c.enable(c.CULL_FACE);const X=new Float32Array([-.4,.8,0,1,-.4,-.8,0,0,.4,.8,1,1,.4,-.8,1,0]);let E=0,h={ratio:0},u=new z({gl:c,program:C,source:X,type:"TRIANGLE_STRIP",attribute:{a_Position:{size:2,index:0},a_Pin:{size:2,index:2}},uniforms:{u_ModelMatrix:{type:"uniformMatrix4fv",value:new b().elements},u_Ratio:{type:"uniform1f",value:h.ratio}}});Promise.all([T("./img/dress.jpg"),T("./img/mask-dress.jpg")]).then(([t,e])=>{console.log(u),u.maps.u_Sampler={image:t},u.maps.u_Mask={image:e},P()});function P(){let t=`./img/parttern/pattern${E%5}.jpg`,e=`./img/parttern/pattern${(E+1)%5}.jpg`;Promise.all([T(t),T(e)]).then(([r,n])=>{h.ratio=0,u.maps.u_Pattern1={image:r},u.maps.u_Pattern2={image:n},u.initMaps(),D.to(h,{ratio:1,duration:1.5,onComplete:()=>{E++,P()}})})}x();let j={fn:()=>{E++,P()}},O=new M.GUI;O.add(j,"fn").name("\u6362\u88C5");function x(){u.uniforms.u_Ratio.value=h.ratio,u.initUniforms(),N(),requestAnimationFrame(x)}function N(){c.clearColor(0,0,0,1),c.clear(c.COLOR_BUFFER_BIT),u.render()}
