import * as fs from 'node:fs';
import * as csvParse from 'csv-parse/sync';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CsvReaderService {
  async read<T>(_csvFilePath: string, _parseOptions): Promise<T[]> {
    // CSVファイルが存在するかチェック
    if (!fs.existsSync(_csvFilePath)) {
      console.log('CSVファイルが存在しません');
      process.exit(1);
    }

    // # ファイルの読み込み
    try {
      const csvData = await fs.promises.readFile(_csvFilePath, 'utf-8');

      // CSVパースを実行
      return csvParse.parse(csvData, _parseOptions);
    } catch (error) {
      console.error('Error reading CSV file:', error);
    }
  }
}
