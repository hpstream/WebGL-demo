var u=Object.defineProperty;var f=(a,t,e)=>t in a?u(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var c=(a,t,e)=>(f(a,typeof t!="symbol"?t+"":t,e),e);const h=()=>({gl:null,vertices:[],geoData:[],size:2,attrName:"a_Position",uniName:"u_IsPOINTS",count:0,types:["POINTS"],circleDot:!1,u_IsPOINTS:null});class p{constructor(t){c(this,"u_IsPOINTS");c(this,"count");c(this,"vertices");c(this,"size");c(this,"types");c(this,"geoData");Object.assign(this,h(),t),this.init()}init(){const{attrName:t,size:e,gl:s,circleDot:i}=this;if(!s)return;const r=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,r),this.updateBuffer();const o=s.getAttribLocation(this.program,t);s.vertexAttribPointer(o,e,s.FLOAT,!1,0,0),s.enableVertexAttribArray(o),i&&(this.u_IsPOINTS=s.getUniformLocation(this.program,"u_IsPOINTS"),console.log(i))}updateBuffer(){const{gl:t,vertices:e}=this;this.updateCount(),t.bufferData(t.ARRAY_BUFFER,new Float32Array(e),t.STATIC_DRAW)}updateCount(){this.count=this.vertices.length/this.size}emptyVertice(){this.vertices=[],this.updateBuffer()}addVertice(...t){this.vertices.push(...t),this.updateBuffer()}popVertice(){const{vertices:t,size:e}=this,s=t.length;t.splice(s-e,s),this.updateCount()}setVertice(t,...e){const{vertices:s,size:i}=this,r=t*i;e.forEach((o,n)=>{s[r+n]=o}),this.updateBuffer()}updateVertices(t){const{geoData:e}=this,s=[];e.forEach(i=>{t.forEach(r=>{s.push(i[r])})}),this.vertices=s,this.updateBuffer()}draw(t=this.types){const{gl:e,count:s,circleDot:i,u_IsPOINTS:r}=this;for(let o of t)i&&e.uniform1f(r,o==="POINTS"),e.drawArrays(e[o],0,s)}}export{p as P};