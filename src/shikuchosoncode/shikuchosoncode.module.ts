import { Module } from '@nestjs/common';
import { CsvReaderModule } from '../csv-reader/csv-reader.module';
import { CsvReaderService } from '../csv-reader/csv-reader.service';
import { ShikuchosoncodeService } from './shikuchosoncode.service';
import { SHIKUCHOSONCODE } from './shikuchosoncode.constants';

@Module({
  imports: [CsvReaderModule],
  providers: [
    ShikuchosoncodeService,
    {
      provide: SHIKUCHOSONCODE,
      useFactory: async (csvReaderService: CsvReaderService) => {
        const csvFilePath = 'src/shikuchosoncode/SHIKUCHOSON.CSV';
        const res = await csvReaderService.read<any>(csvFilePath, {
          skip_empty_lines: true,
          columns: false,
          from_line: 2,
        });
        return res;
      },
      inject: [CsvReaderService],
    },
  ],
  exports: [ShikuchosoncodeService],
})
export class ShikuchosoncodeModule {}
