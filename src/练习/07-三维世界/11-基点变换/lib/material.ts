type mode = 'POINTS' | 'TRIANGLES';
export interface MaterialParams {
  program: WebGLProgram;
  data: {},
  mode?: string | string[];
  maps?: {}
}

interface IData {
  type: string,
  value: number[];
  location: WebGLUniformLocation;
  needUpdate: boolean
}

interface IMaps extends IData {
  format: number;
  image: HTMLImageElement;
  wrapS: number;
  wrapT: number;
  magFilter: number;
  minFilter: number;
}

const defAttr = () => ({
  program: null,
  data: {},
  mode: 'TRIANGLES',
  maps: {},
})

export default class Material<T extends MaterialParams, D extends keyof T["data"], M extends keyof T["maps"]> {

  program: WebGLProgram;
  data: Record<D, IData>;
  mode: any;
  maps: Record<M, IMaps>;
  constructor(attr: MaterialParams) {
    Object.assign(this, defAttr(), attr)
  }

  init(gl: WebGLRenderingContext) {
    const { program, data, maps } = this

    for (let [key, obj] of [...Object.entries(data), ...Object.entries(maps)] as [string, IData][]) {
      obj.location = gl.getUniformLocation(program, key)
      obj.needUpdate = true
    }
  }

  updateData(gl: WebGLRenderingContext) {
    for (let obj of Object.values(this.data) as IData[]) {
      if (!obj.needUpdate) { continue }
      obj.needUpdate = false
      const { type, value, location } = obj
      if (type.includes('Matrix')) {
        gl[type](location, false, value)
      } else {
        gl[type](location, value)
      }
    }
  }

  update(gl: WebGLRenderingContext) {
    this.updateData(gl)
    this.updateMaps(gl)
  }

  updateMaps(gl: WebGLRenderingContext) {
    (Object.values(this.maps) as IMaps[]).forEach((map, ind) => {
      if (!map.needUpdate) { return }
      map.needUpdate = false
      const {
        format = gl.RGB,
        image,
        wrapS,
        wrapT,
        magFilter,
        minFilter,
        location,
      } = map

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
      gl.activeTexture(gl[`TEXTURE${ind}`])
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        format,
        format,
        gl.UNSIGNED_BYTE,
        image
      )
      wrapS && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        wrapS
      )
      wrapT && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        wrapT
      )
      magFilter && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        magFilter
      )
      if (!minFilter || minFilter > 9729) {
        gl.generateMipmap(gl.TEXTURE_2D)
      }
      minFilter && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        minFilter
      )
      gl.uniform1i(location, ind)
    })
  }

  setData(key, val) {
    const obj = this.data[key]
    if (!obj) { return }
    obj.needUpdate = true
    Object.assign(obj, val)
  }
  setMap(key, val) {
    const obj = this.maps[key]
    if (!obj) { return }
    obj.needUpdate = true
    Object.assign(obj, val)
  }

}