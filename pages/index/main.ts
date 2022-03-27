import rough from "roughjs";

var canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext("2d");
const rc = rough.canvas(canvas);
import { Vector2D } from "./../../src/lib/index";

ctx.translate(256, 512);
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

drawBranch(ctx, v0, 50, 10, 1, 3);
function drawBranch(
  context: CanvasRenderingContext2D,
  v0: Vector2D,
  length: number,
  thickness: number,
  dir: number,
  bias?: number
) {
  const v = new Vector2D(1, 0).rotate(dir).scale(length);
  const v1 = v0.copy().add(v);
  console.log(v, v1);
  context.lineWidth = thickness;
  // context.strokeStyle = "#000";
  context.beginPath();
  context.moveTo(v0.x, v0.y);
  context.lineTo(v1.x, v1.y);
  context.stroke();

  if (thickness > 2) {
    const left = dir + 0.2;
    drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
    const right = dir - 0.2;
    drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
  }
}