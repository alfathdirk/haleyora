import { Course } from "./course";

export interface Data {
  meta?: Meta;
  data: CourseAvailability[];
}

export interface Meta {
  total_count: number;
  filter_count: number;
}

export interface CourseAvailability {
  id: string;
  course: Course;
  entity: CourseAvailabilityEntity;
  entity_name: string;
  start_date: string;
  end_date: string;
}

export type CourseAvailabilityEntity =
    | 'All'
    | 'unit_region'
    | 'unit_layanan'
    | 'unit_pln'
    | 'pekerjaan'
    | 'penempatan';
