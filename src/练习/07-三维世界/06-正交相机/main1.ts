import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vsSource from "./glsl/vertexShader.glsl?raw";
import fsSource from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { Poly } from "./lib/Ploy";
import { Matrix4, OrthographicCamera, PerspectiveCamera, Vector2, Vector3, Spherical } from "three";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const [viewW, viewH] = [window.innerWidth, window.innerHeight]
canvas.width = viewW;
canvas.height = viewH;
const gl = canvas.getContext('webgl');

let program = initShaders(gl, vsSource, fsSource);
gl.clearColor(0.0, 0.0, 0.0, 1.0);

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
const pvMatrix = new Matrix4()
pvMatrix.multiplyMatrices(
  camera.projectionMatrix,
  camera.matrixWorldInverse,
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


/* 声明基础数据 */
//鼠标事件集合
const mouseButtons = new Map([
  [0, 'rotate'],
  [2, 'pan'],
])
//轨道状态
let state = 'none'
//2PI
const pi2 = Math.PI * 2
//鼠标拖拽的起始位和结束位，无论是左键按下还是右键按下
const [dragStart, dragEnd] = [
  new Vector2(),
  new Vector2(),
]

/* 平移轨道 */
//平移量
const panOffset = new Vector3()
//是否沿相机y轴平移相机
const screenSpacePanning = true

/* 缩放轨道 */
//滚轮在每次滚动时的缩放系数
const zoomScale = 0.95

/* 旋转轨道 */
const spherical = new Spherical()
  .setFromVector3(
    camera.position.clone().sub(target)
  )

/* 取消右击菜单的显示 */
canvas.addEventListener('contextmenu', (event) => {
  event.preventDefault()
})

/* 指针按下时，设置拖拽起始位，获取轨道控制器状态。 */
canvas.addEventListener('pointerdown', ({ clientX, clientY, button }) => {
  dragStart.set(clientX, clientY)
  state = mouseButtons.get(button)
})

/* 指针移动时，若控制器处于平移状态，平移相机；若控制器处于旋转状态，旋转相机。 */
canvas.addEventListener('pointermove', ({ clientX, clientY }) => {
  dragEnd.set(clientX, clientY)
  switch (state) {
    case 'pan':
      pan(dragEnd.clone().sub(dragStart))
      break
    case 'rotate':
      rotate(dragEnd.clone().sub(dragStart))
      break
  }
  dragStart.copy(dragEnd)
})
canvas.addEventListener('pointerup', (event) => {
  state = 'none'
})

//滚轮事件
canvas.addEventListener('wheel', handleMouseWheel)
function handleMouseWheel({ deltaY }) {
  console.log('deltaY', deltaY);
  if (deltaY < 0) {
    dolly(1 / zoomScale)
  } else {
    dolly(zoomScale)
  }
  update()
}

function dolly(dollyScale) {
  camera.zoom *= dollyScale
  camera.updateProjectionMatrix()
}

//平移方法
function pan({ x, y }) {
  const cameraW = camera.right - camera.left
  const cameraH = camera.top - camera.bottom
  const ratioX = x / canvas.clientWidth
  const ratioY = y / canvas.clientHeight
  const distanceLeft = ratioX * cameraW
  const distanceUp = ratioY * cameraH
  const mx = new Vector3().setFromMatrixColumn(camera.matrix, 0)
  const vx = mx.clone().multiplyScalar(-distanceLeft)
  const vy = new Vector3()
  if (screenSpacePanning) {
    vy.setFromMatrixColumn(camera.matrix, 1)
  } else {
    vy.crossVectors(camera.up, mx)
  }
  vy.multiplyScalar(distanceUp)
  panOffset.copy(vx.add(vy))
  update()
}

// 旋转方法
function rotate({ x, y }) {
  const { clientHeight } = canvas
  spherical.theta -= pi2 * x / clientHeight
  spherical.phi -= pi2 * y / clientHeight
  update()
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

  //更新投影视图矩阵
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

  // 渲染
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

function crtTriangle(color, modelMatrix) {
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