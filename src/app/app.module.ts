import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PostalcodeModule } from '../postalcode/postalcode.module';
import { CsvReaderModule } from '../csv-reader/csv-reader.module';
import { ShikuchosoncodeModule } from '../shikuchosoncode/shikuchosoncode.module';
import { GoogleGeocodingModule } from '../google-geocoding/google-geocoding.module';

@Module({
  imports: [
    PostalcodeModule,
    CsvReaderModule,
    ShikuchosoncodeModule,
    GoogleGeocodingModule,
  ],
  providers: [AppService],
})
export class AppModule {}
