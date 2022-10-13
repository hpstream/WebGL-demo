import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";
import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { Matrix4, Vector3, Vector4 } from "three";


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

const u_ViewMatrix = gl.getUniformLocation(program, 'u_ViewMatrix');

let viewMatrix = lookAt(new Vector3(0, 0, 2),
  new Vector3(0, 0, 0),
  new Vector3(0, 1, 0)
);
let deg = 0.01;


function render() {
  // deg += 0.001;
  // let el = viewMatrix.multiply(new Matrix4().set(
  //   Math.cos(deg), -Math.sin(deg), 0, 0,
  //   Math.sin(deg), Math.cos(deg), 0, 0,
  //   0, 0, 1, 0,
  //   0, 0, 0, 1));

  // let el = viewMatrix.multiply(new Matrix4().set(
  //   1, 0, 0, 0,
  //   0, Math.cos(deg), -Math.sin(deg), 0,
  //   0, Math.sin(deg), Math.cos(deg), 0,
  //   0, 0, 0, 1));

  let el = viewMatrix.multiply(new Matrix4().set(
    Math.cos(deg), 0, Math.sin(deg), 0,
    0, 1, 0, 0,
    -Math.sin(deg), 0, Math.cos(deg), 0,
    0, 0, 0, 1).transpose());


  gl.uniformMatrix4fv(u_ViewMatrix, false, el.elements)
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.LINES, 0, indices.length);
  requestAnimationFrame(render)
}
render();

function lookAt(e: THREE.Vector3, t: THREE.Vector3, u: THREE.Vector3) {
  //目标点到视点的向量
  const d = new Vector3().subVectors(e, t)
  d.normalize()
  //d和上方向的垂线
  const a = new Vector3().crossVectors(u, d)
  a.normalize()
  //d和a的垂线
  const b = new Vector3().crossVectors(d, a)
  b.normalize()
  //c 基于d取反
  // const c = new Vector3(d.x, d.y, d.z)
  const c = d
  return new Matrix4().set(
    a.x, a.y, a.z, 0,
    b.x, b.y, b.z, 0,
    c.x, c.y, c.z, 0,
    0, 0, 0, 1
  )
}

