import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";
import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { initShaders, getMousePosInWebgl } from "../../../src/lib/webgl/utils";

import Poly from "../../../src/lib/webgl/Ploy";


const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

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
        eventName = eventType.draw;
        poly.emptyVertice();
      }
      poly.addVertice(x, y);
      poly.draw();


    } else if (e.detail >= 2) { // 取消
      eventName = eventType.stop;
      poly.popVertice();
      poly.draw();
    }
  }, 100);
})

canvas.addEventListener('mousemove', (e) => {
  // console.log(e)
  const { x, y } = getMousePosInWebgl(e, canvas);

  if (poly.count - 1 > 0 && eventName == eventType.draw) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    poly.setVertice(poly.count - 1, x, y);
    poly.draw();
  }


})



