import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";
import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { initShaders, getMousePosInWebgl } from "../../../src/lib/webgl/utils";

import Poly from "../../../src/lib/webgl/Ploy";
import gsap from "gsap";


const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// 支持Alpha;
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

let program = initShaders(gl, vertexShader, fragmentShader);

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

let timer: NodeJS.Timeout;
let poly = new Poly({
  gl, program,
  vertices: [],
  types: ['POINTS', 'LINE_STRIP'],
  circleDot: true
})
// 取消右键菜单提示
canvas.oncontextmenu = function () {
  return false;
}
enum eventType {
  stop,
  draw
}
let eventName: number;
canvas.addEventListener('mousedown', (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const { x, y } = getMousePosInWebgl(e, canvas);
    gl.clear(gl.COLOR_BUFFER_BIT);
    console.log(e.detail)
    // 获取鼠标的点击次数
    if (e.detail === 1) { // 添加
      if (eventName == eventType.stop) {
        emptyVertice();
      }
      addVertice(x, y)

    } else if (e.detail >= 2) { // 取消
      popVertice();
    }
  }, 100);
})
let point: any[] = [];

function emptyVertice() {
  eventName = eventType.draw;
  poly.emptyVertice();
}
function addVertice(x: number, y: number) {
  // poly.addVertice(x, y);
  let obj = { x, y, a: 1, pointSize: Math.random() }

  gsap.from(obj, {
    a: 0,
    yoyo: true,
    repeat: -1,
    duration: Math.random() * 1 + 0.5,
  })
  point.push(obj);
  poly.geoData = point;
  poly.updateVertices(['x', 'y', 'pointSize', 'a']);
  poly.draw();
}
function popVertice() {
  eventName = eventType.stop;
  point.pop();
  poly.updateVertices(['x', 'y', 'pointSize', 'a']);
  poly.draw();
}

canvas.addEventListener('mousemove', (e) => {
  // console.log(e)
  const { x, y } = getMousePosInWebgl(e, canvas);

  // if (poly.count - 1 > 0 && eventName == eventType.draw) {
  //   gl.clear(gl.COLOR_BUFFER_BIT);
  //   poly.setVertice(poly.count - 1, x, y);
  //   poly.draw();
  // }

})



