import rough from "roughjs";

var canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.width = 512;
canvas.height = 512;
// 采用绝对坐标系
const ctx = canvas.getContext("2d");
const rc = rough.canvas(canvas);
const hillOpts = { roughness: 2.8, strokeWidth: 2, fill: "blue" };
rc.path("M76 256L176 156L276 256", hillOpts);
rc.path("M236 256 L336 156 L436 256", hillOpts);
rc.circle(256, 106, 105, {
  stroke: "red",
  strokeWidth: 4,
  fill: "rgba(255,255,0,0.4)",
  fillStyle: "solid",
});

// -------------
// 采用相对坐标系
ctx.translate(256, 512);
ctx.scale(1, -1);
ctx.lineCap = "round";

rc.path("M-180 0L-80 100L20 0", hillOpts);
rc.path("M-20 0L80 100L180 0", hillOpts);
rc.circle(0, 150, 105, {
  stroke: "red",
  strokeWidth: 4,
  fill: "rgba(255,255, 0, 0.4)",
  fillStyle: "solid",
});
