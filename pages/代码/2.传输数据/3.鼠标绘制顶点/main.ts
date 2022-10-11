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


// 传递数据
const a_Position = gl.getAttribLocation(program, 'a_Position');
const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
const u_FragColor = gl.getUniformLocation(program, 'u_FragColor');

interface Point {
  x: number;
  y: number;
  size: number;
  r: number;
  g: number;
  b: number;
  a: number;
}

let points: Point[] = [];
function range(start: number, end: number, isFloat: boolean = false) {
  let value = start + (end - start) * Math.random();
  return isFloat ? value : Math.floor(value);
}
const { left, top, width, height } = canvas.getBoundingClientRect();
canvas.addEventListener('click', ({ clientX, clientY }) => {

  // 以左上角为原点坐标系
  let [positionX, positionY] = [clientX - left, clientY - top];

  // 屏幕中心为原点坐标系
  let [originX, originY] = [width / 2, height / 2];

  // 进行转换
  let [x, y] = [(positionX - originX) / originX, -(positionY - originY) / originY];

  let point = {
    x,
    y,
    size: range(10, 20),
    r: range(0, 1, true),
    g: range(0, 1, true),
    b: range(0, 1, true),
    a: range(0.5, 1, true),
  }
  console.log(point)
  points.push(point);

  render();

})

// 4.声明颜色RGBA
gl.clearColor(0, 0, 0, 1);
// 5.刷底色
gl.clear(gl.COLOR_BUFFER_BIT);
function render() {

  gl.clear(gl.COLOR_BUFFER_BIT);

  points.forEach(({ x, y, size, r, g, b, a }) => {
    gl.vertexAttrib2f(a_Position, x, y);
    gl.vertexAttrib1f(a_PointSize, size);
    gl.uniform4fv(u_FragColor, new Float32Array([r, g, b, a]));
    // 绘制顶点：
    gl.drawArrays(gl.POINTS, 0, 1);
  })
}




