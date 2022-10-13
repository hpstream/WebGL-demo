import"./modulepreload-polyfill.b7f2da20.js";var s=`attribute vec4 a_Position;
attribute float a_PointSize;

void main() {

  gl_Position = a_Position;
  gl_PointSize = a_PointSize;
}`,S=`
void main(){
  gl_FragColor = vec4(1,1,0,1);
}`;function _(t,n,a){const e=t.createProgram(),d=i(t,t.VERTEX_SHADER,n),h=i(t,t.FRAGMENT_SHADER,a);return t.attachShader(e,d),t.attachShader(e,h),t.linkProgram(e),t.useProgram(e),e}function i(t,n,a){const e=t.createShader(n);return e&&(t.shaderSource(e,a),t.compileShader(e)),e}const o=document.querySelector("#canvas");o.width=window.innerWidth;o.height=window.innerHeight;const r=o.getContext("webgl"),c=_(r,s,S),P=r.getAttribLocation(c,"a_Position"),m=r.getAttribLocation(c,"a_PointSize");r.vertexAttrib2f(P,1,1);r.vertexAttrib1f(m,50);r.clearColor(0,0,0,1);r.clear(r.COLOR_BUFFER_BIT);r.drawArrays(r.POINTS,0,1);
