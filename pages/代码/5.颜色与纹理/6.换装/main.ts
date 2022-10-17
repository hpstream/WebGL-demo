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
  -0.4, 0.8, 0, 1,
  -0.4, -0.8, 0, 0.0,
  0.4, 0.8, 1.0, 1,
  0.4, -0.8, 1.0, 0.0,
]);
let i = 0;
let obj = {
  ratio: 0
}

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
    },
    'u_Ratio': {
      type: 'uniform1f',
      value: obj.ratio
    }
  }
})
let frame;

Promise.all([
  imgPromise('./img/dress.jpg'),
  imgPromise('./img/mask-dress.jpg')
]).then(([dress, mask]) => {
  console.log(two)
  two.maps.u_Sampler = {
    image: dress,
  }
  two.maps.u_Mask = {
    image: mask
  }
  changeShow();
})
function changeShow() {
  let pat1 = `./img/parttern/pattern${i % 5}.jpg`;
  let pat2 = `./img/parttern/pattern${(i + 1) % 5}.jpg`;

  Promise.all([
    imgPromise(pat1),
    imgPromise(pat2),
  ]).then(([pattern1, pattern2]) => {


    obj.ratio = 0;
    two.maps.u_Pattern1 = {
      image: pattern1
    };
    two.maps.u_Pattern2 = {
      image: pattern2
    };
    two.initMaps();
    gsap.to(obj, {
      ratio: 1,
      // repeat: 1,
      // yoyo: true,
      duration: 1.5,
      onComplete: () => {
        i++;
        changeShow();
      }

    })

  })
}
ani();

let params = {
  fn: () => {
    obj.ratio = 0;
    i++;
    changeShow();
  }
}
let gui = new dat.GUI();
gui.add(params, 'fn').name('换装');



function ani() {
  // console.log(obj.ratio)
  two.uniforms.u_Ratio.value = obj.ratio;
  two.initUniforms();
  render();
  frame = requestAnimationFrame(ani);
}


function render() {
  gl.clearColor(0, 0, 0, 1)
  // 5.刷底色
  gl.clear(gl.COLOR_BUFFER_BIT);
  two.render();
}






