var canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext("2d");
ctx.translate(256, 256);
ctx.scale(1, -1);
ctx.lineCap = "round";
import earcut from "earcut";
// console.log(canvas.offsetHeight, canvas.offsetWidth);
import { Vector2D } from "../../src/lib/index";
// draw(ctx, [new Vector2D(-256, 0), new Vector2D(256, 0)]);
// draw(ctx, [new Vector2D(0, -256), new Vector2D(0, 256)]);
// 使用三角剖分的方式，实现完美的碰撞检查
let vertices = [new Vector2D(0, 100)];
for (let i = 1; i <= 4; i++) {
  const p = vertices[0].copy().rotate(i * Math.PI * (1 / 2.5));
  vertices.push(p);
}

let points = vertices.flat();
const triangles = earcut(points);
// console.log(triangles);

starDraw();
function starDraw(options?) {
  for (let index = 0; index < triangles.length; index = index + 3) {
    // console.log(points[triangles[index]]);
    draw(
      ctx,
      [
        vertices[triangles[index]],
        vertices[triangles[index + 1]],
        vertices[triangles[index + 2]],
      ],
      options
    );
  }
}

// 绘制图形
function draw(
  context: CanvasRenderingContext2D,
  points,
  {
    fillStyle = null,
    close = true,
    rule = "nonzero",
    strokeStyle = "black",
  } = {}
) {
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  console.log(points);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  context.strokeStyle = strokeStyle;
  if (close) context.closePath();
  context.stroke();

  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
}
function inTriangle(p1, p2, p3, point) {
  const a = p2.copy().sub(p1);
  const b = p3.copy().sub(p2);
  const c = p1.copy().sub(p3);

  const u1 = point.copy().sub(p1);
  const u2 = point.copy().sub(p2);
  const u3 = point.copy().sub(p3);

  const s1 = Math.sign(a.cross(u1));
  let p = a.dot(u1) / a.length ** 2;
  if (s1 === 0 && p >= 0 && p <= 1) return true;

  const s2 = Math.sign(b.cross(u2));
  p = b.dot(u1) / b.length ** 2;
  if (s2 === 0 && p >= 0 && p <= 1) return true;

  const s3 = Math.sign(c.cross(u3));
  p = c.dot(u1) / c.length ** 2;
  if (s3 === 0 && p >= 0 && p <= 1) return true;

  return s1 === s2 && s2 === s3;
}

const { left, top } = canvas.getBoundingClientRect();

canvas.addEventListener("mousemove", (evt) => {
  const { x, y } = evt;
  // 坐标转换
  // console.log(canvas.offsetHeight, canvas.offsetWidth);
  const offsetX = ((x - left) / canvas.offsetHeight) * canvas.width - 256;
  const offsetY = 256 - ((y - top) / canvas.offsetWidth) * canvas.width;

  ctx.clearRect(-256, -256, 512, 512);
  let flag = false;
  for (let index = 0; index < triangles.length; index = index + 3) {
    flag = inTriangle(
      vertices[triangles[index]],
      vertices[triangles[index + 1]],
      vertices[triangles[index + 2]],
      new Vector2D(offsetX, offsetY)
    );
    if (flag) {
      break;
    }
  }

  if (flag) {
    starDraw({ fillStyle: "red" });
  } else {
    starDraw();
  }
});
