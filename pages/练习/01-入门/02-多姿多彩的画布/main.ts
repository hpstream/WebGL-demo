import * as THREE from "three";


// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// 4.声明颜色RGBA
// 使用three 转换颜色
let color = new THREE.Color('rgba(255,255,0,1)');
gl.clearColor(color.r, color.g, color.b, 1)

// 5.刷底色
gl.clear(gl.COLOR_BUFFER_BIT)



