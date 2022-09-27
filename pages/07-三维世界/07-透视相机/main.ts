import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vsSource from "./glsl/vertexShader.glsl?raw";
import fsSource from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { Poly } from "./lib/Ploy";
import { Matrix4, OrthographicCamera, PerspectiveCamera, Vector2, Vector3, Spherical } from "three";
import { OrbitControls } from "../08-封装相机/lib/OrbitControls";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vsSource, fsSource);
gl.clearColor(0, 0, 0, 1);

const eye = new Vector3(1, 1, 2)
const target = new Vector3(0, 0, -3)
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
camera.updateMatrixWorld()

//投影视图矩阵
const pvMatrix = new Matrix4();

const triangle1 = crtTriangle(
  [1, 0, 0, 1],
  [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    -0.5, 0, -3, 1,
  ]
)
const triangle2 = crtTriangle(
  [1, 0, 0, 1],
  new Matrix4().setPosition(0.5, 0, -3).elements
)

const triangle3 = crtTriangle(
  [1, 1, 0, 1],
  new Matrix4().setPosition(-0.5, 0, -2).elements
)

const triangle4 = crtTriangle(
  [1, 1, 0, 1],
  new Matrix4().setPosition(0.5, 0, -2).elements
)


canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
}) /* 实例化轨道控制器 */
const orbit = new OrbitControls({
  camera, target,
  dom: canvas,
});

canvas.addEventListener('pointerdown', ({ clientX, clientY, button }) => {
  orbit.pointerdown(event)

})

canvas.addEventListener('pointermove', (event) => {
  orbit.pointermove(event)
  pvMatrix.copy(orbit.getPvMatrix())
  render()
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
  render()
})

pvMatrix.copy(orbit.getPvMatrix())
render()
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  triangle1.init()
  triangle1.draw()
  triangle2.init()
  triangle2.draw()
  triangle3.init()
  triangle3.draw()
  triangle4.init()
  triangle4.draw()
}


function crtTriangle(color: number[], modelMatrix: number[]) {
  return new Poly({
    gl,
    program,
    source: new Float32Array([
      0, 0.3, 0,
      -0.3, -0.3, 0,
      0.3, -0.3, 0,
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
      u_ModelMatrix: {
        type: 'uniformMatrix4fv',
        value: modelMatrix
      }
    }
  })
}


