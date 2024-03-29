

export function initShaders(gl: WebGLRenderingContext, vShader: string, fShader: string) {
  // 1.创建程序对象
  const program = gl.createProgram() as WebGLProgram;
  // 2.建立着色器对象
  const vextexShader = loadShader(gl, gl.VERTEX_SHADER, vShader);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fShader);
  // console.log(vShader, fShader)
  // 3.把顶点着色对象装进程序对象中
  gl.attachShader(program, vextexShader);
  gl.attachShader(program, fragmentShader);
  // 4.链接webgl上下文对象和程序
  gl.linkProgram(program);
  // 5.启动程序
  gl.useProgram(program);
  // 6.将程序对象挂到上下文对象上
  // gl.program = program;
  return program;
}

export function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type) as WebGLShader;
  if (shader) {
    // 3.讲着色器文件传入着色器对象中
    gl.shaderSource(shader, source)
    // 4.编译着色器对象
    gl.compileShader(shader);
  }
  return shader;
}

export function getMousePosInWebgl({ clientX, clientY }, canvas: HTMLCanvasElement) {
  //鼠标在画布中的css位置
  const { left, top, width, height } = canvas.getBoundingClientRect();
  const [cssX, cssY] = [clientX - left, clientY - top];
  //解决坐标原点位置的差异
  const [halfWidth, halfHeight] = [width / 2, height / 2];
  const [xBaseCenter, yBaseCenter] = [
    cssX - halfWidth,
    cssY - halfHeight,
  ];
  // 解决y 方向的差异
  const yBaseCenterTop = -yBaseCenter;
  //解决坐标基底的差异
  return {
    x: xBaseCenter / halfWidth,
    y: yBaseCenterTop / halfHeight
  }
}

export function glToCssPos({ x, y }, { width, height }) {
  const [halfWidth, halfHeight] = [width / 2, height / 2];
  return {
    x: x * halfWidth,
    y: -y * halfHeight
  }
}

//线性比例尺 y= ax+b;
function ScaleLinear(ax: number, ay: number, bx: number, by: number) {
  const delta = {
    x: bx - ax,
    y: by - ay,
  };
  const k = delta.y / delta.x;
  const b = ay - ax * k;
  return function (x) {
    return k * x + b;
  };
}
