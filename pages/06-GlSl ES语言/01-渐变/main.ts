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



const poly = new Poly({
  gl,
  program,
  source: new Float32Array([
    -1, 1,
    -1, -1,
    1, 1,
    1, -1
  ]),
  paintType: 'TRIANGLE_STRIP',
  attributes: {
    a_Position: {
      size: 2,
      index: 0
    }
  },
  uniforms: {
    u_CanvasSize: {
      type: 'uniform2fv',
      value: [canvas.width, canvas.height]
    }
  }
});


poly.draw();








