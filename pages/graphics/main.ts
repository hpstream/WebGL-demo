import rough from "roughjs";

var canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext("2d");
const rc = rough.canvas(canvas);
import { Vector2D } from "../../src/lib/index";

ctx.translate(256, 256);
ctx.scale(1, -1);
ctx.lineCap = "round";

// n边形内角和：Math.PI*(n-2)
// 每个内角：Math.PI*(n-2)/n
// 每个外角：Math.PI - Math.PI*(n-2)/n
function regularShape(edges = 3, x, y, step) {
  const ret: Vector2D[] = [];
  const delta = Math.PI - (Math.PI * (edges - 2)) / edges;

  let p = new Vector2D(x, y);
  const dir = new Vector2D(step, 0);
  ret.push(p);
  for (let i = 0; i < edges; i++) {
    p = p.copy().add(dir.rotate(delta)); // 顺时针旋转外脚
    ret.push(p);
  }

  return ret;
}
draw([new Vector2D(-256, 0), new Vector2D(256, 0)]);
draw([new Vector2D(0, -256), new Vector2D(0, 256)]);
draw(regularShape(3, 150, 50, 100));
draw(regularShape(4, -50, 50, 100));
draw(regularShape(11, -100, -150, 30));
draw(regularShape(25, 128, -158, 15));

function draw(points: Vector2D[], strokeStyle = "black", fillStyle = null) {
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  ctx.stroke();
  if (points.length > 2) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.closePath();
  }
}
// 缺点：
// 1. 定义边数、起点、一条边的长度，这就和我们通常的使用习惯，也就是定义边数、中心和半径不符。
// 2. 如果我们按照现在这种定义方式绘图，是很难精确对应到图形的位置和大小的。
