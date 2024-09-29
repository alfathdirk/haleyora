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
  id: number;
  full_name: string;
  role: string;
  verified: boolean;
  status: string;
  email: string;
  employee_id?: string;
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
