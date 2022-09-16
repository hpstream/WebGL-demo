import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vsSource from "./glsl/vertexShader.glsl?raw";
import fsSource from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { Poly } from "./lib/Ploy";
import { Matrix4 } from "three";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vsSource, fsSource);


//声明颜色 rgba
gl.clearColor(0, 0, 0, 1);
//正交投影矩阵
const projectionMatrix = new Matrix4()
//定义相机世界高度尺寸的一半
const halfH = 2
//计算画布的宽高比
const ratio = canvas.width / canvas.height
//基于halfH和画布宽高比计算相机世界宽度尺寸的一半
const halfW = halfH * ratio
//定义相机世界的6个边界
const [left, right, top, bottom, near, far] = [
  -halfW, halfW, halfH, -halfH, 0, 4
]
//获取正交投影矩阵
projectionMatrix.makeOrthographic(left, right, top, bottom, near, far)

const poly = new Poly({
  gl,
  program,
  source: new Float32Array([
    0, 0.3, -0.2,
    - 0.3, -0.3, -0.2,
    0.3, -0.3, -0.2
  ]),
  PaintType: 'TRIANGLES',
  attributes: {
    a_Position: {
      size: 3,
      index: 0
    },
  },
  uniforms: {
    u_Color: {
      type: 'uniform4fv',
      value: [1.0, 1.0, 0.0, 1.0]
    },
    u_ProjectionMatrix: {
      type: 'uniformMatrix4fv',
      value: projectionMatrix.elements
    },
  },
});

poly.draw();








