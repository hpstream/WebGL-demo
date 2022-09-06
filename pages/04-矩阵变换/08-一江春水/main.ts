import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";
import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { Matrix4, Vector3 } from "three";


const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vertexShader, fragmentShader);

gl.clearColor(0.0, 0.0, 0.0, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);

// x,z方向的空间坐标极值
const [minPosX, maxPosX, minPosZ, maxPosZ] = [
  -0.7, 0.8, -1, 1
]
/* 视图矩阵 */
const viewMatrix = new Matrix4().lookAt(
  new Vector3(0.1, 1, 6),
  new Vector3(),
  new Vector3(0, 1, 0)
)


let vertices = createVertices();
console.log(vertices)
let size = 3;
const vertexBuffer = gl.createBuffer();
//绑定缓冲对象
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//写入数据
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
//获取attribute 变量
const a_Position = gl.getAttribLocation(program, 'a_Position')
//修改attribute 变量
gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0)
//赋能-批处理
gl.enableVertexAttribArray(a_Position)

const u_ViewMatrix = gl.getUniformLocation(program, 'u_ViewMatrix');

gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements)


gl.drawArrays(gl.POINTS, 0, vertices.length / 3);



function createVertices() {
  const vertices: number[] = [];
  for (let z = minPosZ; z < maxPosZ; z += 0.1) {
    for (let x = minPosX; x < maxPosX; x += 0.1) {
      vertices.push(x, 0, z)
    }
  }
  return vertices;
}