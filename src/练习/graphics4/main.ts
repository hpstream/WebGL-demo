var canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext("2d");
let ctxOtions = {
  strokeStyle: "black",
  fillStyle: "",
  close: false,
  lineWidth: 0,
};
import { Vector2D } from "../../src/lib/index";
type deleteFirstParameter<T> = T extends (one, ...args: infer R) => any
  ? R
  : any;
interface callBack {
  points: Vector2D[];
  draw: (...a: deleteFirstParameter<typeof draw>) => void;
}
ctx.translate(256, 256);
ctx.scale(1, -1);
ctx.lineCap = "round";

draw([new Vector2D(-256, 0), new Vector2D(256, 0)], ctx);
draw([new Vector2D(0, -256), new Vector2D(0, 256)], ctx);

// 二次贝塞尔曲线;
// B(t)&=(1-t)^2P_0 +2t(1-t)P_1+t^2P_2
quadricBezier(
  new Vector2D(-100, 100),
  new Vector2D(50, 50),
  new Vector2D(100, 100)
);
cubicBezier(
  new Vector2D(-100, -100),
  new Vector2D(-50, -300),
  new Vector2D(50, 300),
  new Vector2D(100, -100)
);
function quadricBezier(p0, p1, p2) {
  const quadricBezier = graphics(
    (t, [{ x: x0 }, { x: x1 }, { x: x2 }]) =>
      (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2,
    (t, [{ y: y0 }, { y: y1 }, { y: y2 }]) =>
      (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2
  );
  quadricBezier(0, 1, [p0, p1, p2]).draw(ctx);
}

// 三次贝塞尔曲线;
function cubicBezier(p0, p1, p2, p3) {
  const quadricBezier = graphics(
    (t, [{ x: x0 }, { x: x1 }, { x: x2 }, { x: x3 }]) =>
      (1 - t) ** 3 * x0 +
      3 * t * (1 - t) ** 2 * x1 +
      3 * (1 - t) * t ** 2 * x2 +
      t ** 3 * x3,
    (t, [{ y: y0 }, { y: y1 }, { y: y2 }, { y: y3 }]) =>
      (1 - t) ** 3 * y0 +
      3 * t * (1 - t) ** 2 * y1 +
      3 * (1 - t) * t ** 2 * y2 +
      t ** 3 * y3
  );
  quadricBezier(0, 1, [p0, p1, p2, p3]).draw(ctx);
}

// 基础图形
function graphics(
  fnx,
  fny,
  SEGMENTS = 60
): (startAng: number, endAng: number, ...args) => callBack {
  return function (startAng, endAng, ...args): callBack {
    const segments = SEGMENTS;
    let points: Vector2D[] = [];
    for (let i = 0; i <= segments; i++) {
      const p = i / segments;
      const t = startAng + (endAng - startAng) * p;
      const x = fnx(t, ...args);
      const y = fny(t, ...args);
      points.push(new Vector2D(x, y));
    }
    return {
      points,
      draw: draw.bind(this, points) as (
        ...a: deleteFirstParameter<typeof draw>
      ) => void,
    };
  };
}

// 绘制图形
function draw(
  points: Vector2D[],
  ctx: CanvasRenderingContext2D,
  options?: Partial<typeof ctxOtions>
) {
  options = options || ctxOtions;
  ctx.lineWidth = options.lineWidth;
  ctx.strokeStyle = options.strokeStyle;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  // console.log(options.close);
  options.close && ctx.closePath();
  if (options.fillStyle) {
    ctx.fillStyle = options.fillStyle;
    ctx.fill();
  }
  ctx.stroke();
}
