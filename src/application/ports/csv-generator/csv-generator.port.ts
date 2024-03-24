import { ObjectHeaderItem } from "csv-writer/src/lib/record";

export interface ICsvGenerator {
  generateCsv<T>(
    data: T[],
    filePath: string,
    headers: ObjectHeaderItem[],
  ): Promise<void>;
}
