import * as THREE from "three";

// 导入着色器shader, '?rwa' vite支持的语法，认识是字符串
import vsSource from "./glsl/vertexShader.glsl?raw";
import fsSource from "./glsl/fragmentShader.glsl?raw";

import { initShaders } from "../../../src/lib/webgl/utils";
import { Matrix4 } from "three";


const canvas = document.querySelector('#canvas') as HTMLCanvasElement;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let program = initShaders(gl, vsSource, fsSource);


//声明颜色 rgba
gl.clearColor(0, 0, 0, 1);


//数据源
const source = new Float32Array([
  0, 0.4, 0, 0, 0, 1, 1,
  -0.2, -0.1, 0, 0, 1, 0, 1,
  0.2, -0.1, 0, 1, 1, 0, 1,
]);
// 元素的字节数
const elementBytes = source.BYTES_PER_ELEMENT;
// 系列尺寸
const verticeSize = 3;
const colorSize = 4;
// 类目尺寸
const categorySize = verticeSize + colorSize;
// 类目字节数
const categoryBytes = categorySize * elementBytes;
// 系列字节索引
const verticeByteIndex = 0;
const colorByteIndex = verticeSize * elementBytes;
// 顶点总数
const sourceSize = source.length / categorySize;

// 创建缓冲对象
const sourceBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, sourceBuffer);
gl.bufferData(gl.ARRAY_BUFFER, source, gl.STATIC_DRAW);

const a_Position = gl.getAttribLocation(program, 'a_Position');

gl.vertexAttribPointer(a_Position, verticeSize, gl.FLOAT, false, categoryBytes, verticeByteIndex);
gl.enableVertexAttribArray(a_Position);

const a_Color = gl.getAttribLocation(program, 'a_Color');
gl.vertexAttribPointer(a_Color, colorSize, gl.FLOAT, false, categoryBytes, colorByteIndex)

gl.enableVertexAttribArray(a_Color);

gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, sourceSize);




