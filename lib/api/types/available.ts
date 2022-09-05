export type AvailablePlace = {
  name: string;
  placeType: PlaceType;
  url: string;
  parentid: number;
  country: string;
  woeid: number;
  countryCode: null | string;
};

export type PlaceType = {
  code: number;
  name: 'Country' | 'Supername' | 'Town' | 'Unknown';
};

export type AvailablePlaces = AvailablePlace[];
