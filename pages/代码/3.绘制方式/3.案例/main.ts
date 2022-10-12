// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";

import fragmentShader from "./glsl/fragmentShader.glsl?raw";


import * as dat from "dat.gui";

import { getMousePosInWebgl, initShaders } from "./lib/utils";
import { range } from "./lib/math";
// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// 封装着色器程序
const program = initShaders(gl, vertexShader, fragmentShader);

let gui = new dat.GUI();
let g = gui.addFolder("绘制方式");
g.open();


let vertices = new Float32Array([
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

let points: number[] = [];
let params = {
  type: 'POINTS',
  fn: () => {
    vertices = new Float32Array();
    points = [];
    render();
  }
}

canvas.addEventListener('click', (event) => {

  let { x, y } = getMousePosInWebgl(event, canvas)
  // 以左上角为原点坐标系
  points.push(x, y);
  vertices = new Float32Array(points)
  render();
})
let types = ['POINTS', 'TRIANGLES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN', 'LINES', 'LINE_STRIP', 'LINE_LOOP']
g.add(params, 'type', types).onChange(() => {
  render();
})
g.add(params, 'fn').name('开始绘制');


/* 
绘制方式：
1. gl.POINTS 绘制点
2. gl.TRIANGLES 绘制三角形
3. gl.TRIANGLE_STRIP 三角带
4. gl.TRIANGLE_FAN 三角扇
5. gl.LINES 单独线段
6. gl.LINE_STRIP 线条
7. gl.LINE_LOOP 闭合线条

*/

render();
function render() {
  // 写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(a_Position);
  // 4.声明颜色RGBA
  gl.clearColor(0, 0, 0, 1);

  // 5.刷底色
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl[params.type], 0, vertices.length / 2);
}



