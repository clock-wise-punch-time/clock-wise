import { ICsvGenerator } from 'src/application/ports/csv-generator/csv-generator.port';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { ObjectHeaderItem } from 'csv-writer/src/lib/record';

export class CsvGeneratorService implements ICsvGenerator {
  generateCsv<T>(
    data: T[],
    filePath: string,
    headers: ObjectHeaderItem[],
  ): Promise<void> {
    const csvWriter = createCsvWriter({
      path: filePath,
      header: headers,
    });

    return csvWriter.writeRecords(data);
  }
}
