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



const maxV = 1;
const maxU = 1;
const source = new Float32Array([
  -0.5, 0.5, 0, maxV,
  -0.5, -0.5, 0, 0.0,
  0.5, 0.5, maxU, maxV,
  0.5, -0.5, maxU, 0.0,
]);
let two = new Two({
  gl,
  program,
  source: source,
  type: 'TRIANGLE_STRIP',
  attribute: {
    'a_Position': {
      size: 2,
      index: 0
    },
    'a_Pin': {
      size: 2,
      index: 2
    }

  },
  uniforms: {}
})


let img = new Image();
img.src = './img/512.jpg';

img.onload = () => {
  two.maps = {
    'u_Sampler': {
      image: img
    }
  }
  two.initMaps();
  render();

}
function render() {
  gl.clearColor(0, 0, 0, 1)
  // 5.刷底色
  gl.clear(gl.COLOR_BUFFER_BIT);
  two.render();
}






