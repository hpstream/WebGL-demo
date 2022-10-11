import * as THREE from "three";


// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// 4.声明颜色RGBA
// gl.clearColor(1, 1, 0, 1);
gl.clearColor(...rgbaToArray("rgba(255,100,0,0.7)"))

// 5.刷底色
gl.clear(gl.COLOR_BUFFER_BIT)


// 转换函数

function rgbaToArray(color: string): [number, number, number, number] {

  //正则
  const reg = RegExp(/\((.*)\)/);
  //捕捉数据
  let exec = reg.exec(color);
  if (exec) {
    const rgbaStr = exec[1];

    //加工数据
    const rgba = rgbaStr.split(",").map((n) => parseFloat(n));
    console.log(rgba);
    const r = rgba[0] / 255;
    const g = rgba[1] / 255;
    const b = rgba[2] / 255;
    const a = rgba[3];
    console.log(r, g, b, a);
    return [r, g, b, a];
  } else {
    return [1, 1, 1, 1]
  }



}
