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

let a_PointSize = gl.getAttribLocation(program, 'a_PointSize');

let u_FragColor = gl.getUniformLocation(program, 'u_FragColor') as WebGLUniformLocation;

interface PointType {
  x: number; y: number; size: number;
  color: {
    r: number;
    g: number;
    b: number;
    a: 1;
  }
}

// 绘制顶点
gl.drawArrays(gl.POINTS, 0, 1);

let a_points: PointType[] = [];
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
  const size = Math.random() * 50 + 10;
  let color = Math.random();
  a_points.push({ x, y, size, color: { r: color, g: color, b: 1, a: 1 } })


})

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  a_points.forEach(({ x, y, size, color }) => {
    gl.vertexAttrib2f(a_Position, x, y);
    gl.vertexAttrib1f(a_PointSize, size)
    const arr = new Float32Array([color.r, color.g, color.b, color.a]);
    gl.uniform4fv(u_FragColor, arr)

    // 绘制顶点
    gl.drawArrays(gl.POINTS, 0, 1);
  })
  requestAnimationFrame(render)
}

render();





