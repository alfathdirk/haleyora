import { Course } from "./course";

export interface Data {
  meta?: Meta;
  data: Employee[];
}

export interface Meta {
  total_count: number;
  filter_count: number;
}

export interface Employee {
  id: string;
  full_name: string;
  role: string;
  verified: boolean;
  status: string;
  email: string;
  phone?: string;
  employee_id?: string;
  place_of_birth?: string;
  date_of_birth?: string;
  work_status?: string;
  gender?: string;
  religion?: string;
  address?: string;
  unit_pln?: string;
  unit?: string;
  placement?: string;
  position?: string;
  job?: string;
  employee_course?: EmployeeCourse[]
}

export interface EmployeeCourse {
  id: string;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated: Date;
  completed: boolean;
  employee: string;
  exam_score: null;
  tasks_score: null;
  last_video_duration: null;
  video_duration: null;
  exam_attempt: number;
  tasks: any[];
  course: Course;
}
