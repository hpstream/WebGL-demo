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

draw([new Vector2D(-256, 0), new Vector2D(256, 0)]);
draw([new Vector2D(0, -256), new Vector2D(0, 256)]);
draw(arc(0, 0, 100));
draw(parabolic(0, 0, 100));
draw(ellipse(0, 0, 150, 100));
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
// draw(arc(0, 0, 100));
function arc(
  x0: number,
  y0: number,
  radius,
  startAng?: number,
  endAng?: number
);
function arc(
  x0: number,
  y0: number,
  radius,
  startAng: number = 0,
  endAng: number = Math.PI * 2
) {
  const SEGMENTS = 30; //切分为多少块；
  const deg = Math.PI * 2;
  const ang = Math.min(deg, endAng - startAng); // 判断是否画整圆
  const ret = ang === deg ? [] : [[new Vector2D(x0, y0)]];
  const segments = Math.round((SEGMENTS * ang) / deg); //具体多少个切成多少片
  for (let i = 0; i <= segments; i++) {
    const p = i / segments;
    const t = startAng + (endAng - startAng) * p;
    const x = x0 + radius * Math.cos(t);
    const y = y0 + radius * Math.sin(t);
    ret.push(new Vector2D(x, y));
  }
  return ret;
}

// 抛物线
// x = x0 + 2pt^2;
// y = y0 + 2pt;
// console.log(parabolic(0, 0, 100));
function parabolic(
  x0: number,
  y0: number,
  radius,
  startAng: number = -Math.PI * 2,
  endAng: number = Math.PI * 2
) {
  const SEGMENTS = 60; //切分为多少块；
  const deg = Math.PI * 2;
  const ang = Math.min(deg, endAng - startAng); // 判断是否画整圆
  const ret = ang === deg ? [] : [new Vector2D(x0, y0)];
  const segments = Math.round((SEGMENTS * ang) / deg); //具体多少个切成多少片
  for (let i = 0; i <= segments; i++) {
    const p = i / segments;
    // const t = startAng * (1 - p) + endAng * p;
    const t = startAng + (endAng - startAng) * p;
    const x = x0 + radius * t;
    const y = y0 + radius * t * t;

    ret.push(new Vector2D(x, y));
  }
  return ret;
}
// 椭圆 ellipse
// x = x0 + a*cos(ø)
// y = y0 + b*sin(ø)
function ellipse(
  x0: number,
  y0: number,
  radiusX,
  radiusY,
  startAng: number = 0,
  endAng: number = Math.PI * 2
) {
  const SEGMENTS = 30; //切分为多少块；
  const deg = Math.PI * 2;
  const ang = Math.min(deg, endAng - startAng); // 判断是否画整圆
  const ret = ang === deg ? [] : [new Vector2D(x0, y0)];
  const segments = Math.round((SEGMENTS * ang) / deg); //具体多少个切成多少片
  for (let i = 0; i <= segments; i++) {
    const p = i / segments;
    const t = startAng + (endAng - startAng) * p;
    const x = x0 + radiusX * Math.cos(t);
    const y = y0 + radiusY * Math.sin(t);
    ret.push(new Vector2D(x, y));
  }
  return ret;
}
