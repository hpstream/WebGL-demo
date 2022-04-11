const canvas = document.querySelector("#app") as HTMLCanvasElement;
const context = canvas.getContext("2d");
import { getImageData, loadImage, traverse } from "./../../src/lib/utils";

(async function () {
  const img = await loadImage("/src/assets/dlam.png");
  const imageData = getImageData(img);

  traverse(imageData, ({ r, g, b, a }) => {
    // 对每个像素进行灰度化处理;
    const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return [v, v, v, a];
  });
  //更新; canvas; 内容;
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  context.putImageData(imageData, 0, 0);
})();

export {};
