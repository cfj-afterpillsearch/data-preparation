import { Parser } from '@json2csv/plainjs';
import { Injectable, Logger } from '@nestjs/common';
import {
  ICSVRECORD_PillnyanRaw_MedicalInstitution,
  ICSVRECORD_MedicalInstitution,
  ICSVRECORD_PillnyanRaw_Pharmacy,
  ICSVRECORD_Pharmacy,
} from '../types';
import { CsvReaderService } from '../csv-reader/csv-reader.service';
import { PostalcodeService } from '../postalcode/postalcode.service';
import { ShikuchosoncodeService } from '../shikuchosoncode/shikuchosoncode.service';
import { GoogleGeocodingService } from '../google-geocoding/google-geocoding.service';

const format_todofuken = (todofuken: string) => {
  if (todofuken === '北海道') {
    return todofuken;
  } else if (todofuken === '東京') {
    return todofuken + '都';
  } else if (todofuken === '大阪' || todofuken === '京都') {
    return todofuken + '府';
  } else {
    return todofuken + '県';
  }
};

@Injectable()
export class AppService {
  constructor(
    private readonly csvReaderService: CsvReaderService,
    private readonly postalcodeService: PostalcodeService,
    private readonly shikuchosonCodeService: ShikuchosoncodeService,
    private readonly geocodingService: GoogleGeocodingService,
  ) {}
  private readonly logger = new Logger(AppService.name);
  private readonly parser = new Parser();

  async mi_postalcode2address(csvFilePath: string) {
    const result = [];
    // # csvファイルの読み込み
    const csvParseOptions = {
      skip_empty_lines: true,
      columns: true,
    };
    const csvRecords =
      await this.csvReaderService.read<ICSVRECORD_PillnyanRaw_MedicalInstitution>(
        csvFilePath,
        csvParseOptions,
      );

    for (const csvRecord of csvRecords) {
      try {
        // # 郵便番号から市区町村コードを取得する
        const shikuchosonCode = this.postalcodeService.getShikuchosonCode(
          csvRecord.custom_postalcode,
        );

        // # 市区町村コードから市区町村名を取得する
        const address_shikuchoson =
          this.shikuchosonCodeService.getShikuchosonName(shikuchosonCode);

        // # 整形する
        const tmp: ICSVRECORD_MedicalInstitution = {
          id: csvRecord.post_id,
          name: csvRecord.post_title.replace('\r\n', ''),
          postalcode: csvRecord.custom_postalcode,
          address_todofuken: format_todofuken(csvRecord.tax_todofuken),
          address_shikuchoson,
          address: csvRecord.custom_address,
          shikuchosonCode,
          phone: csvRecord.custom_phone,
          website: csvRecord.custom_website,
          openinghours: csvRecord.custom_memo_available_datetime.replace(
            '\r\n',
            '\n',
          ),
        };
        result.push(tmp);
      } catch (error) {
        console.error(
          `${error}, ${csvRecord.post_id}, ${csvRecord.post_title.replace(
            '\r\n',
            '',
          )}, ${csvRecord.custom_address}`,
        );
      }
    }

    //# CSVをSTDINに出力する
    const csv = this.parser.parse(result);
    console.log(csv);
  }

  async mi_address2latlng(csvFilePath: string) {
    const result = [];
    // # csvファイルの読み込み
    const csvParseOptions = {
      skip_empty_lines: true,
      columns: true,
    };
    const csvRecords =
      await this.csvReaderService.read<ICSVRECORD_MedicalInstitution>(
        csvFilePath,
        csvParseOptions,
      );

    for (const csvRecord of csvRecords) {
      try {
        // # 住所から緯度経度を取得する
        const geocode = await this.geocodingService.getGeocode(
          csvRecord.address,
        );

        await new Promise((resolve) => setTimeout(resolve, 30));

        // # 整形する
        const tmp = {
          ...csvRecord,
          location: {
            type: 'Point',
            coordinates: [
              geocode.lng ? geocode.lng : null,
              geocode.lat ? geocode.lat : null,
            ],
          },
        };
        result.push(tmp);
      } catch (error) {
        console.error(
          `${error}, ${csvRecord.id}, ${csvRecord.name}, ${csvRecord.address}`,
        );
      }
    }

    //# JSON ObjectをSTDINに出力する
    console.log(JSON.stringify(result));
  }

  async pha_postalcode2address(csvFilePath: string) {
    const result = [];
    // # csvファイルの読み込み
    const csvParseOptions = {
      skip_empty_lines: true,
      columns: true,
    };
    const csvRecords =
      await this.csvReaderService.read<ICSVRECORD_PillnyanRaw_Pharmacy>(
        csvFilePath,
        csvParseOptions,
      );

    for (const csvRecord of csvRecords) {
      try {
        // # 郵便番号から市区町村コードを取得する
        const shikuchosonCode = this.postalcodeService.getShikuchosonCode(
          csvRecord.custom_postalcode,
        );

        // # 市区町村コードから市区町村名を取得する
        const address_shikuchoson =
          this.shikuchosonCodeService.getShikuchosonName(shikuchosonCode);

        // # 整形する
        const tmp: ICSVRECORD_Pharmacy = {
          id: csvRecord.post_id,
          name: csvRecord.post_title.replace('\r\n', ''),
          postalcode: csvRecord.custom_postalcode,
          address_todofuken: csvRecord.tax_todofuken,
          address_shikuchoson,
          address: csvRecord.custom_address,
          shikuchosonCode,
          phone: csvRecord.custom_phone,
          openinghours: csvRecord.custom_openinghours.replace('\r\n', '\n'),
          emergency_contact: csvRecord.tax_is_emergency_contact,
          emergency_contact_phone: csvRecord.custom_emergency_contact_phone,
        };
        result.push(tmp);
      } catch (error) {
        console.error(
          `${error}, ${csvRecord.post_id}, ${csvRecord.post_title.replace(
            '\r\n',
            '',
          )}, ${csvRecord.custom_address}`,
        );
      }
    }

    //# CSVをSTDINに出力する
    const csv = this.parser.parse(result);
    console.log(csv);
  }

  async pha_address2latlng(csvFilePath: string) {
    const result = [];
    // # csvファイルの読み込み
    const csvParseOptions = {
      skip_empty_lines: true,
      columns: true,
    };
    const csvRecords = await this.csvReaderService.read<ICSVRECORD_Pharmacy>(
      csvFilePath,
      csvParseOptions,
    );

    for (const csvRecord of csvRecords) {
      try {
        // # 住所から緯度経度を取得する
        const geocode = await this.geocodingService.getGeocode(
          csvRecord.address,
        );

        await new Promise((resolve) => setTimeout(resolve, 30));

        // # 整形する
        const tmp = {
          ...csvRecord,
          location: {
            type: 'Point',
            coordinates: [
              geocode.lng ? geocode.lng : null,
              geocode.lat ? geocode.lat : null,
            ],
          },
        };
        result.push(tmp);
      } catch (error) {
        console.error(
          `${error}, ${csvRecord.id}, ${csvRecord.name}, ${csvRecord.address}`,
        );
      }
    }

    //# JSON ObjectをSTDINに出力する
    console.log(JSON.stringify(result));
  }
}
