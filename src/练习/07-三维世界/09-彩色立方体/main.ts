import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vsSource from "./glsl/vertexShader.glsl?raw";
import fsSource from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { Poly } from "./lib/Ploy";
import { Matrix4, OrthographicCamera, PerspectiveCamera, Vector2, Vector3, Spherical } from "three";
import { OrbitControls } from "./lib/OrbitControls";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vsSource, fsSource);
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);

/* 透视相机 */
const eye = new Vector3(1, 2, 3)
const target = new Vector3(0, 0, 0)
const up = new Vector3(0, 1, 0)

const [fov, aspect, near, far] = [
  45,
  canvas.width / canvas.height,
  1,
  20
]
const camera = new PerspectiveCamera(fov, aspect, near, far)
camera.position.copy(eye)
camera.lookAt(target)
camera.updateMatrixWorld();

//投影视图矩阵
const pvMatrix = new Matrix4();

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
}) /* 实例化轨道控制器 */
const orbit = new OrbitControls({
  camera, target,
  dom: canvas,
});

canvas.addEventListener('pointerdown', (e) => {
  orbit.pointerdown(e)

})

canvas.addEventListener('pointermove', (event) => {
  orbit.pointermove(event)
  pvMatrix.copy(orbit.getPvMatrix())
})
canvas.addEventListener('pointerup', () => {
  orbit.pointerup()
})
canvas.addEventListener('pointerleave', () => {
  orbit.pointerup()
})

//滚轮事件
canvas.addEventListener('wheel', (e) => {
  orbit.wheel(e)
  pvMatrix.copy(orbit.getPvMatrix())
})

pvMatrix.copy(orbit.getPvMatrix())



//    v6----- v5
//   /|      /|
//  v1------v0|
//  | |     | |
//  | |v7---|-|v4
//  |/      |/
//  v2------v3
const vertices = new Float32Array([
  1, 1, 1, 1, 0, 0,  // v0 White
  -1, 1, 1, 0, 1, 0,  // v1 Magenta
  -1, -1, 1, 0, 0, 1,  // v2 Red
  1, -1, 1, 1, 1, 0,  // v3 Yellow
  1, -1, -1, 0, 1, 1,  // v4 Green
  1, 1, -1, 1, 0, 1,  // v5 Cyan
  -1, 1, -1, 1, 1, 1,  // v6 Blue
  -1, -1, -1, 0, 0, 0   // v7 Black
])

const indexes = new Uint8Array([
  0, 1, 2, 0, 2, 3,    // front
  0, 3, 4, 0, 4, 5,    // right
  0, 5, 6, 0, 6, 1,    // up
  1, 6, 7, 1, 7, 2,    // left
  7, 4, 3, 7, 3, 2,    // down
  4, 7, 6, 4, 6, 5     // back
])

//元素字节数
const elementBytes = vertices.BYTES_PER_ELEMENT;
//系列尺寸
const verticeSize = 3
const colorSize = 3
//类目尺寸
const categorySize = verticeSize + colorSize
//类目字节数
const categoryBytes = categorySize * elementBytes
//系列字节索引位置
const verticeByteIndex = 0
const colorByteIndex = verticeSize * elementBytes

/* 顶点缓冲区 */
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 将顶点缓冲区里的点位数据分配给a_Position
const a_Position = gl.getAttribLocation(program, 'a_Position');
gl.vertexAttribPointer(
  a_Position,
  verticeSize,
  gl.FLOAT,
  false,
  categoryBytes,
  verticeByteIndex
);
gl.enableVertexAttribArray(a_Position);

// 将顶点缓冲区里的颜色数据分配给a_Color
const a_Color = gl.getAttribLocation(program, 'a_Color');
gl.vertexAttribPointer(
  a_Color,
  colorSize,
  gl.FLOAT,
  false,
  categoryBytes,
  colorByteIndex
);
console.log(categoryBytes, colorByteIndex)
gl.enableVertexAttribArray(a_Color);


// 建立缓冲区对象
const indexesBuffer = gl.createBuffer()
//把缓冲区绑定到webgl 上下文对象上
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexesBuffer)
// 往缓冲区写数据
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW)

/* 模型矩阵 */
const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix')
const modelMatrix = new Matrix4()
modelMatrix.makeScale(0.5, 0.5, 0.5)
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)



!(function ani() {
  // modelMatrix.multiply(new Matrix4().makeRotationY(0.05))
  /* 投影视图变量 */
  const u_PvMatrix = gl.getUniformLocation(program, 'u_PvMatrix')
  gl.uniformMatrix4fv(u_PvMatrix, false, orbit.getPvMatrix().elements)
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, indexes.length, gl.UNSIGNED_BYTE, 0)
  requestAnimationFrame(ani)
} as any)()


