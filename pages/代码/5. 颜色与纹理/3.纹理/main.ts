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
img.src = './img/600.png';

img.onload = () => {
  /* 图像预处理 */
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  /* 准备三个角色 */
  gl.activeTexture(gl.TEXTURE0);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGB,
    gl.RGB,
    gl.UNSIGNED_BYTE,
    img
  )

  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR
  )
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_S,
    gl.CLAMP_TO_EDGE
  )
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_T,
    gl.CLAMP_TO_EDGE
  )
  // gl.texParameteri(
  //   gl.TEXTURE_2D,
  //   gl.TEXTURE_WRAP_S,
  //   gl.MIRRORED_REPEAT
  // )
  // 非二次幂图像展示
  // 镜像复制
  // 复制
  // 分子贴图
  console.log(gl.LINEAR, gl.NEAREST, gl.NEAREST_MIPMAP_LINEAR, gl.NEAREST_MIPMAP_LINEAR, gl.LINEAR_MIPMAP_NEAREST, gl.LINEAR_MIPMAP_LINEAR)


  const u_Sampler = gl.getUniformLocation(program, 'u_Sampler')
  gl.uniform1i(u_Sampler, 0)
  gl.clearColor(0, 0, 0, 1)
  // 5.刷底色
  gl.clear(gl.COLOR_BUFFER_BIT);

  two.render();
}






