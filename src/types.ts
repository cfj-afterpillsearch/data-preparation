export interface ICSVRECORD_PillnyanRaw_MedicalInstitution {
  post_type: string;
  post_status: string;
  post_id: string;
  custom_todofuken_no: string;
  tax_todofuken: string;
  custom_sortorder: string;
  post_title: string;
  custom_postalcode: string;
  custom_address: string;
  custom_phone: string;
  custom_memo_available_datetime: string;
  custom_website: string;
  tax_is_open_sunday: string;
  tax_is_open_holiday: string;
}

export interface ICSVRECORD_MedicalInstitution {
  id: string;
  name: string;
  shikuchosonCode: string;
  postalcode: string;
  address_todofuken: string;
  address_shikuchoson: string;
  address: string;
  phone: string;
  website: string | null;
  available_date: string | null;
}

interface IGeocode {
  latitude: number;
  lngitude: number;
}

export type ICSVRECORD_MedicalInstitutionWithGeocode = ICSVRECORD_MedicalInstitution & IGeocode;
