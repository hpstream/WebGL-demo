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
// draw([new Vector2D(0, 50), new Vector2D(200, 50)], ctx);

// ellipse(0, 0, 200, 100).draw(ctx);
// parabolic(0, 0, 10).draw(ctx, {
//   strokeStyle: "black",
//   fillStyle: "",
//   close: true,
// });
// arc(0, 0, 100, 0).draw(ctx);
// square(0, 0, 150, 100).draw(ctx, {
//   strokeStyle: "red",
//   fillStyle: "",
//   close: true,
// });

const helical = graphics(
  (t, l) => l * t * Math.cos(t),
  (t, l) => l * t * Math.sin(t),
  10000
);
helical(0, 50, 5).draw(ctx, { strokeStyle: "blue" });

const star = graphics(
  (t, l) => l * Math.cos(t) ** 3,
  (t, l) => l * Math.sin(t) ** 3
);
star(0, Math.PI * 2, 150).draw(ctx, { strokeStyle: "red" });

function square(x0, y0, width, height): callBack {
  let v0 = new Vector2D(x0, y0);
  let points = [v0];
  var tem = v0;

  for (let i = 0; i < 4; i++) {
    var v1 = new Vector2D(1, 0).rotate((3 * Math.PI) / 2 + (i * Math.PI) / 2);
    if (i % 2 == 0) {
      v1.scale(height);
    } else {
      v1.scale(width);
    }
    tem = tem.copy().add(v1);
    points.push(tem);
  }
  console.log(points);

  return {
    points,
    draw: draw.bind(this, points) as (
      ...a: deleteFirstParameter<typeof draw>
    ) => void,
  };
}
// 抛物线
// x = x0 + 2pt^2;
// y = y0 + 2pt;
function parabolic(
  x0: number,
  y0: number,
  p: number,
  startAng: number = -5,
  endAng: number = 5
): callBack {
  var parabolic = graphics(
    (t: number) => x0 + 2 * p * t,
    (t: number) => y0 + 2 * p * t * t,
    200
  );

  return parabolic(startAng, endAng);
}
// 椭圆 ellipse
// x = x0 + a*cos(ø)
// y = y0 + b*sin(ø)
function ellipse(
  x0: number,
  y0: number,
  radiusX,
  radiusY,
  startAng: number = -Math.PI * 2,
  endAng: number = Math.PI * 2
) {
  var ellipse = graphics(
    (t: number) => x0 + radiusX * Math.cos(t),
    (t: number) => y0 + radiusY * Math.sin(t),
    60
  );

  return ellipse(startAng, endAng);
}

// 绘制圆
function arc(
  ...args: [
    x0: number,
    y0: number,
    radius: any,
    startAng?: number,
    endAng?: number
  ]
): callBack {
  var arc = graphics(
    (t: number) => args[0] + args[2] * Math.cos(t),
    (t: number) => args[1] + args[2] * Math.sin(t)
  );

  return arc(args[3] || 0, args[4] || 2 * Math.PI);
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
