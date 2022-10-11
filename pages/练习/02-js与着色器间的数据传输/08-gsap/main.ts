import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";
import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";



gsap.registerPlugin(CustomEase)
// console.log(vertexShader, fragmentShader)

// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// 开启片元的颜色合成功能
gl.enable(gl.BLEND);
// 设置片元的合成方式
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
let program = initShaders(gl, vertexShader, fragmentShader);

// 4.声明颜色RGBA
gl.clearColor(0, 0, 0, 0);

// 5.刷底色
gl.clear(gl.COLOR_BUFFER_BIT);


let a_Position = gl.getAttribLocation(program, 'a_Position');

let a_PointSize = gl.getAttribLocation(program, 'a_PointSize');

let u_FragColor = gl.getUniformLocation(program, 'u_FragColor') as WebGLUniformLocation;

interface PointType {
  x: number;
  y: number;
  size: number;
  a: number;
  color?: {
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
  const size = Math.random() * 3 + 2;

  let obj = { x, y, size, a: 1 };

  a_points.push(obj)

  // https://segmentfault.com/a/1190000005366176
  // https://greensock.com/ease-visualizer

  gsap.from(obj, {
    a: 0,
    yoyo: true,
    repeat: -1,
    duration: Math.random() * 1 + 0.5,
    ease: CustomEase.create("custom", "M0,0,C0.126,0.382,0.33,0.15,0.488,0.298,0.68,0.478,0.818,1.001,1,1")

  })


})

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  a_points.forEach(({ x, y, size, a }) => {
    gl.vertexAttrib2f(a_Position, x, y);
    gl.vertexAttrib1f(a_PointSize, size)
    const arr = new Float32Array([0.87, 0.91, 1, a]);
    // console.log(arr)
    gl.uniform4fv(u_FragColor, arr)

    // 绘制顶点
    gl.drawArrays(gl.POINTS, 0, 1);
  })
  requestAnimationFrame(render)
}

render();





