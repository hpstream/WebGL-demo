import { MaterialParams } from './material';
import Obj3D from "./Obj3D";

const defAttr = () => ({
  gl: null,
  children: [],
});
export default class Scene {
  gl: WebGLRenderingContext;
  children: Obj3D<any, any, any, any, any>[];
  constructor(attr: any) {
    Object.assign(this, defAttr(), attr);
  }
  init() {
    const { children, gl } = this;
    children.forEach((obj) => {
      obj.init(gl);
    });
  }
  add(...objs) {
    const { children, gl } = this;
    objs.forEach((obj) => {
      children.push(obj);
      obj.parent = this;
      obj.init(gl);
    });
  }
  unshift(...objs) {
    const { children, gl } = this;
    objs.forEach((obj) => {
      children.unshift(obj);
      obj.parent = this;
      obj.init(gl);
    });
  }
  remove(obj) {
    const { children } = this;
    const i = children.indexOf(obj);
    if (i !== -1) {
      children.splice(i, 1);
    }
  }
  setUniform(key, val) {
    this.children.forEach(({ material }) => {
      material.setData(key, val);
    });
  }
  draw() {
    const { gl, children } = this;
    gl.clear(gl.COLOR_BUFFER_BIT);
    children.forEach((obj) => {
      const {
        geometry: { drawType, count },
        material: { mode, program },
      } = obj;

      gl.useProgram(program);
      obj.update(gl);
      if (!mode) return;
      if (typeof mode === "string") {
        this[drawType](gl, count, mode);
      } else {
        mode.forEach((m) => {
          this[drawType](gl, count, m);
        });
      }
    });
  }
  drawArrays(gl, count, mode) {
    gl.drawArrays(gl[mode], 0, count);
  }
  drawElements(gl, count, mode) {
    gl.drawElements(gl[mode], count, gl.UNSIGNED_BYTE, 0);
  }
}
