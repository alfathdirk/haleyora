import { Course } from "./course";
import { Employee } from "./employee";

export interface TaskResponse {
  data: Task[];
  meta?: Meta;
}

export interface Meta {
  total_count: number;
  filter_count: number;
}

export interface Task {
  course: Course;
  id: string;
  employee: Employee;
  tasks_score: null;
  tasks: any[];
}
