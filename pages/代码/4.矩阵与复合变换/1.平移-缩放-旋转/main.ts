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

const matrix = new Matrix4();

// matrix.setPosition(0.1, 0.1, 0);
// matrix.makeScale(2, 1, 1);
// matrix.makeRotationZ(Math.PI)
const mx = new Matrix4()

  .multiply(new Matrix4().makeRotationZ(Math.PI / 6))
  .multiply(new Matrix4().setPosition(0.1, 0.1, 0))
  .multiply(new Matrix4().makeScale(0.5, 0.5, 1))

// const m3 = new Matrix3()

//   .multiply(new Matrix3().rotate(-Math.PI / 6))
//   .multiply(new Matrix3().translate(100, 50))
//   .multiply(new Matrix3().scale(0.5, 0.5))


// console.log(mx.elements, m3.elements)
gl.uniformMatrix4fv(u_Matrix, false, mx.elements)

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



