import"./modulepreload-polyfill.b7f2da20.js";import{k}from"./vendor.36f02d62.js";import{V as b}from"./index.6c4cc869.js";var s=document.getElementById("app");s.width=512;s.height=512;const f=s.getContext("2d");f.translate(256,256);f.scale(1,-1);f.lineCap="round";let r=[new b(0,100)];for(let e=1;e<=4;e++){const t=r[0].copy().rotate(e*Math.PI*.4);r.push(t)}let p=r.flat();const i=k(p);g();function g(e){for(let t=0;t<i.length;t=t+3)x(f,[r[i[t]],r[i[t+1]],r[i[t+2]]],e)}function x(e,t,{fillStyle:l=null,close:a=!0,rule:u="nonzero",strokeStyle:n="black"}={}){e.beginPath(),e.moveTo(t[0].x,t[0].y),console.log(t);for(let o=1;o<t.length;o++)e.lineTo(t[o].x,t[o].y);e.strokeStyle=n,a&&e.closePath(),e.stroke(),l&&(f.fillStyle=l,f.fill())}function M(e,t,l,a){const u=t.copy().sub(e),n=l.copy().sub(t),o=e.copy().sub(l),h=a.copy().sub(e),v=a.copy().sub(t),w=a.copy().sub(l),y=Math.sign(u.cross(h));let c=u.dot(h)/u.length**2;if(y===0&&c>=0&&c<=1)return!0;const d=Math.sign(n.cross(v));if(c=n.dot(h)/n.length**2,d===0&&c>=0&&c<=1)return!0;const m=Math.sign(o.cross(w));return c=o.dot(h)/o.length**2,m===0&&c>=0&&c<=1?!0:y===d&&d===m}const{left:P,top:_}=s.getBoundingClientRect();s.addEventListener("mousemove",e=>{const{x:t,y:l}=e,a=(t-P)/s.offsetHeight*s.width-256,u=256-(l-_)/s.offsetWidth*s.width;f.clearRect(-256,-256,512,512);let n=!1;for(let o=0;o<i.length&&(n=M(r[i[o]],r[i[o+1]],r[i[o+2]],new b(a,u)),!n);o=o+3);n?g({fillStyle:"red"}):g()});
