type types = 'POINTS' |
  'TRIANGLES' |
  'TRIANGLE_STRIP' |
  'TRIANGLE_FAN' |
  'LINES' |
  'LINE_STRIP' |
  'LINE_LOOP';

interface attributeParams {
  size: number;
  index: number;
}

interface uniformsParams {
  type: string;
  value: any;
}


interface TowParams {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  type?: types;
  source: Float32Array | Float64Array;
  attribute: Record<string, attributeParams>;
  uniforms: Record<string, uniformsParams>;
  sourceSize: number;
  elementBytes: number;
  categorySize: number;
}

const defAttr = () => ({
  gl: null,
  program: null,
  type: 'POINTS',
  source: new Float32Array(),
  sourceSize: 0,
  elementBytes: 0,
  categorySize: 0,
  attributes: {},
  uniforms: {},
})

export class Two<T extends TowParams, A extends T['attribute'], U extends T['uniforms']> implements TowParams {
  gl: WebGLRenderingContext;
  type?: types;
  source: Float32Array | Float64Array;
  attribute: Record<keyof A, attributeParams>;
  uniforms: Record<keyof U, uniformsParams>;
  sourceSize: number; // 顶点
  elementBytes: number; // 
  categorySize: number;//一个类目的数据
  program: WebGLProgram;

  constructor(attr: T) {
    Object.assign(this, defAttr(), attr);
    this.init();
  }

  init() {
    this.calculateSourceSize();
    this.initAttribute();
    this.initUniforms();
  }
  calculateSourceSize() {
    this.elementBytes = this.source.BYTES_PER_ELEMENT;
    let { attribute } = this;
    let categorySize = 0;

    Object.entries(attribute).forEach(([key, value]) => {
      categorySize += value.size;
    })
    // this

  }
  initAttribute() {
    let { attribute, gl, program, source, categorySize } = this;

    // 缓冲对象
    const vertexBuffer = gl.createBuffer();
    // 绑定缓冲对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 写入数据
    gl.bufferData(gl.ARRAY_BUFFER, source, gl.STATIC_DRAW);



    Object.entries(attribute).forEach(([key, value]) => {
      let attr = gl.getAttribLocation(program, key);
      gl.vertexAttribPointer(attr, value.size, gl.FLOAT, false, categorySize, value.index);
      gl.enableVertexAttribArray(attr);
    })


  }
  initUniforms() {


  }


}