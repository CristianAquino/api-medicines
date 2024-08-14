import {
  CategoryDTO,
  CategoryUpdateDTO,
  ReturnCategory,
} from '@category/infrastructure/controller/dto';

export interface ICategoryRepository {
  insert(categoryDTO: CategoryDTO): Promise<void>;
  update(categoryUpdateDTO: CategoryUpdateDTO): Promise<void>;
  deleteById(id: number): Promise<number>;
  findAll(): Promise<ReturnCategory[]>;
  findById(id: number): Promise<ReturnCategory>;
  findByCategoryName(category: string): Promise<ReturnCategory>;
}
