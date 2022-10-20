import fs from "fs";

export const linesFromTextFile = (path: string) => {
  const allFileContents = fs.readFileSync(path, "utf-8");
  return allFileContents.split(/\r?\n/);
};

export const normalizeFileName = (str: string) => {
  const normal_string = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normal_string.toLowerCase().replace(/ /g, "_");
};
