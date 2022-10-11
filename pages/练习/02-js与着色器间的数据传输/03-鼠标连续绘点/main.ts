import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";
import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { rename } from "fs";

// console.log(vertexShader, fragmentShader)

// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vertexShader, fragmentShader);

// 4.声明颜色RGBA
gl.clearColor(0, 0, 0, 1);

// 5.刷底色
gl.clear(gl.COLOR_BUFFER_BIT);


let a_Position = gl.getAttribLocation(program, 'a_Position');
// gl.vertexAttrib4fv
gl.vertexAttrib2f(a_Position, 0.1, 0.1);
// 绘制顶点
gl.drawArrays(gl.POINTS, 0, 1);

let a_points: { x: number, y: number }[] = [];
canvas.addEventListener('click', (e) => {
  let clientX = e.clientX;
  let clientY = e.clientY;
  let { left, top, width, height } = canvas.getBoundingClientRect();

  // 求出canvas的中心点
  const [centerX, centerY] = [width / 2, height / 2]
  let [mouseX, mouseY] = [clientX - left, clientY - top];
  let [px, py]: [number, number] = [
    mouseX - centerX,
    mouseY - centerY,
  ]

  //修改方向问题
  py = - py;

  //解决坐标基底的差异
  const [x, y] = [px / centerX, py / centerY];
  // console.log(x, y);
  a_points.push({ x, y })


})

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  a_points.forEach(({ x, y }) => {
    gl.vertexAttrib2f(a_Position, x, y);
    // 绘制顶点
    gl.drawArrays(gl.POINTS, 0, 1);
  })
  requestAnimationFrame(render)
}

render();





