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
  openinghours: string | null;
}

interface IGeocode {
  latitude: number;
  lngitude: number;
}

export type ICSVRECORD_MedicalInstitutionWithGeocode =
  ICSVRECORD_MedicalInstitution & IGeocode;

export interface ICSVRECORD_PillnyanRaw_Pharmacy {
  post_type: string;
  post_status: string;
  post_id: string;
  renban: string;
  todofuken_no: string;
  tax_todofuken: string;
  post_title: string;
  custom_postalcode: string;
  custom_address_city: string;
  custom_address: string;
  custom_phone: string;
  custom_fax: string;
  custom_openinghours: string;
  tax_is_emergency_contact: string;
  custom_emergency_contact_phone: string;
  pharmacist_name: string;
}

export interface ICSVRECORD_Pharmacy {
  id: string;
  name: string;
  shikuchosonCode: string;
  postalcode: string;
  address_todofuken: string;
  address_shikuchoson: string;
  address: string;
  phone: string;
  openinghours: string | null;
  emergency_contact: string | null;
  emergency_contact_phone: string | null;
}
