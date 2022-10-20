import path from "path";
import fs from "fs";
import markdownpdf from "markdown-pdf";

const test = () => {
  //   let inFile = path.join(__dirname, "db", "test.md");
  //   let outFile = path.join(__dirname, "db", "test.pdf");

  //   fs.createReadStream(inFile)
  //     .pipe(markdownpdf())
  //     .pipe(fs.createWriteStream(outFile));
  return path.join(__dirname, "../", "fonts", "Gotham-Light.ttf");
};

export { test };
