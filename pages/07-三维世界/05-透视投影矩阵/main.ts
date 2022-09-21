import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vsSource from "./glsl/vertexShader.glsl?raw";
import fsSource from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { Poly } from "./lib/Ploy";
import { Matrix4, OrthographicCamera, PerspectiveCamera, Vector3 } from "three";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vsSource, fsSource);
gl.clearColor(0, 0, 0, 1);

const [fov, aspect, near, far] = [
  45,
  canvas.width / canvas.height,
  1,
  20
]
const camera = new PerspectiveCamera(fov, aspect, near, far)

const eye = new Vector3(1, 0.5, 1)
const target = new Vector3(0, 0, -2.5)
const up = new Vector3(0, 1, 0)
camera.position.copy(eye)
camera.lookAt(target)
camera.updateWorldMatrix(true, true)

//投影视图矩阵
const pvMatrix = new Matrix4()
  .multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  )


console.log(pvMatrix.elements)
const triangle1 = crtTriangle(
  [1, 0, 0, 1],
  [-0.5, 0, -3]
)
// const triangle2 = crtTriangle(
//   [1, 1, 0, 1],
//   [0.5, 0, -3]
// )
const triangle3 = crtTriangle(
  [1, 1, 0, 1],
  [-0.5, 0, -2]
)

// const triangle4 = crtTriangle(
//   [1, 1, 0, 1],
//   [0.5, 0, -2]
// )

render()

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  triangle1.init()
  triangle1.draw()
  // triangle2.init()
  // triangle2.draw()
  triangle3.init()
  triangle3.draw()
  // triangle4.init()
  // triangle4.draw()
}


function crtTriangle(color, [x, y, z]) {
  return new Poly({
    gl,
    program,
    source: new Float32Array([
      x, 0.3 + y, z,
      - 0.3 + x, -0.3 + y, z,
      0.3 + x, -0.3 + y, z
    ]),
    paintType: 'TRIANGLES',
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
    }
  })
}










