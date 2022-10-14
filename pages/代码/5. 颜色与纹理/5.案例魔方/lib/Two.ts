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

type wrapST = 'CLAMP_TO_EDGE' | 'REPEAT' | 'MIRRORED_REPEAT'
interface mapsParams {
  format?: 'RGB' | 'RGBA',
  image: HTMLImageElement,
  wrapS?: wrapST,
  wrapT?: wrapST,
  magFilter?: 'LINEAR' | 'NEAREST',
  minFilter?: 'LINEAR' | 'NEAREST' | 'NEAREST_MIPMAP_NEAREST' | 'NEAREST_MIPMAP_LINEAR' | 'LINEAR_MIPMAP_NEAREST' | 'LINEAR_MIPMAP_LINEAR'
}

export interface TowParams {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  type?: types;
  source: Float32Array | Float64Array;
  attribute: Record<string, attributeParams>;
  uniforms: Record<string, uniformsParams>;
  maps?: Record<string, mapsParams>
  // sourceSize: number;
  // elementBytes: number;
  // categorySize: number;
}

const defAttr = () => ({
  gl: null,
  program: null,
  type: 'POINTS',
  source: new Float32Array(),
  sourceSize: 0,
  elementBytes: 0,
  categorySize: 0,
  categoryBytes: 0,
  attributes: {},
  uniforms: {},
  maps: {}
})

export class Two<T extends TowParams, A extends T['attribute'] = {}, U extends T['uniforms'] = {}> implements TowParams {
  gl: WebGLRenderingContext;
  type?: types;
  source: Float32Array | Float64Array;
  attribute: Record<keyof A, attributeParams>;
  uniforms: Record<keyof U, uniformsParams>;
  sourceSize: number; // 顶点
  elementBytes: number; // 
  categorySize: number;//一个类目的数据
  categoryBytes: number;
  program: WebGLProgram;
  maps: Record<string, mapsParams>;

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
    let { attribute, source } = this;
    let categorySize = 0;

    Object.entries(attribute).forEach(([key, value]) => {
      categorySize += value.size;
    })
    this.categorySize = categorySize;
    this.categoryBytes = categorySize * this.elementBytes;
    this.sourceSize = source.length / categorySize;


  }
  initAttribute() {
    let { attribute, gl, program, source, categorySize, categoryBytes, elementBytes } = this;

    // 缓冲对象
    const vertexBuffer = gl.createBuffer();
    // 绑定缓冲对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 写入数据
    gl.bufferData(gl.ARRAY_BUFFER, source, gl.STATIC_DRAW);

    Object.entries(attribute).forEach(([key, value]) => {
      console.log(value.size, categoryBytes, value.index * elementBytes)
      let attr = gl.getAttribLocation(program, key);
      gl.vertexAttribPointer(attr, value.size, gl.FLOAT, false, categoryBytes, value.index * elementBytes);
      gl.enableVertexAttribArray(attr);
    })

  }
  initUniforms() {
    let { gl, program, uniforms } = this;
    Object.entries(uniforms).forEach(([key, val]) => {
      let uniform = gl.getUniformLocation(program, key);
      const { type, value } = val;
      console.log(type.includes('Matrix'))
      if (type.includes('Matrix')) {
        gl[type](uniform, false, value);
      } else {
        gl[type](uniform, value)
      }
    })
  }
  initMaps() {

    let { gl, program, maps } = this;

    console.log(maps)
    Object.entries(maps).forEach(([key, val], ind) => {
      const {
        format = 'RGB',
        image,
        wrapS,
        wrapT,
        magFilter,
        minFilter
      } = val

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
      gl.activeTexture(gl[`TEXTURE${ind}`])
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl[format],
        gl[format],
        gl.UNSIGNED_BYTE,
        image
      )

      wrapS && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl[wrapS]
      )
      wrapT && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl[wrapT]
      )

      magFilter && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        gl[magFilter]
      )

      if (!minFilter || gl[minFilter] > gl.LINEAR) {
        gl.generateMipmap(gl.TEXTURE_2D)
      }

      minFilter && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl[minFilter]
      )

      const u = gl.getUniformLocation(program, key)
      gl.uniform1i(u, ind)
    })
  }
  render(type = this.type) {
    const { gl, sourceSize } = this;
    type && gl.drawArrays(gl[type], 0, sourceSize)
  }
}