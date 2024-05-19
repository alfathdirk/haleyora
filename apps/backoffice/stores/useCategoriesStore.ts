// src/store/useCategoriesStore.ts
import { create } from "zustand";
import { Category } from "@/types/category";

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => void;
  setCategories: (categories: Category[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFetchCategories: (fetchCategories: () => void) => void;
}

const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: () => {},
  setCategories: (categories) => set({ categories }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFetchCategories: (fetchCategories) => set({ fetchCategories }),
}));

export default useCategoriesStore;
