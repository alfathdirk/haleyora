export interface ActivitiesResponse {
  data: Activities[];
  meta?: Meta;
}

export interface Meta {
  total_count: number;
  filter_count: number;
}

type Status = 'draft' | 'published' | 'archived';

export interface Activities {
  id: string;
  sub_sector: string;
  title: string;
  status: Status;
  name?: string;
}
