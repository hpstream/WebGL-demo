// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";

import fragmentShader from "./glsl/fragmentShader.glsl?raw";


import * as dat from "dat.gui";

import { initShaders } from "./lib/utils";
import { Matrix3, Matrix4 } from "three";

// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// 封装着色器程序
const program = initShaders(gl, vertexShader, fragmentShader);


let vertices = new Float32Array([
  -0.2, 0.2,  // v0
  -0.2, -0.2, // v1
  0.2, 0.2, //v2
  0.2, -0.2, //v2
])

// 缓冲对象
const vertexBuffer = gl.createBuffer();
// 绑定缓冲对象
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// 写入数据
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 获取attribute变量
const a_Position = gl.getAttribLocation(program, 'a_Position');
const u_Matrix = gl.getUniformLocation(program, 'u_Matrix')


let gui = new dat.GUI();
let params = {
  originX: 0,
  originY: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  scaleX: 1,
  scaleY: 1,
  positionX: 0,
  positionY: 0,
}

let o = gui.addFolder('基点')
o.open();
o.add(params, 'originX').min(-1).max(1).step(0.01).onChange(changeValue);
o.add(params, 'originY').min(-1).max(1).step(0.01).onChange(changeValue);
let r = gui.addFolder('旋转')
r.open();
r.add(params, 'rotateZ').min(0).max(Math.PI * 2).step(0.01).onChange(changeValue);
// r.add(params,'rotateY').min(0).max(Math.PI * 2).onCh0ange(changeValue);

let s = gui.addFolder('缩放')
s.open();
s.add(params, 'scaleX').min(0).max(2).step(0.01).onChange(changeValue);
s.add(params, 'scaleY').min(0).max(3).step(0.01).onChange(changeValue);

let t = gui.addFolder('平移')
t.open();
t.add(params, 'positionX').min(0).max(1).step(0.01).onChange(changeValue);
t.add(params, 'positionY').min(0).max(1).step(0.01).onChange(changeValue);

function changeValue() {
  change();
  render();
}

function change() {
  const mx = new Matrix4()
    // .multiply(new Matrix4().makeRotationZ(params.rotateZ))
    .multiply(new Matrix4().setPosition(params.originX, params.originY, 0).multiply(new Matrix4().makeRotationZ(params.rotateZ).multiply(new Matrix4().setPosition(params.positionX, params.positionY, 0))
      .multiply(new Matrix4().makeScale(params.scaleX, params.scaleY, 1))).multiply(new Matrix4().setPosition(-params.originX, -params.originY, 0)))


  gl.uniformMatrix4fv(u_Matrix, false, mx.elements)
}

change();


// 修改attribute变量
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

// 赋能—批处理
gl.enableVertexAttribArray(a_Position);



render();
function render() {
  // 4.声明颜色RGBA
  gl.clearColor(0, 0, 0, 1);

  // 5.刷底色
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 2);
}



