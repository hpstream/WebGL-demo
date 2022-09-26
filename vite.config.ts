import { defineConfig } from "vite";
import * as fs from "fs";
import * as path from "path";
import vue from '@vitejs/plugin-vue';
// console.log(fs);

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://hpstream.github.io/WebGL-demo/",
  build: {
    outDir: "docs",
    rollupOptions: {
      input: inputFn(),
    },
  },
  plugins: [vue()],
});

function inputFn(): Record<string, string> {
  let root = path.join(process.cwd(), "pages");
  // let data = fs.readdirSync(root);
  let dirMap: Record<string, string> = {};
  deepdir(root, dirMap)
  console.log(dirMap)

  return dirMap;
}

function deepdir(root: string, dirMap: Record<string, string>) {
  let data = fs.readdirSync(root);

  data.forEach((d) => {
    let prefix = path.join(root, d)
    let stat = fs.statSync(prefix)
    if (stat.isDirectory()) {
      let file = path.join(prefix, "index.html");
      if (fs.existsSync(file)) {
        dirMap[`${d}`] = file;
      }
      deepdir(prefix, dirMap)
    }

  });

}
