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
  if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {

    const programLog = (gl.getProgramInfoLog(program) as string).trim();
    const vertexErrors = getShaderErrors(gl, vextexShader, 'vertex');
    const fragmentErrors = getShaderErrors(gl, fragmentShader, 'fragment');

    console.error(
      'THREE.WebGLProgram: Shader Error ' + gl.getError() + ' - ' +
      'VALIDATE_STATUS ' + gl.getProgramParameter(program, gl.VALIDATE_STATUS) + '\n\n' +
      'Program Info Log: ' + programLog + '\n' +
      vertexErrors + '\n' +
      fragmentErrors
    );

  }
  return program;
}
function getShaderErrors(gl: WebGLRenderingContext, shader: WebGLShader, type: string) {

  const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  const errors = (gl.getShaderInfoLog(shader) as string).trim();
  if (status && errors === '') return '';

  const errorMatches = /ERROR: 0:(\d+)/.exec(errors);
  if (errorMatches) {
    const errorLine = parseInt(errorMatches[1]);
    return type.toUpperCase() + '\n\n' + errors + '\n\n' + handleSource(gl.getShaderSource(shader) as string, errorLine);

  } else {

    return errors;

  }

}
function handleSource(string: string, errorLine: number) {

  const lines = string.split('\n');
  const lines2: string[] = [];

  const from = Math.max(errorLine - 6, 0);
  const to = Math.min(errorLine + 6, lines.length);

  for (let i = from; i < to; i++) {

    const line = i + 1;
    lines2.push(`${line === errorLine ? '>' : ' '} ${line}: ${lines[i]}`);

  }

  return lines2.join('\n');

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

export function imgPromise(src: string) {

  return new Promise<HTMLImageElement>((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img)
    }
    img.onerror = (e) => {
      reject(e);
    }
  })



}

export function getMousePosInWebgl({ clientX, clientY }: MouseEvent, canvas: HTMLCanvasElement) {

  const { left, top, width, height } = canvas.getBoundingClientRect();
  let [positionX, positionY] = [clientX - left, clientY - top];

  // 屏幕中心为原点坐标系
  let [originX, originY] = [width / 2, height / 2];

  // 进行转换
  let [x, y] = [(positionX - originX) / originX, -(positionY - originY) / originY];
  return { x, y }
}