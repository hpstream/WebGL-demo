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

// 4.链接webgl上下文对象和程序
gl.linkProgram(program);
// 5.启动程序
gl.useProgram(program);


// 4.声明颜色RGBA
gl.clearColor(0, 0, 0, 1);

// 5.刷底色
gl.clear(gl.COLOR_BUFFER_BIT);

// 绘制顶点：
gl.drawArrays(gl.POINTS, 0, 1);
