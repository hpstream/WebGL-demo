import rough from "roughjs";

var canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext("2d");
const rc = rough.canvas(canvas);
import { Vector2D } from "./../../src/lib/index";

ctx.translate(256, 256);
ctx.scale(1, -1);
ctx.lineCap = "round";

// var v0 = new Vector2D(2, 2);
// var v1 = new Vector2D(1, 1);
// console.log(v0.dot(v1)); // 如果等于0就是垂直
// console.log(v0.dot(v1) / (v0.length * v1.length)); // 如果等于1平行；不等于1，相交

// const v0 = new Vector2D(3, 5);
// const v = v0.cross(new Vector2D(6, 9));
// console.log(v);
// drawBranch(ctx, v0, 50, 10, Math.PI / 2, 3);
const v0 = new Vector2D(0, 0);
const segment = 60;
let rad = (Math.PI * 2) / segment;
let i = 0;
// var v1 = drawBranch(ctx, v0, 100, 4, i++ * rad);
setInterval(() => {
  ctx.clearRect(-256, -256, 512, 512);
  if (i >= 60) {
    i = 0;
  }
  var v1 = drawBranch(ctx, v0, 100, 4, i++ * rad);
}, 100);
// var v1 = drawBranch(ctx, v0, 100, 10, i*rad);
// drawBranch(ctx, v1, 20, 8, -Math.PI / 6 + Math.PI);
// drawBranch(ctx, v1, 20, 8, Math.PI / 6 + Math.PI);

function drawBranch(
  context: CanvasRenderingContext2D,
  v0: Vector2D,
  length: number,
  thickness: number,
  dir: number
) {
  const v = new Vector2D(1, 0).rotate(dir).scale(length);
  const v1 = v0.copy().add(v);
  context.lineWidth = thickness;
  // context.strokeStyle = "#000";
  context.beginPath();
  context.moveTo(v0.x, v0.y);
  context.lineTo(v1.x, v1.y);
  context.stroke();
  context.closePath();
  return v1;
}
