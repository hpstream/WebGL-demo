function loadImage(src: string) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  return new Promise<HTMLImageElement>((resolve) => {
    img.onload = () => {
      resolve(img);
    };
    img.src = src;
  });
}

const canvas = document.querySelector("#app") as HTMLCanvasElement;
const context = canvas.getContext("2d");

(async function () {
  const img = await loadImage("/src/assets/dlam.png");
  const { width, height } = img;

  canvas.width = width;
  canvas.height = height;
  context.drawImage(img, 0, 0);

  const imgData = context.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < width * height * 4; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2],
      a = data[i + 3];

    const v = 0.212 * r + 0.714 * g + 0.074 * b;
    // const v = 0.33333 * r + 0.33333 * g + 0.3333333 * b;
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = a;
  }
  context.putImageData(imgData, 0, 0);
})();

export {};
