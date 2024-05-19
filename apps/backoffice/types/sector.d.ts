export interface SectorResponse {
  data: Sector[];
  meta?: Meta;
}

export interface Meta {
  total_count: number;
  filter_count: number;
}

export interface Sector {
  id: string;
  sort: null;
  category_id: string;
  title: string;
}
