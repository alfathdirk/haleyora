export interface CategoryResponse {
  data: Category[];
}

export interface Category {
  id: string;
  sort: null;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated: Date;
  name: string;
  image: null;
  imageUrl?: string;
}
