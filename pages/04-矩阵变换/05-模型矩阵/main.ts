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


const verticeLib = [
  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, -1.0, -1.0,
  1.0, 1.0, -1.0,
  -1.0, 1.0, -1.0,
  -1.0, -1.0, -1.0,
];


const indices = [
  0, 1,
  1, 2,
  2, 3,
  3, 0,

  0, 5,
  1, 6,
  2, 7,
  3, 4,

  4, 5,
  5, 6,
  6, 7,
  7, 4
];

const arr: any = [];
indices.forEach(n => {
  const i = n * 3
  arr.push(
    verticeLib[i] / 5,
    verticeLib[i + 1] / 5,
    verticeLib[i + 2] / 5 ,
  )
})
const vertices = new Float32Array(arr)

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
const a_Position = gl.getAttribLocation(program, 'a_Position');
gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_Position);

const u_ViewMatrix = gl.getUniformLocation(program, 'u_ViewMatrix')
const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix')
const viewMatrix = new Matrix4().lookAt(
  new THREE.Vector3(0.2, 0.2, 2),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 1, 0)
)
//模型矩阵
const modelMatrix = new Matrix4()
// modelMatrix.makeRotationY(0.3)

gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements)
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.LINES, 0, indices.length);


