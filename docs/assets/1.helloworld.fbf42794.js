import"./modulepreload-polyfill.b7f2da20.js";const a=document.querySelector("#canvas");a.width=window.innerWidth;a.height=window.innerHeight;const e=a.getContext("webgl");let n=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}
`,c=`
void main() {

  gl_Position = vec4(0, 0, 0, 1);
  gl_PointSize = 50.0;
}
`;const r=e.createProgram(),t=e.createShader(e.VERTEX_SHADER);e.shaderSource(t,c);e.compileShader(t);const o=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(o,n);e.compileShader(o);e.attachShader(r,t);e.attachShader(r,o);e.linkProgram(r);e.useProgram(r);e.clearColor(0,0,0,1);e.clear(e.COLOR_BUFFER_BIT);e.drawArrays(e.POINTS,0,1);
