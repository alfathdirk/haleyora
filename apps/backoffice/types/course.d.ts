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
  activities: Activity;
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
  title: string;
  // other activity fields
};
