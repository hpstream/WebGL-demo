import earcut from "earcut";
var canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext("2d");
ctx.translate(256, 256);
ctx.scale(1, -1);
ctx.lineCap = "round";

import { Vector2D } from "../../src/lib/index";
// const vertices = [
//   [-100, 100],
//   [100, 100],
//   [100, -100],
//   [-100, -100],
// ];

let vertices = [new Vector2D(0, 100)];
for (let i = 1; i <= 4; i++) {
  const p = vertices[0].copy().rotate(i * Math.PI * (1 / 2.5));
  vertices.push(p);
}
console.log(JSON.stringify(vertices));

let points = vertices.flat();
const triangles = earcut(points);
console.log(triangles);

starDraw();
function starDraw(options?) {
  for (let index = 0; index < triangles.length; index = index + 3) {
    // console.log(points[triangles[index]]);
    draw(ctx, [
      vertices[triangles[index]],
      vertices[triangles[index + 1]],
      vertices[triangles[index + 2]],
    ]);
  }
}

// 绘制图形
function draw(
  context: CanvasRenderingContext2D,
  points,
  { fillStyle = null, close = true, rule = "nonzero", strokeStyle = "red" } = {}
) {
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
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
