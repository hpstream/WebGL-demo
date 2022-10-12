// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";

import fragmentShader from "./glsl/fragmentShader.glsl?raw";


import * as dat from "dat.gui";

import { initShaders } from "./lib/utils";
import { Matrix3, Matrix4, Vector3 } from "three";


// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// gl.enable(gl.DEPTH_TEST)

// 封装着色器程序
const program = initShaders(gl, vertexShader, fragmentShader);


const verticeLib = [
  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, -1.0, -1.0,
  1.0, 1.0, -1.0,
  -1.0, 1.0, -1.0,
  -1.0, -1.0, -1.0,
];

const edges = [
  0, 1,
  1, 2,
  2, 3,
  3, 0,

  0, 5,
  1, 6,
  2, 7,
  3, 4,

  4, 5,
  5, 6,
  6, 7,
  7, 4
];

const arr: number[] = [];
edges.forEach(n => {
  const i = n * 3
  arr.push(
    verticeLib[i] / 5,
    verticeLib[i + 1] / 5,
    verticeLib[i + 2] / 5,
  )
})
const vertices = new Float32Array(arr)

// 缓冲对象
const vertexBuffer = gl.createBuffer();
// 绑定缓冲对象
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// 写入数据
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 获取attribute变量
const a_Position = gl.getAttribLocation(program, 'a_Position');
const u_Matrix = gl.getUniformLocation(program, 'u_Matrix');
const u_ViewMatrix = gl.getUniformLocation(program, 'u_ViewMatrix')


let gui = new dat.GUI();
let params = {
  originX: 0.1,
  originY: 0.2,
  translateX: 0,
  translateY: 0,

}

let o = gui.addFolder('视点')
o.open();
o.add(params, 'originX').min(-1).max(1).step(0.01).onChange(changeValue);
o.add(params, 'originY').min(-1).max(1).step(0.01).onChange(changeValue);
o.add(params, 'translateX').min(-1).max(1).step(0.01).onChange(changeValue);
o.add(params, 'translateY').min(-1).max(1).step(0.01).onChange(changeValue);


function changeValue() {
  change();
  render();
}



function change() {

  let matrix = getViewMatrix(
    new Vector3(params.originX, params.originY, 0.5),
    new Vector3(params.translateX, params.translateY, 0),
    new Vector3(0, 1, 0)
  )
  console.log(matrix)

  gl.uniformMatrix4fv(u_ViewMatrix, false, matrix)

  // const viewMatrix = new Matrix4().lookAt(
  //   new Vector3(params.originX, params.originY, 1),
  //   new Vector3(params.translateX, params.translateY, 0),
  //   new Vector3(0, 1, 0),
  // )
  // gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements)


}

change();

gl.uniformMatrix4fv(u_Matrix, false, new Matrix4().elements)


// 修改attribute变量
gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

// 赋能—批处理
gl.enableVertexAttribArray(a_Position);


/**
 * [getViewMatrix description]
 *
 * @param   {Vector3}  e  [e 相机的位置]
 * @param   {Vector3}  t  [t 相机所看的方向]
 * @param   {Vector3}  u  [u 相机绕视线转动的方向]
 *
 * @return  {[type]}      [return 视图矩阵]
 */
function getViewMatrix(e: Vector3, t: Vector3, u: Vector3) {
  //基向量c，视线
  const c = new Vector3().subVectors(e, t).normalize()
  //基向量a，视线和上方向的垂线
  const a = new Vector3().crossVectors(u, c).normalize()
  //基向量b，修正上方向
  const b = new Vector3().crossVectors(c, a).normalize()
  //正交旋转矩阵
  const mr = new Matrix4().set(
    ...a.toArray(), 0,
    ...b.toArray(), 0,
    -c.x, -c.y, -c.z, 0,
    0, 0, 0, 1
  )
  // //位移矩阵
  return [
    a.x, a.y, a.z, 0,
    b.x, b.y, b.z, 0,
    c.x, c.y, c.z, 0,
    0, 0, 0, 1
  ]
  // //位移矩阵
  // const mt = new Matrix4().set(
  //   1, 0, 0, -e.x,
  //   0, 1, 0, -e.y,
  //   0, 0, 1, -e.z,
  //   0, 0, 0, 1
  // )
  // return mr.multiply(mt).elements
}

render();
function render() {
  // 4.声明颜色RGBA
  gl.clearColor(0, 0, 0, 1);

  // 5.刷底色
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.LINES, 0, edges.length);
}



