import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vsSource from "./glsl/vertexShader.glsl?raw";
import fsSource from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";


const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vsSource, fsSource);


//声明颜色 rgba
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.CULL_FACE);
gl.enable(gl.DEPTH_TEST);

const maxV = 1;
const maxU = 1;
const source = new Float32Array([
  -0.5, -0.5, -0.5, 0, 0,
  -0.5, 0.5, -0.5, 0, 0.5,
  0.5, -0.5, -0.5, 0.25, 0,
  -0.5, 0.5, -0.5, 0, 0.5,
  0.5, 0.5, -0.5, 0.25, 0.5,
  0.5, -0.5, -0.5, 0.25, 0,

  -0.5, -0.5, 0.5, 0.25, 0,
  0.5, -0.5, 0.5, 0.5, 0,
  -0.5, 0.5, 0.5, 0.25, 0.5,
  -0.5, 0.5, 0.5, 0.25, 0.5,
  0.5, -0.5, 0.5, 0.5, 0,
  0.5, 0.5, 0.5, 0.5, 0.5,

  -0.5, 0.5, -0.5, 0.5, 0,
  -0.5, 0.5, 0.5, 0.5, 0.5,
  0.5, 0.5, -0.5, 0.75, 0,
  -0.5, 0.5, 0.5, 0.5, 0.5,
  0.5, 0.5, 0.5, 0.75, 0.5,
  0.5, 0.5, -0.5, 0.75, 0,

  -0.5, -0.5, -0.5, 0, 0.5,
  0.5, -0.5, -0.5, 0.25, 0.5,
  -0.5, -0.5, 0.5, 0, 1,
  -0.5, -0.5, 0.5, 0, 1,
  0.5, -0.5, -0.5, 0.25, 0.5,
  0.5, -0.5, 0.5, 0.25, 1,

  -0.5, -0.5, -0.5, 0.25, 0.5,
  -0.5, -0.5, 0.5, 0.25, 1,
  -0.5, 0.5, -0.5, 0.5, 0.5,
  -0.5, -0.5, 0.5, 0.25, 1,
  -0.5, 0.5, 0.5, 0.5, 1,
  -0.5, 0.5, -0.5, 0.5, 0.5,

  0.5, -0.5, -0.5, 0.5, 0.5,
  0.5, 0.5, -0.5, 0.75, 0.5,
  0.5, -0.5, 0.5, 0.5, 1,
  0.5, -0.5, 0.5, 0.5, 1,
  0.5, 0.5, -0.5, 0.75, 0.5,
  0.5, 0.5, 0.5, 0.75, 1,





]);
// 元素的字节数
const elementBytes = source.BYTES_PER_ELEMENT;
// 系列尺寸
const verticeSize = 3;
const colorSize = 2;
// 类目尺寸
const categorySize = verticeSize + colorSize;
// 类目字节数
const categoryBytes = categorySize * elementBytes;
// 系列字节索引
const verticeByteIndex = 0;
const pinByteIndex = verticeSize * elementBytes;
// 顶点总数
const sourceSize = source.length / categorySize;

// 创建缓冲对象
const sourceBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, sourceBuffer);
gl.bufferData(gl.ARRAY_BUFFER, source, gl.STATIC_DRAW);

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

const a_Pin = gl.getAttribLocation(program, 'a_Pin');
gl.vertexAttribPointer(
  a_Pin,
  colorSize,
  gl.FLOAT,
  false,
  categoryBytes,
  pinByteIndex
);
gl.enableVertexAttribArray(a_Pin);

// 处理纹理
// 对纹理图像垂直翻转
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
// 创建纹理单元
gl.activeTexture(gl.TEXTURE0);
// 创建纹理对象
const textTure = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, textTure);
const image = new Image();
image.src = '/static/mf.jpg';


image.onload = () => {
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGB,
    gl.RGB,
    gl.UNSIGNED_BYTE,
    image
  )

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR
  )
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const u_Sampler = gl.getUniformLocation(program, 'u_Sampler')
  gl.uniform1i(u_Sampler, 0);
  render();
}

//模型矩阵
const modelMatrix = new THREE.Matrix4()
const mx = new THREE.Matrix4().makeRotationX(0.01)
const my = new THREE.Matrix4().makeRotationY(0.01)
const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix')
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)

// 连续渲染
!(function ani() {
  modelMatrix.multiply(my).multiply(mx)
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)
  render()
  requestAnimationFrame(ani)
} as any)()


function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, sourceSize);
}





