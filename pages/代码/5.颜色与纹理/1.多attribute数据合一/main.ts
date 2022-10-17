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


// 前面表示点，后面表示颜色
let vertices = new Float32Array([
  0.0, 0.2, 0, 1, 0, 0, 1, // v0 
  -0.2, -0.2, 0, 0, 1, 0, 1,// v1
  0.2, -0.2, 0, 0, 0, 1, 1//v2
])
let verticeSize = 3;
let colorSize = 4;
let elementBytes = vertices.BYTES_PER_ELEMENT;
console.log(elementBytes, vertices);
let sourceSize = verticeSize + colorSize;
const categoryBytes = sourceSize * elementBytes;

// 缓冲对象
const vertexBuffer = gl.createBuffer();
// 绑定缓冲对象
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// 写入数据
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

let a_Position = gl.getAttribLocation(program, 'a_Position');
let a_Color = gl.getAttribLocation(program, 'a_Color');


// 修改attribute变量
gl.vertexAttribPointer(a_Position, verticeSize, gl.FLOAT, false, categoryBytes, 0);
gl.vertexAttribPointer(a_Color, colorSize, gl.FLOAT, false, categoryBytes, verticeSize * elementBytes);

// 赋能—批处理
gl.enableVertexAttribArray(a_Position);
gl.enableVertexAttribArray(a_Color);


render();
function render() {
  // 4.声明颜色RGBA
  gl.clearColor(0, 0, 0, 1);

  // 5.刷底色
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / sourceSize);
}



