import"./modulepreload-polyfill.b7f2da20.js";import{U as T}from"./vendor.36f02d62.js";import{V as a}from"./index.6c4cc869.js";var P=document.getElementById("app");P.width=512;P.height=512;const n=P.getContext("2d");T.canvas(P);n.translate(256,256);n.scale(1,-1);n.lineCap="round";E([new a(-256,0),new a(256,0)]);E([new a(0,-256),new a(0,256)]);E(x(0,0,100));E(y(0,0,100));E(I(0,0,150,100));function E(t,o="black",c=null){n.strokeStyle=o,n.beginPath(),n.moveTo(t[0].x,t[0].y);for(let e=1;e<t.length;e++)n.lineTo(t[e].x,t[e].y);n.closePath(),c&&(n.fillStyle=c,n.fill()),n.stroke(),t.length>2&&(n.beginPath(),n.moveTo(t[0].x,t[0].y),n.lineTo(t[1].x,t[1].y),n.strokeStyle="red",n.stroke(),n.closePath())}function x(t,o,c,e=0,h=Math.PI*2){const l=Math.PI*2,r=Math.min(l,h-e),M=r===l?[]:[[new a(t,o)]],i=Math.round(30*r/l);for(let s=0;s<=i;s++){const u=s/i,m=e+(h-e)*u,S=t+c*Math.cos(m),f=o+c*Math.sin(m);M.push(new a(S,f))}return M}function y(t,o,c,e=-Math.PI*2,h=Math.PI*2){const l=Math.PI*2,r=Math.min(l,h-e),M=r===l?[]:[new a(t,o)],i=Math.round(60*r/l);for(let s=0;s<=i;s++){const u=s/i,m=e+(h-e)*u,S=t+c*m,f=o+c*m*m;M.push(new a(S,f))}return M}function I(t,o,c,e,h=0,w=Math.PI*2){const r=Math.PI*2,M=Math.min(r,w-h),i=M===r?[]:[new a(t,o)],s=Math.round(30*M/r);for(let u=0;u<=s;u++){const m=u/s,S=h+(w-h)*m,f=t+c*Math.cos(S),d=o+e*Math.sin(S);i.push(new a(f,d))}return i}