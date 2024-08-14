import { ICategoryRepository } from '@category/domain/repositories/categoryRepository.interface';
import { Category } from '@common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CategoryDTO,
  CategoryUpdateDTO,
  ReturnCategory,
} from '../controller/dto';

export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryEntityRepository: Repository<Category>,
  ) {}
  async insert(category: CategoryDTO): Promise<void> {
    await this.categoryEntityRepository.save(category);
  }
  async update(data: CategoryUpdateDTO): Promise<void> {
    const { id, ...content } = data;
    await this.categoryEntityRepository.update({ id }, content);
  }
  async deleteById(id: number): Promise<number> {
    const del = await this.categoryEntityRepository.delete({ id });
    return del.affected;
  }
  async findAll(): Promise<ReturnCategory[]> {
    const allCategories = await this.categoryEntityRepository.find();
    return allCategories.map((category) => this.findCategory(category));
  }
  async findById(id: number): Promise<ReturnCategory> {
    const categoryFind = await this.categoryEntityRepository.findOneBy({ id });
    if (!categoryFind) return null;
    return this.findCategory(categoryFind);
  }
  async findByCategoryName(category: string): Promise<any> {
    const categoryFind = await this.categoryEntityRepository.findOneBy({
      category,
    });
    if (!categoryFind) return null;
    return this.findCategory(categoryFind);
  }

  private findCategory(category: Category): ReturnCategory {
    const categoryFound = new Category();
    categoryFound.id = category.id;
    categoryFound.category = category.category;
    const total = {
      ...categoryFound,
      total_products: category.products?.length ?? 0,
    };
    return total;
  }
}
