
type PaintType = 'POINTS' | 'TRIANGLES' | 'TRIANGLE_STRIP';
type sourceType = Float32Array;
type attr = { size: number, index: number, byteIndex?: number };
type uniform = { type: string, value: number[], transpose?: boolean };
interface PloyParams {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  paintType?: PaintType;
  source: sourceType;
  attributes?: Record<string, attr>,
  uniforms?: Record<string, uniform>,
  maps?: {},
}

const defAttr = () => ({
  type: 'POINTS',
  source: [],
  attributes: {},
  uniforms: {},
  maps: {}
})
export class Poly<T extends PloyParams, a extends keyof T['attributes'], u extends keyof T['uniforms']>  {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  paintType: PaintType;
  source: sourceType;
  attributes: Record<a, attr>;
  uniforms: Record<u, uniform>;
  maps: {};
  categorySize: number;
  sourceSize: number;
  categoryBytes: number;
  constructor(attr: T) {
    Object.assign(this, defAttr(), attr);
    this.init();
  }
  get elementBytes() {
    return this.source.BYTES_PER_ELEMENT;
  }
  init() {
    this.calculateSize();
    this.updateAttribute();
    this.updateUniform();

  }
  calculateSize() {
    const { attributes, elementBytes, source } = this;
    let categorySize = 0;
    Object.values<attr>(attributes).forEach(ele => {
      categorySize += ele.size;
      ele.byteIndex = ele.index * elementBytes;
    })
    this.categorySize = categorySize;
    this.categoryBytes = categorySize * elementBytes;

    this.sourceSize = source.length / categorySize;
  }
  updateAttribute() {
    const { gl, attributes, categoryBytes, source, program } = this
    const sourceBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sourceBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, source, gl.STATIC_DRAW)
    for (const key in attributes) {
      let { size, byteIndex } = attributes[key];
      const attr = gl.getAttribLocation(program, key)
      gl.vertexAttribPointer(
        attr,
        size,
        gl.FLOAT,
        false,
        categoryBytes,
        byteIndex as number
      )
      gl.enableVertexAttribArray(attr)
    }
  }

  updateUniform() {
    const { gl, uniforms, program } = this
    for (let key in uniforms) {
      const { type, value, transpose } = uniforms[key]
      const u = gl.getUniformLocation(program, key)

      if (type.includes('Matrix')) {
        //矩阵api的处理,第二个参数用于控制矩阵是否转置
        gl[type](u, !!transpose, value)
      } else {
        gl[type](u, value)
      }
    }
  }

  draw(paintType = this.paintType) {
    const { gl, sourceSize } = this;
    gl.drawArrays(gl[paintType], 0, sourceSize);
  }

}





