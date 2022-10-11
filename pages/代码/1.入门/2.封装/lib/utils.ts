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