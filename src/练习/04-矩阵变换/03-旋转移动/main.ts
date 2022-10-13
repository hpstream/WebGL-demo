import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";
import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { Matrix4 } from "three";


const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vertexShader, fragmentShader);


/* 
如何向attribute变量中可入多点，并绘制多点 
1. 建立顶点数据
*/
let vertices = new Float32Array([
  -0.2, 0.2,
  -0.2, -0.2,
  0.2, 0.2,
  0.2, -0.2,
])
// 写入点
let vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
const a_Position = gl.getAttribLocation(program, 'a_Position');
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_Position);


// 5. 获取attribute变量
let u_Matrix = gl.getUniformLocation(program, 'u_Matrix');

//列主序
// 当缩放因子一致时，旋转和缩放没有先后之分。
const mr = new Matrix4();
mr.makeRotationZ(Math.PI / 4)


const ms = new Matrix4();
ms.makeScale(2, 2, 2);


const matrix = ms.multiply(mr)

gl.uniformMatrix4fv(u_Matrix, false, matrix.elements);



gl.clearColor(0, 0, 0, 1);

gl.clear(gl.COLOR_BUFFER_BIT);


gl.drawArrays(gl.TRIANGLES, 0, 3);





