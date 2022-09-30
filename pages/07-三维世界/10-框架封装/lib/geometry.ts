
type PaintType = 'POINTS' | 'TRIANGLES';

export interface GeometryParams {
  data: any
}
interface IData {
  array: number;
  buffer?: WebGLBuffer;
  size?: number;
  location?: number;
  needUpdate?: boolean;
}
const defAttr = () => ({
  data: {},
  count: 0,
  index: null,
  drawType: 'drawArrays'
})
export default class Geometry<T extends GeometryParams, D extends T['data']> {
  data: Record<D, IData>;
  drawType: string;
  count: number;
  index: {
    array: Float32Array;
    buffer: WebGLBuffer;
    needUpdate: boolean;
  }
  constructor(attr: T) {
    Object.assign(this, defAttr(), attr)
  }
  init(gl: WebGLRenderingContext, program: WebGLProgram) {
    gl.useProgram(program)
    this.initData(gl, program)
    this.initIndex(gl)
  }
  initData(gl: WebGLRenderingContext, program: WebGLProgram) {
    for (let [key, attr] of Object.entries(this.data) as [string, IData][]) {
      attr.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, attr.buffer)
      gl.bufferData(gl.ARRAY_BUFFER, attr.array, gl.STATIC_DRAW)
      const location = gl.getAttribLocation(program, key)
      gl.vertexAttribPointer(location, attr.size, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(location)
      attr.location = location
    }
  }
  initIndex(gl: WebGLRenderingContext) {
    const { index } = this
    if (index) {
      this.count = index.array.length
      this.drawType = 'drawElements'
      index.buffer = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index.buffer)
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, index.array, gl.STATIC_DRAW)
    } else {
      const { array, size } = this.data['a_Position']
      this.count = array.length / size
      this.drawType = 'drawArrays'
    }
  }
  update(gl: WebGLRenderingContext) {
    this.updateData(gl)
    this.updateIndex(gl)
  }
  updateData(gl: WebGLRenderingContext) {
    for (let attr of Object.values(this.data) as IData[]) {
      const { buffer, location, size, needUpdate, array } = attr;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      if (needUpdate) {
        attr.needUpdate = false
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW)
      }
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0)
    }
  }
  updateIndex(gl: WebGLRenderingContext) {
    const { index } = this
    if (index) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index.buffer)
      if (index.needUpdate) {
        index.needUpdate = false
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, index.array, gl.STATIC_DRAW)
      }
    }
  }
  setData(key: D, val: IData) {
    const obj = this.data[key]
    if (!obj) { return }
    obj.needUpdate = true
    Object.assign(obj, val)
  }
  setIndex(val: Float32Array) {
    const { index } = this
    if (val) {
      index.needUpdate = true
      index.array = val
      this.count = val.length
      this.drawType = 'drawElements'
    } else {
      const { array, size } = this.data['a_Position']
      this.count = array.length / size
      this.drawType = 'drawArrays'
    }
  }
}