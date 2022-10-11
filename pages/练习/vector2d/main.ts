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

const v0 = new Vector2D(0, 0);
const segment = 60;
var x = 150;
var y = 150;
let rad = (Math.PI * 2) / segment;
let i = 0;
let timeCallBack = () => {
  ctx.clearRect(-256, -256, 512, 512);
  //绘制圆盘
  for (let i = 0; i < segment; i++) {
    drawBranch(
      ctx,
      new Vector2D(x * Math.cos(i * rad), y * Math.sin(i * rad)),
      10,
      i % 5 == 0 ? 4 : 2,
      i * rad,
      i % 5 == 0 ? "#000" : "#86909c"
    );
  }
  var { h, m, s } = getCurrentTime();
  // 时钟
  // Math.PI/6/ 60 30deg;
  drawBranch(
    ctx,
    new Vector2D(0, 0),
    70,
    6,
    -(h * Math.PI) / 6 - (m * Math.PI) / 6 / 60 + Math.PI / 2,
    "red"
  );
  // 分钟
  // Math.PI/30/ 60 5deg;
  drawBranch(
    ctx,
    new Vector2D(0, 0),
    100,
    4,
    -(m * Math.PI) / 30 - (s * Math.PI) / 30 / 60 + Math.PI / 2,
    "#000"
  );
  // 分钟
  drawBranch(
    ctx,
    new Vector2D(0, 0),
    140,
    2,
    -(s * Math.PI) / 30 + Math.PI / 2,
    "#000"
  );
};

setInterval(timeCallBack, 1000);

function drawBranch(
  context: CanvasRenderingContext2D,
  v0: Vector2D,
  length: number,
  thickness: number,
  dir: number,
  strokeStyle?: string
) {
  const v = new Vector2D(1, 0).rotate(dir).scale(length);
  const v1 = v0.copy().add(v);
  context.lineWidth = thickness;
  context.strokeStyle = strokeStyle || "#000";
  context.beginPath();
  context.moveTo(v0.x, v0.y);
  context.lineTo(v1.x, v1.y);
  context.stroke();
  context.closePath();
  return v1;
}

function getCurrentTime() {
  var s = new Date();
  var h = s.getHours();
  return {
    h: h > 12 ? h - 12 : h,
    s: s.getSeconds(),
    m: s.getMinutes(),
  };
}
// var v1 = drawBranch(ctx, v0, 100, 4, i++ * rad);
// setInterval(() => {
//   ctx.clearRect(-256, -256, 512, 512);
//   // if (i >= 60) {
//   //   i = 0;
//   // }
//   drawBranch(ctx, v0, 100, 4, i++ * rad);
// }, 1000);
// var v1 = new Vector2D(10, 0);
// drawBranch(ctx, v1, 20, 8, -Math.PI / 6 + Math.PI);
