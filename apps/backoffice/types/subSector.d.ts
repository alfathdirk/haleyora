export interface SubSectorResponse {
  data: SubSector[];
}

export interface SubSector {
  id: string;
  title: string;
  sector_id: string;
}
