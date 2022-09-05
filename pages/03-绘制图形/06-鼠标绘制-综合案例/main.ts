import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";
import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { initShaders, getMousePosInWebgl, glToCssPos } from "../../../src/lib/webgl/utils";

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
  attrName: 'a_Attr',
  size: 4,
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
  let obj = { x, y, a: 1, pointSize: 10 }

  gsap.from(obj, {
    a: 0,
    pointSize: 0,
    yoyo: true,
    repeat: -1,
    duration: 0.5,
  })
  point.push(obj);
  poly.geoData = point;
  eventName = eventType.draw;
}
function popVertice() {
  eventName = eventType.stop;
  point.pop();
}
function setVertice(i: number, x: number, y: number) {
  // poly.setVertice(poly.count - 1, x, y);
  point[point.length - 1].x = x;
  point[point.length - 1].y = y;

}

function hoverPoint(mx: number, my: number) {

  for (let geoData of point) {
    let obj = geoData;
    const delta = {
      x: mx - obj.x,
      y: my - obj.y
    }
    const { x, y } = glToCssPos(delta, canvas)
    // 如果小于半径10，就代码点重叠
    const dist = x * x + y * y
    if (dist < 100) {
      return obj
    }
  }
  return null

}

canvas.addEventListener('mousemove', (e) => {
  // console.log(e)
  const { x, y } = getMousePosInWebgl(e, canvas);

  let point = hoverPoint(x, y);
  canvas.style.cursor = point ? 'pointer' : 'default'
  console.log(eventName, eventType.draw)
  if (poly.count - 1 > 0 && eventName == eventType.draw) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    setVertice(poly.count - 1, x, y)

  }

})

function render() {
  poly.updateVertices(['x', 'y', 'pointSize', 'a']);
  gl.clear(gl.COLOR_BUFFER_BIT);
  poly.draw();
  requestAnimationFrame(render)
}

render()

