import { Injectable, Inject } from '@nestjs/common';
import { POSTALCODE, POSTALCODE_JIGYOSYO } from './postalcode.constants';

@Injectable()
export class PostalcodeService {
  constructor(
    @Inject(POSTALCODE) private readonly postalcodeData: string[],
    @Inject(POSTALCODE_JIGYOSYO)
    private readonly postalcodeJigyoshoData: string[],
  ) {}
  /**
   * @param postalcode 郵便番号が入る。ハイフンありなしは問わない。
   * @returns 市区町村コード。この市区町村コードは検査数字を含まない5桁の番号になる。
   */
  getShikuchosonCode(_postalcode: string): string {
    // # 郵便番号を7桁の数字に整形する
    const postalcode = _postalcode
      .trim()
      .replace('-', '')
      .replace('−', '')
      .replace('－', '')
      .replace('ｰ', '')
      .replace('-', '');

    const koukyoudantaiCode = 0;
    const yubinbangou7keta = 2;
    const kobetsubangou = 7;

    const res_yubin = this.postalcodeData.find(
      (item) => item[yubinbangou7keta] === postalcode,
    );
    if (res_yubin) {
      return res_yubin[koukyoudantaiCode];
    } else {
      const res_jigyosyo = this.postalcodeJigyoshoData.find(
        (item_j) => item_j[kobetsubangou] === postalcode,
      );
      if (res_jigyosyo) {
        return res_jigyosyo[koukyoudantaiCode];
      } else {
        throw new Error(
          `郵便番号は見つかりませんでした。, ${_postalcode}, ${postalcode}`,
        );
      }
    }
  }
}
