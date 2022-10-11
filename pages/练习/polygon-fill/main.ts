var canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext("2d");
ctx.translate(256, 256);
ctx.scale(1, -1);
ctx.lineCap = "round";

import { Vector2D } from "../../src/lib/index";

const points = [new Vector2D(0, 100)];
for (let i = 1; i <= 4; i++) {
  const p = points[0].copy().rotate(i * Math.PI * (1 / 2.5));
  points.push(p);
}

const polygon = [...points];

ctx.save();

ctx.translate(-126, 126);
draw(ctx, polygon, { rule: "nonzero" });
ctx.restore();

ctx.save();

ctx.translate(126, 126);
draw(ctx, polygon, { rule: "evenodd" });
ctx.restore();

const stars = [points[0], points[2], points[4], points[1], points[3]];

ctx.save();
ctx.translate(-126, -126);
// draw(ctx, stars);
draw(ctx, stars, { rule: "nonzero" });
ctx.restore();

ctx.save();
ctx.translate(126, -126);
// draw(ctx, stars);
draw(ctx, stars, { rule: "evenodd" });
ctx.restore();

// 绘制图形
function draw(
  context,
  points,
  { fillStyle = "black", close = false, rule = "nonzero" } = {}
) {
  context.beginPath();
  context.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(...points[i]);
  }
  if (close) context.closePath();
  context.fillStyle = fillStyle;
  context.fill(rule);
}
