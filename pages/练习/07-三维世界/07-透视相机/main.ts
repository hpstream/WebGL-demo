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
const rotateDir = 'xy'
// 旋转方法
function rotate({ x, y }) {
  const { clientHeight } = canvas
  const deltaT = pi2 * x / clientHeight
  const deltaP = pi2 * y / clientHeight
  if (rotateDir.includes('x')) {
    spherical.theta -= deltaT
  }
  if (rotateDir.includes('y')) {
    const phi = spherical.phi - deltaP
    spherical.phi = Math.min(
      Math.PI * 0.99999999,
      Math.max(0.00000001, phi)
    )
  }
  update()
}
function dolly(dollyScale: number) {
  // camera.position.lerp(target, 1 - dollyScale);
  spherical.radius *= dollyScale
}
function handleMouseMovePan({ clientX, clientY }: PointerEvent) {
  dragEnd.set(clientX, clientY);
  pan(dragEnd.clone().sub(dragStart))
  dragStart.copy(dragEnd)
}


function pan({ x, y }: THREE.Vector2) {
  const { matrix, position, up } = camera
  const { clientWidth, clientHeight } = canvas
  //视线长度：相机视点到目标点的距离
  const sightLen = position.clone().sub(target).length()
  //视椎体垂直夹角的一半(弧度)
  //(fov/2)*Math.PI/180
  const halfFov = fov * Math.PI / 360
  //目标平面的高度
  const targetHeight = sightLen * Math.tan(halfFov) * 2

  //目标平面与画布的高度比
  const ratio = targetHeight / clientHeight

  //画布位移量转目标平面位移量
  const distanceLeft = x * ratio
  const distanceUp = y * ratio



  //相机平移方向
  //鼠标水平运动时，按照相机本地坐标的x轴平移相机
  const mx = new Vector3().setFromMatrixColumn(matrix, 0)
  //鼠标水平运动时，按照相机本地坐标的y轴，或者-z轴平移相机
  const myOrz = new Vector3()
  if (screenSpacePanning) {
    //y轴，正交相机中默认
    myOrz.setFromMatrixColumn(matrix, 1)
  } else {
    //-z轴，透视相机中默认
    myOrz.crossVectors(up, mx)
  }

  //目标平面位移量转世界坐标
  const vx = mx.clone().multiplyScalar(-distanceLeft)
  const vy = myOrz.clone().multiplyScalar(distanceUp)
  panOffset.copy(vx.add(vy))

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

