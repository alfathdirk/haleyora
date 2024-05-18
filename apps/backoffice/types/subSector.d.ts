export interface SubSectorResponse {
  data: SubSector[];
}

export interface SubSector {
  id: string;
  sector_id: string;
  title: string;
  name?: string;
}
