export interface CourseReponse {
  data: Course[];
  meta: {
    total_count: number;
    filter_count: number;
  }
}

export interface Course {
  id: string;
  status: string;
  user_created: string;
  date_created: Date;
  user_updated: null;
  date_updated: null;
  title: string;
  image: null;
  imageUrl?: string;
  activities: string | Activity;
  duration: number | null;
  material_content: null;
  video_content: null;
  is_open_exam: boolean;
  is_open_task: boolean;
  min_score: string;
  exam_quiz: null;
  description: null;
  task_description: null;
  employee_course: EmployeeCourse[];
  employee_bookmark: any[];
  totalEmployeeCourse?: number;
}

type Activity = {
  id: number;
  name: string;
  // other activity fields
};

type EmployeeCourse = {
  id: number; // or more fields if needed
};