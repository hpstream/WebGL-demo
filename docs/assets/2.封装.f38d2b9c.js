import"./modulepreload-polyfill.b7f2da20.js";var h=`void main() {

  gl_Position = vec4(0, 0, 0, 1);
  gl_PointSize = 50.0;
}`,S=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;function s(r,n,t){const e=r.createProgram(),d=i(r,r.VERTEX_SHADER,n),c=i(r,r.FRAGMENT_SHADER,t);return r.attachShader(e,d),r.attachShader(e,c),r.linkProgram(e),r.useProgram(e),e}function i(r,n,t){const e=r.createShader(n);return e&&(r.shaderSource(e,t),r.compileShader(e)),e}const o=document.querySelector("#canvas");o.width=window.innerWidth;o.height=window.innerHeight;const a=o.getContext("webgl");s(a,h,S);a.clearColor(0,0,0,1);a.clear(a.COLOR_BUFFER_BIT);a.drawArrays(a.POINTS,0,1);
