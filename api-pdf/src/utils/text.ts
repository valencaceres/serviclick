import fs from "fs";

export const linesFromTextFile = (path: string) => {
  const allFileContents = fs.readFileSync(path, "utf-8");
  return allFileContents.split(/\r?\n/);
};
