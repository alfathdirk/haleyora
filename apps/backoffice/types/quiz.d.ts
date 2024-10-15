export interface Data {
  data: Quiz[];
  meta: {
    total_count: number;
    filter_count: number;
  };
}

export interface Quiz {
  id: string;
  user_created: string;
  date_created: string;
  user_updated: null;
  date_updated: null;
  title: string;
  duration: number;
  score_per_question: number;
  description: null;
  randomize: boolean;
  quiz_question: string[];
}

type Activity = {
  id: number;
  name: string;
  // other activity fields
};

type EmployeeCourse = EmployeeCourse
