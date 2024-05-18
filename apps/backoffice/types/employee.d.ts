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
}
