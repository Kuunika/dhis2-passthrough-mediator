import * as fs from "fs/promises";

export async function readJsonFile<T>(filePath: string): Promise<T> {
  const jsonFile = await fs.readFile(filePath, {
    encoding: "utf-8",
  });
  return JSON.parse(jsonFile) as T;
}
