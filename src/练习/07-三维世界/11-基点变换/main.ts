import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import solidFragmentShader from "./glsl/solid/fragmentShader.glsl?raw";
import solidVertexShader from "./glsl/solid/vertexShader.glsl?raw";

import textureFragmentShader from "./glsl/textrue/fragmentShader.glsl?raw";
import textureVertexShader from "./glsl/textrue/vertexShader.glsl?raw";


import { initShaders } from "../../../../src/lib/webgl/utils";
import { Poly } from "./lib/Ploy";
import { Matrix4, OrthographicCamera, PerspectiveCamera, Vector2, Vector3, Spherical } from "three";
import { OrbitControls } from "./lib/OrbitControls";
import Obj3D from "./lib/Obj3D";
import Geometry from "./lib/geometry";
import Scene from "./lib/scene";
import Material from "./lib/material";

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;


gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);


/* 相机 */
const halfH = 1
const ratio = canvas.width / canvas.height
const halfW = halfH * ratio
const [left, right, top, bottom, near, far] = [
  -halfW, halfW, halfH, -halfH, 1, 8
]
const eye = new Vector3(0, 0, 2)
const target = new Vector3(0, 0, 0)
const camera = new OrthographicCamera(
  left, right, top, bottom, near, far
)
camera.position.copy(eye)
camera.lookAt(target)
camera.updateMatrixWorld()
const pvMatrix = camera.projectionMatrix.clone().multiply(
  camera.matrixWorldInverse
)

/* 计算图片顶点 */
const [w, h] = [0.6, 0.6]
const [hw, hh] = [w / 2, h / 2]
const vertices = new Float32Array([
  -hw, hh,
  -hw, -hh,
  hw, hh,
  hw, -hh,
])

// 场景
const scene = new Scene({ gl })
//模型矩阵
const mb = new Matrix4()
const mi = new Matrix4()

mb.setPosition(0.3, 0.3, 0)
mi.setPosition(-0.3, -0.3, 0)


/* 纹理三角形 */
const image = new Image()
image.src = '/static/erha.jpg'
image.onload = function () {
  const program = initShaders(gl, textureVertexShader, textureFragmentShader)
  let mm = new Matrix4();
  // 材质
  const material = new Material({
    program,
    data: {
      u_PvMatrix: {
        value: pvMatrix,
        type: 'uniformMatrix4fv',
      },
      u_ModelMatrix: {
        value: mm.elements,
        type: 'uniformMatrix4fv',
      },
    },
    maps: {
      u_Sampler: {
        image
      }
    },
    mode: 'TRIANGLE_STRIP'
  })

  // 几何体
  const geometry = new Geometry({
    data: {
      a_Position: {
        array: vertices,
        size: 2
      },
      a_Pin: {
        array: new Float32Array([
          0, 1,
          0, 0,
          1, 1,
          1, 0,
        ]),
        size: 2
      }
    },
  })

  // 三维对象
  const obj = new Obj3D({ material, geometry })

  scene.add(obj)
  // create();

  /* 统一设置uniform变量-投影视图矩阵 */
  scene.setUniform(
    'u_PvMatrix',
    {
      value: camera.projectionMatrix.clone().multiply(
        camera.matrixWorldInverse
      ).elements
    }
  )

  //渲染
  render()
}

let ang = 0.00;
let mm = mb.clone().multiply(new Matrix4().makeRotationZ(ang))
console.log(mb.elements, mm.elements)
function render(time = 0) {
  ang += 0.002;

  let mm = mb.clone().multiply(new Matrix4().makeRotationZ(ang)).multiply(mi)
  scene.children[0].material.setData(
    'u_ModelMatrix',
    {
      value: mm.elements
    }
  )
  scene.draw()
  requestAnimationFrame(render)
}