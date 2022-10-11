// 1.获取canvas节点
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

// 2.设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 3.获取三维画笔
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

let fragmentShader = `
void main(){
  gl_FragColor = vec4(1,1,0,1);
}
`;

let vertexShader = `
void main() {

  gl_Position = vec4(0, 0, 0, 1);
  gl_PointSize = 50.0;
}
`;

// 1.创建程序对象
const program = gl.createProgram() as WebGLProgram;
// 2.建立着色器对象
// 顶点着色器
const vshader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
gl.shaderSource(vshader, vertexShader)
gl.compileShader(vshader);
// 片元着色器
const fshader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
gl.shaderSource(fshader, fragmentShader)
gl.compileShader(fshader);


// console.log(vShader, fShader)
// 3.把顶点着色对象装进程序对象中
gl.attachShader(program, vshader);
gl.attachShader(program, fshader);

// 4.链接webgl上下文对象和程序
gl.linkProgram(program);
// 5.启动程序
gl.useProgram(program);



// 4.声明颜色RGBA
gl.clearColor(0, 0, 0, 1);

// 5.刷底色
gl.clear(gl.COLOR_BUFFER_BIT);

// 绘制顶点：
gl.drawArrays(gl.POINTS, 0, 1);

export { }

