// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";

import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { imgPromise, initShaders } from "./lib/utils";
import { Matrix3, Matrix4 } from "three";
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
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);// 可以让前面的物体挡住后面的物体


//数据源
const source = new Float32Array([
  -0.5, 0.4, 0, 1,
  -0.5, -0.4, 0, 0.0,
  0.5, 0.4, 1.0, 1,
  0.5, -0.4, 1.0, 0.0,
]);


let two = new Two({
  gl,
  program,
  source: source,
  type: 'TRIANGLE_STRIP',
  attribute: {
    'a_Position': {
      size: 2,
      index: 0
    },
    'a_Pin': {
      size: 2,
      index: 2
    }

  },
  uniforms: {
    'u_ModelMatrix': {
      type: 'uniformMatrix4fv',
      value: new Matrix4().elements
    }
  }
})
/* 建立video对象 */
const video = document.createElement('video');
video.src = 'http://img.yxyy.name/ripples.mp4';
video.autoplay = true;
video.muted = true;
video.loop = true;
video.setAttribute("crossOrigin", 'Anonymous');
video.play();
video.addEventListener('playing', () => {
  two.maps.u_Sampler = {
    image: video,
    wrapS: 'CLAMP_TO_EDGE',
    wrapT: 'CLAMP_TO_EDGE',
    minFilter: 'LINEAR'
  }

})

ani();
function ani() {
  two.initMaps();
  render();
  requestAnimationFrame(ani);
}

function render() {
  gl.clearColor(0, 0, 0, 1)
  // 5.刷底色
  gl.clear(gl.COLOR_BUFFER_BIT);
  two.render();
}

