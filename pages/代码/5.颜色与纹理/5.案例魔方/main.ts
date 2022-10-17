// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";

import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "./lib/utils";
import { Matrix3, Matrix4 } from "three";
import { Two } from "./lib/Two";
import { showTools } from "./utils";

// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// 封装着色器程序
const program = initShaders(gl, vertexShader, fragmentShader);
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);// 可以让前面的物体挡住后面的物体


//数据源
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
let two = new Two({
  gl,
  program,
  source: source,
  type: 'TRIANGLES',
  attribute: {
    'a_Position': {
      size: 3,
      index: 0
    },
    'a_Pin': {
      size: 2,
      index: 3
    }

  },
  uniforms: {
    'u_ModelMatrix': {
      type: 'uniformMatrix4fv',
      value: new Matrix4().elements
    }
  }
})


let img = new Image();
img.src = './img/mf.jpg';

img.onload = () => {
  two.maps = {
    'u_Sampler': {
      image: img
    }
  }
  two.initMaps();
  render();

}

showTools((u_ModelMatrix) => {
  // u_ModelMatrix
  two.uniforms.u_ModelMatrix.value = u_ModelMatrix.elements;
  two.initUniforms();
  render()
});


function render() {
  gl.clearColor(0, 0, 0, 1)
  // 5.刷底色
  gl.clear(gl.COLOR_BUFFER_BIT);
  two.render();
}






