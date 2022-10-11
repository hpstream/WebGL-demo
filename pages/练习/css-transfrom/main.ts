function multiply(out, a, b) {
  let a00 = a[0],
    a01 = a[1],
    a02 = a[2];
  let a10 = a[3],
    a11 = a[4],
    a12 = a[5];
  let a20 = a[6],
    a21 = a[7],
    a22 = a[8];

  let b00 = b[0],
    b01 = b[1],
    b02 = b[2];
  let b10 = b[3],
    b11 = b[4],
    b12 = b[5];
  let b20 = b[6],
    b21 = b[7],
    b22 = b[8];

  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;

  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;

  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}

// 也就是我们先旋转 30 度，然后平移 100px、50px，最后再放大 0.5 倍。实际上相当于我们做了如下变换；

var dom = document.querySelector("#app") as HTMLElement;

if (dom) {
  // rotate(30deg) translate(100px,50px) scale(1.5)
  dom.style.transform = `rotate(30deg) `;
}
const rad = Math.PI / 6;
const rotate = [
  Math.cos(rad),
  -Math.sin(rad),
  0,
  Math.sin(rad),
  Math.cos(rad),
  0,
  0,
  0,
  1,
];

const translate = [1, 0, 100, 0, 1, 50, 0, 0, 1];

const scale = [0.5, 0, 0, 0, 0.5, 0, 0, 0, 1];
// transform: matrix(a, b, c, d, e, f);
var out = [rotate, translate, scale].reduce((a, b) => multiply([], b, a));
console.log(out);

if (dom) {
  dom.style.transform = `matrix(${[
    out[0],
    out[3],
    out[1],
    out[4],
    out[2],
    out[5],
  ].join(",")})`;
}
