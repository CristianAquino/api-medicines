import {
  CategoryData,
  CategoryUpdateDTO,
} from '@category/infrastructure/controller/dto';

export interface ICategoryRepository {
  createCategory(category: string): Promise<void>;
  findAllCategories(category: string): Promise<CategoryData[]>;
  findCategoryById(id: number): Promise<CategoryData>;
  findCategoryByName(category: string): Promise<any>;
  updateCategory(categoryUpdateDTO: CategoryUpdateDTO): Promise<void>;
  deleteById(id: number): Promise<CategoryData>;
}
