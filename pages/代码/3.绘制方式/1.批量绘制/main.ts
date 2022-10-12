// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";

import fragmentShader from "./glsl/fragmentShader.glsl?raw";


import { initShaders } from "./lib/utils";
// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// 封装着色器程序
const program = initShaders(gl, vertexShader, fragmentShader);




const vertices = new Float32Array([
  -0.2, 0.2,  // v0
  -0.2, -0.2, // v1

  0.0, 0.2, //v2
  0.0, -0.2, //v3

  0.2, 0.2, // v4
  0.2, -0.2 // v5
])

// 缓冲对象
const vertexBuffer = gl.createBuffer();
// 绑定缓冲对象
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// 写入数据
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 获取attribute变量
const a_Position = gl.getAttribLocation(program, 'a_Position');

// 修改attribute变量
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

// 赋能—批处理
gl.enableVertexAttribArray(a_Position);


// 4.声明颜色RGBA
gl.clearColor(0, 0, 0, 1);

// 5.刷底色
gl.clear(gl.COLOR_BUFFER_BIT);

// 绘制顶点：
gl.drawArrays(gl.POINTS, 0, vertices.length / 2);
