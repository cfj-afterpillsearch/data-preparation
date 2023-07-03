import { Module } from '@nestjs/common';
import { CsvReaderModule } from '../csv-reader/csv-reader.module';
import { CsvReaderService } from '../csv-reader/csv-reader.service';
import { POSTALCODE, POSTALCODE_JIGYOSYO } from './postalcode.constants';
import { PostalcodeService } from './postalcode.service';

@Module({
  imports: [CsvReaderModule],
  providers: [
    PostalcodeService,
    {
      provide: POSTALCODE,
      useFactory: async (csvReaderService: CsvReaderService) => {
        const csvFilePath = 'src/postalcode/KEN_ALL.CSV';
        const res = await csvReaderService.read<any>(csvFilePath, {
          skip_empty_lines: true,
          columns: false,
        });
        return res;
      },
      inject: [CsvReaderService],
    },
    {
      provide: POSTALCODE_JIGYOSYO,
      useFactory: async (csvReaderService: CsvReaderService) => {
        const csvFilePath = 'src/postalcode/JIGYOSYO.CSV';
        const res = await csvReaderService.read<any>(csvFilePath, {
          skip_empty_lines: true,
          columns: false,
        });
        return res;
      },
      inject: [CsvReaderService],
    },
  ],
  exports: [PostalcodeService],
})
export class PostalcodeModule {}
