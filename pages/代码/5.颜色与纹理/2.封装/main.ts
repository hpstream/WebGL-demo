// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";

import fragmentShader from "./glsl/fragmentShader.glsl?raw";


import * as dat from "dat.gui";

import { initShaders } from "./lib/utils";
import { Matrix3, Matrix4 } from "three";
import { Two } from "./lib/Two";

// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// 封装着色器程序
const program = initShaders(gl, vertexShader, fragmentShader);


// 前面表示点，后面表示颜色
let vertices = new Float32Array([
  0.0, 0.2, 0, 1, 0, 0, 1, // v0 
  -0.2, -0.2, 0, 0, 1, 0, 1,// v1
  0.2, -0.2, 0, 0, 0, 1, 1//v2
])

let two = new Two({
  gl,
  program,
  source: vertices,
  type: 'TRIANGLES',
  attribute: {
    'a_Position': {
      size: 3,
      index: 0
    },
    'a_Color': {
      size: 4,
      index: 3
    }
  },
  uniforms: {}
})

gl.clearColor(0, 0, 0, 1)
// 5.刷底色
gl.clear(gl.COLOR_BUFFER_BIT);

two.render();


