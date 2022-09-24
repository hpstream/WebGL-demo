import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vsSource from "./glsl/vertexShader.glsl?raw";
import fsSource from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { Poly } from "./lib/Ploy";
import { Matrix4, OrthographicCamera, PerspectiveCamera, Vector2, Vector3, Spherical } from "three";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vsSource, fsSource);
gl.clearColor(0, 0, 0, 1);

const halfH = 2
const ratio = canvas.width / canvas.height
const halfW = halfH * ratio
const [left, right, top, bottom, near, far] = [
  -halfW, halfW, halfH, -halfH, 1, 8
]
const eye = new Vector3(1, 1, 2)
const target = new Vector3(0, 0, -3)
const up = new Vector3(0, 1, 0)

const camera = new OrthographicCamera(
  left, right, top, bottom, near, far
)
camera.position.copy(eye)
camera.lookAt(target)
camera.updateMatrixWorld()

//投影视图矩阵
const pvMatrix = new Matrix4()
  .multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  )
console.log(pvMatrix.elements)

/* 旋转轨道 */
const pi2 = Math.PI * 2
const spherical = new Spherical()
  .setFromVector3(
    camera.position.clone().sub(target)
  )
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

// 平移轨道
const mouseButtons = new Map([[2, 'pan'], [0, 'rotate']])
let state = 'none';
const [dragStart, dragEnd] = [
  new Vector2(),
  new Vector2(),
]
const panOffset = new Vector3()
const screenSpacePanning = true;
canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
})

canvas.addEventListener('pointerdown', ({ clientX, clientY, button }) => {
  // button:0 一个指头按, button:2 二个指头按
  console.log(clientX, clientY, button);
  dragStart.set(clientX, clientY);
  state = mouseButtons.get(button)

})

canvas.addEventListener('pointermove', (event) => {
  dragEnd.set(event.clientX, event.clientY)
  switch (state) {
    case 'pan':
      handleMouseMovePan(event)
      break;
    case 'rotate':
      console.log(dragEnd.clone().sub(dragStart))
      rotate(dragEnd.clone().sub(dragStart))
      break

    default:
      break;
  }
  dragStart.copy(dragEnd)
})
canvas.addEventListener('pointerup', () => {
  state = 'none'
})
canvas.addEventListener('pointerleave', () => {
  state = 'none'
})
/* 缩放轨道 */
//滚轮在每次滚动时的缩放系数
const zoomScale = 0.95
//滚轮事件
canvas.addEventListener('wheel', ({ deltaY }) => {
  // console.log(deltaY)
  console.log('deltaY', deltaY);
  if (deltaY < 0) {
    dolly(1 / zoomScale)
  } else {
    dolly(zoomScale)
  }
  update()
})
// 旋转方法
function rotate({ x, y }) {
  const { clientHeight } = canvas
  // spherical.theta -= pi2 * x / clientHeight
  // spherical.phi = Math.PI;
  spherical.theta -= pi2 * x / clientHeight
  spherical.phi -= pi2 * y / clientHeight
  update()
}
function dolly(dollyScale: number) {
  camera.zoom *= dollyScale
  camera.updateProjectionMatrix()
}
function handleMouseMovePan({ clientX, clientY }: PointerEvent) {
  dragEnd.set(clientX, clientY);
  pan(dragEnd.clone().sub(dragStart))
  dragStart.copy(dragEnd)
}


function pan(delta: THREE.Vector2) {
  const cameraW = camera.right - camera.left;
  const cameraH = camera.top - camera.bottom;
  const ratioX = delta.x / canvas.clientWidth;
  const ratioY = delta.y / canvas.clientHeight;
  const distanceLeft = ratioX * cameraW;
  const distanceUp = ratioY * cameraH;

  const mx = new Vector3().setFromMatrixColumn(camera.matrix, 0)
  const vx = mx.clone().multiplyScalar(-distanceLeft);

  const vy = new Vector3();
  if (screenSpacePanning) {
    vy.setFromMatrixColumn(camera.matrix, 1);
  } else {
    vy.crossVectors(camera.up, mx);
  }

  vy.multiplyScalar(distanceUp);
  panOffset.copy(vx.add(vy))
  // camera.position.add(new Vector3(distanceLeft, distanceUp, 0))
  update();

}
function update() {
  //基于平移量平移相机
  target.add(panOffset)
  camera.position.add(panOffset)

  //基于旋转量旋转相机
  const rotateOffset = new Vector3()
    .setFromSpherical(spherical)
  camera.position.copy(
    target.clone().add(rotateOffset)
  )

  camera.lookAt(target)
  camera.updateMatrixWorld(true)
  pvMatrix.multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse,
  )
  //重置旋转量和平移量
  spherical.setFromVector3(
    camera.position.clone().sub(target)
  )
  panOffset.set(0, 0, 0)
  render()
}



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


