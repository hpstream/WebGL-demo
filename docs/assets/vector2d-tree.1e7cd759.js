import"./modulepreload-polyfill.b7f2da20.js";import{U as f}from"./vendor.36f02d62.js";import{V as i}from"./index.6c4cc869.js";var r=document.getElementById("app");r.width=512;r.height=512;const e=r.getContext("2d");f.canvas(r);e.translate(256,512);e.scale(1,-1);e.lineCap="round";const s=new i(0,0);c(e,s,50,10,1,3);function c(o,m,d,t,l,n){const h=new i(1,0).rotate(l).scale(d),a=m.copy().add(h);if(console.log(h,a),o.lineWidth=t,o.beginPath(),o.moveTo(m.x,m.y),o.lineTo(a.x,a.y),o.stroke(),t>2){const p=Math.PI/4+.5*(l+.2)+n*(Math.random()-.5);c(o,a,d*.9,t*.8,p,n*.9);const v=Math.PI/4+.5*(l-.2)+n*(Math.random()-.5);c(o,a,d*.9,t*.8,v,n*.9)}}