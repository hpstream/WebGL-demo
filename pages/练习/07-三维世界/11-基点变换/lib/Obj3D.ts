import Geometry, { GeometryParams } from "./geometry";
import Material, { MaterialParams } from "./material";

const defAttr = () => ({
  geo: null,
  mat: null,
})


export default class Obj3D<T1 extends GeometryParams, D1 extends T1['data'], T2 extends MaterialParams, D2 extends keyof T2["data"], M2 extends keyof T2["maps"]> {
  geometry: Geometry<T1, D1>;
  material: Material<T2, D2, M2>;
  constructor(attr) {
    Object.assign(this, defAttr(), attr)
  }
  init(gl: WebGLRenderingContext) {
    const { geometry, material } = this
    material.init(gl)
    geometry.init(gl, material.program)
  }

  update(gl: WebGLRenderingContext) {
    this.geometry.update(gl)
    this.material.update(gl)
  }
}