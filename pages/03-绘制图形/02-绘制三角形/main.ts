import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vertexShader from "./glsl/vertexShader.glsl?raw";
import fragmentShader from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";


const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vertexShader, fragmentShader);


/* 
如何向attribute变量中可入多点，并绘制多点 
1. 建立顶点数据
*/
let vertices = new Float32Array([
  -0.2, 0.2,
  -0.2, -0.2,
  0.2, 0.2,

  0.2, 0.2,
  -0.2, -0.2,
  0.2, -0.2
])
// 2.创建缓冲区
let vertexBuffer = gl.createBuffer();
// 3.绑定缓冲对象
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
/* 
4.将数据写入缓冲区 
gl.STATIC_DRAW 表示一次性写入数据的意思，着色器绘制多次。
*/
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
// 5. 获取attribute变量
let a_Position = gl.getAttribLocation(program, 'a_Position');
// 6. 将数据写入给attibute变量
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

// 7. 让webgl进行批处理
gl.enableVertexAttribArray(a_Position);



gl.clearColor(0, 0, 0, 1);

gl.clear(gl.COLOR_BUFFER_BIT);

/* 
绘制方式：
1. gl.POINTS 绘制点
2. gl.TRIANGLES 绘制三角形
3. gl.TRIANGLE_STRIP 三角带
4. gl.TRIANGLE_FAN 三角扇
5. gl.LINES 单独线段
6. gl.LINE_STRIP 线条
7. gl.LINE_LOOP 闭合线条

*/

gl.drawArrays(gl.TRIANGLES, 0, 6);





