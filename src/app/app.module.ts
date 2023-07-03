import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PostalcodeModule } from '../postalcode/postalcode.module';
import { CsvReaderModule } from '../csv-reader/csv-reader.module';
import { ShikuchosoncodeModule } from '../shikuchosoncode/shikuchosoncode.module';

@Module({
  imports: [PostalcodeModule, CsvReaderModule, ShikuchosoncodeModule],
  providers: [AppService],
})
export class AppModule {}
