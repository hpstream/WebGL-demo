import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import solidFragmentShader from "./glsl/solid/fragmentShader.glsl?raw";
import solidVertexShader from "./glsl/solid/vertexShader.glsl?raw";

import textureFragmentShader from "./glsl/textrue/fragmentShader.glsl?raw";
import textureVertexShader from "./glsl/textrue/vertexShader.glsl?raw";


import { initShaders } from "../../../src/lib/webgl/utils";
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



// 场景
const scene = new Scene({ gl })

function create() {
  /* 建立纯色三角形 */
  {
    const program = initShaders(gl, solidVertexShader, solidFragmentShader)

    // 材质
    const material = new Material({
      program,
      data: {
        u_Time: {
          value: 0,
          type: 'uniform1f'
        },
        u_PvMatrix: {
          value: new Matrix4().elements,
          type: 'uniformMatrix4fv'
        },
        u_ModelMatrix: {
          value: new Matrix4().elements,
          type: 'uniformMatrix4fv'
        },
      }
    })

    // 几何体
    const geometry = new Geometry({
      data: {
        a_Position: {
          array: new Float32Array([
            -0.5, 0.5,
            -0.5, -0.5,
            0.5, -0.5,
          ]),
          size: 2
        }
      }
    })

    // 三维对象
    const obj = new Obj3D({ material, geometry })

    // 把三维对象添加到场景中
    scene.add(obj)

  }

}
/* 纹理三角形 */
const image = new Image()
image.src = '/static/erha.jpg'
image.onload = function () {
  const program = initShaders(gl, textureVertexShader, textureFragmentShader)

  // 材质
  const material = new Material({
    program,
    data: {
      u_PvMatrix: {
        value: new Matrix4().elements,
        type: 'uniformMatrix4fv',
      },
      u_ModelMatrix: {
        value: new Matrix4().elements,
        type: 'uniformMatrix4fv',
      },
    },
    maps: {
      u_Sampler: {
        image
      }
    }
  })

  // 几何体
  const geometry = new Geometry({
    data: {
      a_Position: {
        array: new Float32Array([
          0.5, 0.5,
          -0.5, 0.5,
          0.5, -0.5,
        ]),
        size: 2
      },
      a_Pin: {
        array: new Float32Array([
          1, 1,
          0, 1,
          1, 0,
        ]),
        size: 2
      }
    },
  })

  // 三维对象
  const obj = new Obj3D({ material, geometry })
  create();
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

function render(time = 0) {
  scene.children[0].material.setData(
    'u_Time',
    {
      value: time
    }
  )
  scene.draw()
  requestAnimationFrame(render)
}