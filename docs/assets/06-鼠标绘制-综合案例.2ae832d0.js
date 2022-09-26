import"./modulepreload-polyfill.b7f2da20.js";import{i as f,g as _,a as g}from"./utils.98e3bd0f.js";import{P as v}from"./Ploy.cafb7963.js";import{g as h}from"./vendor.36f02d62.js";var y=`attribute vec4 a_Attr;
varying float v_Alpha;

void main() {
  gl_Position = vec4(a_Attr.x, a_Attr.y, 0.0, 1.0);
  gl_PointSize = a_Attr.z;
  v_Alpha = a_Attr.w;
}`,S=`precision mediump float;
uniform bool u_IsPOINTS;
varying float v_Alpha;

void main() {
  if(u_IsPOINTS) {
    float dis = distance(gl_PointCoord, vec2(0.5, 0.5));
    if(dis <= 0.5) {
      gl_FragColor = vec4(0.87, 0.91, 1, v_Alpha);
    } else {
      discard;
    }
  } else {
    gl_FragColor = vec4(0.87, 0.91, 1, v_Alpha);
  }

}`;const i=document.querySelector("#canvas");i.width=window.innerWidth;i.height=window.innerHeight;const e=i.getContext("webgl");e.enable(e.BLEND);e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA);let A=f(e,y,S);e.clearColor(0,0,0,1);e.clear(e.COLOR_BUFFER_BIT);let u,a=new v({gl:e,program:A,attrName:"a_Attr",size:4,vertices:[],types:["POINTS","LINE_STRIP"],circleDot:!0});i.oncontextmenu=function(){return!1};let l;i.addEventListener("mousedown",t=>{clearTimeout(u),u=setTimeout(()=>{const{x:o,y:n}=_(t,i);e.clear(e.COLOR_BUFFER_BIT),console.log(t.detail),t.detail===1?(l==0&&P(),x(o,n)):t.detail>=2&&C()},100)});let r=[];function P(){l=1,a.emptyVertice()}function x(t,o){let n={x:t,y:o,a:1,pointSize:10};h.from(n,{a:0,pointSize:0,yoyo:!0,repeat:-1,duration:.5}),r.push(n),a.geoData=r,l=1}function C(){l=0,r.pop()}function I(t,o,n){r[r.length-1].x=o,r[r.length-1].y=n}function F(t,o){for(let n of r){let s=n;const p={x:t-s.x,y:o-s.y},{x:c,y:d}=g(p,i);if(c*c+d*d<100)return s}return null}i.addEventListener("mousemove",t=>{const{x:o,y:n}=_(t,i);let s=F(o,n);i.style.cursor=s?"pointer":"default",console.log(l,1),a.count-1>0&&l==1&&(e.clear(e.COLOR_BUFFER_BIT),I(a.count-1,o,n))});function m(){a.updateVertices(["x","y","pointSize","a"]),e.clear(e.COLOR_BUFFER_BIT),a.draw(),requestAnimationFrame(m)}m();
