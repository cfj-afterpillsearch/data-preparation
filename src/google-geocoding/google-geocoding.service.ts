import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleGeocodingService {
  constructor(private readonly httpService: HttpService) {}

  async getGeocode(address: string) {
    const response = await this.httpService.axiosRef
      .get('/maps/api/geocode/json', {
        params: {
          key: process.env.GOOGLE_GEOCODING_API_KEY,
          address: address,
        },
      })
      .catch((error) => {
        throw new Error(error);
      });

    if (response.status === 200) {
      const latList = response.data.results.map((item) => {
        return item.geometry.location.lat;
      });
      const lngList = response.data.results.map((item) => {
        return item.geometry.location.lng;
      });

      return {
        lat: latList[0],
        lng: lngList[0],
      };
    } else {
      throw new Error(response.statusText);
    }
  }
}
