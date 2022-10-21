// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";

import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { imgPromise, initShaders } from "./lib/utils";
import { Matrix3, Matrix4, PerspectiveCamera, Vector3 } from "three";
import { Two } from "./lib/Two";
import { showTools } from "./utils";
import gsap from "gsap";
import dat from "dat.gui";

// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// 封装着色器程序
const program = initShaders(gl, vertexShader, fragmentShader);
// gl.enable(gl.DEPTH_TEST);
// gl.enable(gl.CULL_FACE);// 可以让前面的物体挡住后面的物体

// 由于透视投影与视点的位置有关，所有需要进行矩阵乘法

let eye = new Vector3(0.8, 0.8, 4.0);
let target = new Vector3(0, 0, 0.0);
let up = new Vector3(0, 1, 0);

const [fov, aspect, near, far] = [
  45,
  canvas.width / canvas.height,
  1,
  20
]
const camera = new PerspectiveCamera(fov, aspect, near, far)
camera.position.copy(eye)
camera.lookAt(target)
// camera.up = up;
camera.updateWorldMatrix(true, true)

const positionMatrix = new Matrix4().setPosition(eye)

//旋转矩阵
const rotationMatrix = new Matrix4().lookAt(eye, target, up)

//视图矩阵
const u_ViewMatrix = new Matrix4().multiplyMatrices(
  positionMatrix,
  rotationMatrix
).invert();


let u_ProjectMatrix = camera.projectionMatrix;

//数据源
const source = new Float32Array([
  // 红色三角形
  ...[0.0, 0.5, -0.4, 1.0, 0.0, 0.0,
    -0.5, -0.5, -0.4, 1.0, 0.0, 0.0,
    0.5, -0.5, -0.4, 1.0, 0.0, 0.0,],
  // 绿色三角形
  ...[0.0, 0.5, -0.2, 0.0, 1.0, 0.0,
    -0.5, -0.5, -0.2, 0.0, 1.0, 0.0,
    0.5, -0.5, -0.2, 0.0, 1.0, 0.0],
  // 蓝色三角形
  ...[0.0, 0.5, 0.0, 0.0, 0.0, 1.0,
    -0.5, -0.5, 0.0, 0.0, 0.0, 1.0,
    0.5, -0.5, 0.0, 0.0, 0.0, 1.0,]

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
    'a_Color': {
      size: 3,
      index: 3
    }

  },
  uniforms: {
    'u_ModelMatrix': {
      type: 'uniformMatrix4fv',
      value: new Matrix4().elements
    },
    'u_ViewMatrix': {
      type: 'uniformMatrix4fv',
      value: u_ViewMatrix.elements
    },
    'u_ProjectMatrix': {
      type: 'uniformMatrix4fv',
      value: u_ProjectMatrix.elements
    }
  }
})

render()

function render() {
  gl.clearColor(0, 0, 0, 1)
  // 5.刷底色
  gl.clear(gl.COLOR_BUFFER_BIT);
  two.render();
}

