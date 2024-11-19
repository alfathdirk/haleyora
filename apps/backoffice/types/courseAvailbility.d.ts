import { Course } from "./course";

export interface Data {
  meta?: Meta;
  data: CourseAvaibility[];
}

export interface Meta {
  total_count: number;
  filter_count: number;
}

export interface CourseAvaibility {
  id: string;
  course: Course;
  entity: CourseAvailabilityEntity;
  entity_name: string;
  start_date: string;
  end_date: string;
  verified: boolean;
}

export type CourseAvailabilityEntity =
    | 'All'
    | 'unit_pelaksana_region'
    | 'unit_layanan'
    | 'unit_pln'
    | 'pekerjaan'
    | 'penempatan';
