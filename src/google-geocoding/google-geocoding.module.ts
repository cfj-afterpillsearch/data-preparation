import { Module } from '@nestjs/common';
import { GoogleGeocodingService } from './google-geocoding.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: `https://maps.googleapis.com`,
      params: {
        key: process.env.GOOGLE_GEOCODING_API_KEY,
      },
    }),
  ],
  providers: [GoogleGeocodingService],
  exports: [GoogleGeocodingService],
})
export class GoogleGeocodingModule {}
