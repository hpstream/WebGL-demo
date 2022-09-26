import"./modulepreload-polyfill.b7f2da20.js";import{i as c,g as s}from"./utils.98e3bd0f.js";import{P as d}from"./Ploy.cafb7963.js";var m=`attribute vec4 a_Position;

void main() {
  gl_Position = a_Position;
  gl_PointSize = 10.0;
}`,_=`precision mediump float;

uniform bool u_IsPOINTS;

void main() {
  if(u_IsPOINTS) {
    float dis = distance(gl_PointCoord, vec2(0.5, 0.5));
    if(dis <= 0.5) {
      gl_FragColor = vec4(1, 1, 0, 1);

    } else {
      discard;
    }
  } else {
    gl_FragColor = vec4(1, 1, 0, 1);
  }

}`;const t=document.querySelector("#canvas");t.width=window.innerWidth;t.height=window.innerHeight;const n=t.getContext("webgl");let g=c(n,m,_);n.clearColor(0,0,0,1);n.clear(n.COLOR_BUFFER_BIT);let l,e=new d({gl:n,program:g,vertices:[],types:["POINTS","LINE_STRIP"],circleDot:!0});t.oncontextmenu=function(){return!1};let i;t.addEventListener("mousedown",o=>{clearTimeout(l),l=setTimeout(()=>{const{x:r,y:a}=s(o,t);n.clear(n.COLOR_BUFFER_BIT),console.log(o.detail),o.detail===1?(i==0&&(i=1,e.emptyVertice()),e.addVertice(r,a),e.draw()):o.detail>=2&&(i=0,e.popVertice(),e.draw())},100)});t.addEventListener("mousemove",o=>{const{x:r,y:a}=s(o,t);e.count-1>0&&i==1&&(n.clear(n.COLOR_BUFFER_BIT),e.setVertice(e.count-1,r,a),e.draw())});
