import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vsSource from "./glsl/vertexShader.glsl?raw";
import fsSource from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { Poly } from "./lib/Ploy";
import { Matrix4, OrthographicCamera, Vector3 } from "three";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vsSource, fsSource);


//声明颜色 rgba
gl.clearColor(0, 0, 0, 1);
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

const eye = new Vector3(0, 0, 3)
const target = new Vector3(0.5, 0.5, 0)
const up = new Vector3(0, 1, 0)

//正交相机
const camera = new OrthographicCamera(
  left, right, top, bottom, near, far
)
camera.position.copy(eye)
camera.lookAt(target)
camera.updateWorldMatrix(true, true)



//投影视图矩阵
const pvMatrix = new Matrix4()
  .multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  )

console.log(camera.matrixWorld.elements);
console.log(camera.matrixWorldInverse.elements);
// console.log(new Matrix4()
//   .multiplyMatrices(
//     camera.matrixWorld.clone(),
//     camera.matrixWorldInverse.clone()
//   ))

const triangle1 = crtTriangle(
  [1, 0, 0, 1],
  [
    0, 0.3, -0.2,
    - 0.3, -0.3, -0.2,
    0.3, -0.3, -0.2
  ]
)
const triangle2 = crtTriangle(
  [1, 1, 0, 1],
  [
    0, 0.3, 0.2,
    - 0.3, -0.3, 0.2,
    0.3, -0.3, 0.2
  ]
)

render()

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  triangle1.init()
  triangle1.draw()
  triangle2.init()
  triangle2.draw()
}


function crtTriangle(color: number[], source: number[]) {
  return new Poly({
    gl,
    program,
    source: new Float32Array(source),
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
        value: color
      },
      u_ProjectionMatrix: {
        type: 'uniformMatrix4fv',
        value: pvMatrix.elements
      },
    },
  });

}










