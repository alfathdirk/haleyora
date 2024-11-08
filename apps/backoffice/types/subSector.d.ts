export interface SubSectorResponse {
  data: SubSector[];
  meta?: Meta;
}

export interface Meta {
  total_count: number;
  filter_count: number;
}

export interface SubSector {
  id: string;
  sector_id: string;
  title: string;
  name?: string;
}
