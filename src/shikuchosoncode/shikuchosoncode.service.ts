import { Inject, Injectable } from '@nestjs/common';
import { SHIKUCHOSONCODE } from './shikuchosoncode.constants';

@Injectable()
export class ShikuchosoncodeService {
  constructor(
    @Inject(SHIKUCHOSONCODE)
    private readonly shikuchosoncodeData: string[],
  ) {}

  /**
   * @param {string} shikuchosonCode 市区町村コード
   * @returns {string} 市区町村名
   */
  getShikuchosonName(shikuchosonCode: string): string {
    const res = this.shikuchosoncodeData.find((item) => item[0].substring(0, 5) === shikuchosonCode);
    if (res) {
      return res[2];
    } else {
      throw new Error(`市区町村コードは見つかりませんでした。, ${shikuchosonCode}`);
    }
  }
}
