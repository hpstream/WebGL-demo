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

const mr = new Matrix4();
mr.makeRotationZ(Math.PI / 4);

const mt = new Matrix4();
mt.makeTranslation(0.5, 0.5, 0);

const matrix = mr.multiply(mt);

gl.uniformMatrix4fv(u_Matrix, false, matrix.elements);



gl.clearColor(0, 0, 0, 1);

gl.clear(gl.COLOR_BUFFER_BIT);


gl.drawArrays(gl.TRIANGLES, 0, 3);





