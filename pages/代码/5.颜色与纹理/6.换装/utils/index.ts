import dat from "dat.gui";
import { Matrix4 } from "three";


export function showTools(render: (u_ModelMatrix: Matrix4) => void) {
  let gui = new dat.GUI();
  let params = {
    originX: 0,
    originY: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scaleX: 1,
    scaleY: 1,
    positionX: 0,
    positionY: 0,
    positionZ: 0
  }

  let o = gui.addFolder('基点')
  o.open();
  o.add(params, 'originX').min(-1).max(1).step(0.01).onChange(changeValue);
  o.add(params, 'originY').min(-1).max(1).step(0.01).onChange(changeValue);
  let r = gui.addFolder('旋转')
  r.open();
  r.add(params, 'rotateZ').min(0).max(Math.PI * 2).step(0.01).onChange(changeValue);
  r.add(params, 'rotateY').min(0).max(Math.PI * 2).step(0.01).onChange(changeValue);
  r.add(params, 'rotateX').min(0).max(Math.PI * 2).step(0.01).onChange(changeValue);

  let s = gui.addFolder('缩放')
  s.open();
  s.add(params, 'scaleX').min(0).max(2).step(0.01).onChange(changeValue).name('scale');
  // s.add(params, 'scaleY').min(0).max(3).step(0.01).onChange(changeValue);

  let t = gui.addFolder('平移')
  t.open();
  t.add(params, 'positionX').min(-1).max(1).step(0.01).onChange(changeValue);
  t.add(params, 'positionY').min(-1).max(1).step(0.01).onChange(changeValue);
  t.add(params, 'positionZ').min(-1).max(1).step(0.01).onChange(changeValue);

  function changeValue() {

    render(change());
  }

  function change() {
    const mx = new Matrix4()
      // .multiply(new Matrix4().makeRotationZ(params.rotateZ))
      .multiply(
        new Matrix4().setPosition(params.originX, params.originY, 0)
          .multiply(
            rotation(params.rotateX, params.rotateY, params.rotateZ)
              .multiply(
                new Matrix4().setPosition(params.positionX, params.positionY, params.positionZ)
              )
              .multiply(
                new Matrix4().makeScale(params.scaleX, params.scaleX, params.scaleX)
              )
          )
          .multiply(
            new Matrix4().setPosition(-params.originX, -params.originY, 0)
          )
      )
    return mx;
  }

  change()

  function rotation(x: number, y: number, z: number) {
    return new Matrix4().makeRotationX(params.rotateX)
      .multiply(
        new Matrix4().makeRotationY(params.rotateY)
      )
      .multiply(
        new Matrix4().makeRotationZ(params.rotateZ)
      )
  }
}
