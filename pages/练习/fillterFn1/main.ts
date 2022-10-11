const canvas = document.querySelector("#app") as HTMLCanvasElement;
const context = canvas.getContext("2d");
import { getImageData, loadImage, traverse } from "./../../src/lib/utils";
import { brightness, contrast, grayscale, hueRotate, invert, opacity, saturate, sepia, transformColor } from "./../../src/lib/color-matrix";


function getImagesData(img, rate) {
  return getImageData({
    img: img,
    rate: rate,
  });
}

(async function () {
  const img = await loadImage("/src/assets/dlam.png");
  let rate = 1 / 3;
  let imageData = getImagesData(img, rate)
  // console.log(imageData)

  //更新; canvas; 内容;
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  context.putImageData(imageData, 0 * rate * canvas.width,
    0 * rate * canvas.height);

  // 灰度函数
  let imageData1 = getImagesData(img, rate)
  traverse(imageData1, ({ r, g, b, a }) => {
    // 对每个像素进行灰度化处理;
    const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return [v, v, v, a];
  });

  context.putImageData(
    imageData1,
    1 * rate * canvas.width,
    0 * rate * canvas.height
  );
  // 灰度函数
  let imageData11 = getImagesData(img, rate)
  traverse(imageData11, ({ r, g, b, a }) => {
    // 对每个像素进行灰度化处理;
    // const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return transformColor([r, g, b, a],
      brightness(1.2),// 增强亮度
      saturate(1.2) // 增强饱和度
    )

  });
  context.putImageData(
    imageData11,
    1 * rate * canvas.width,
    0 * rate * canvas.height
  );
  // 将图像转换为深褐色
  let imageData2 = getImagesData(img, rate)
  traverse(imageData2, ({ r, g, b, a }) => {
    // 对每个像素进行灰度化处理;
    // const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return transformColor([r, g, b, a], sepia(1));

  });
  context.putImageData(
    imageData2,
    2 * rate * canvas.width,
    0 * rate * canvas.height
  );

  // 亮度使用
  let imageData3 = getImagesData(img, rate)
  traverse(imageData3, ({ r, g, b, a }) => {
    // 对每个像素进行灰度化处理;
    return transformColor([r, g, b, a], brightness(1.4));

  });
  context.putImageData(
    imageData3,
    0 * rate * canvas.width,
    1 * rate * canvas.height
  );

  // 饱和度使用
  let imageData4 = getImagesData(img, rate)
  traverse(imageData4, ({ r, g, b, a }) => {
    // 对每个像素进行灰度化处理;
    return transformColor([r, g, b, a], saturate(5));

  });
  context.putImageData(
    imageData4,
    1 * rate * canvas.width,
    1 * rate * canvas.height
  );

  // 对比度使用
  let imageData5 = getImagesData(img, rate)
  traverse(imageData5, ({ r, g, b, a }) => {
    // 对每个像素进行灰度化处理;
    return transformColor([r, g, b, a], contrast(1.6));

  });
  context.putImageData(
    imageData5,
    2 * rate * canvas.width,
    1 * rate * canvas.height
  );

  // 对比度使用
  let imageData6 = getImagesData(img, rate)
  traverse(imageData6, ({ r, g, b, a }) => {
    // 对每个像素进行灰度化处理;
    return transformColor([r, g, b, a], opacity(0.56));

  });
  context.putImageData(
    imageData6,
    0 * rate * canvas.width,
    2 * rate * canvas.height
  );

  // 反色，p=0原色，p=1完全反色
  let imageData7 = getImagesData(img, rate)
  traverse(imageData7, ({ r, g, b, a }) => {
    // 对每个像素进行灰度化处理;
    return transformColor([r, g, b, a], invert(1));

  });
  context.putImageData(
    imageData7,
    1 * rate * canvas.width,
    2 * rate * canvas.height
  );
  //色相旋转，将色调沿极坐标转过deg角度
  let imageData8 = getImagesData(img, rate)
  traverse(imageData8, ({ r, g, b, a }) => {
    // 对每个像素进行灰度化处理;
    return transformColor([r, g, b, a], hueRotate(100));

  });
  context.putImageData(
    imageData8,
    2 * rate * canvas.width,
    2 * rate * canvas.height
  );
})();

export { };
