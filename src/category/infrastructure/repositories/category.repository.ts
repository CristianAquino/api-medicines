import { ICategoryRepository } from '@category/domain/repositories/categoryRepository.interface';
import { Category } from '@common/entities';
import { CategoryModel } from '@common/entities/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryData, CategoryUpdateDTO } from '../controller/dto';

export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(category: string): Promise<void> {
    await this.categoryRepository.save({ category });
  }
  async findAllCategories(category: string): Promise<CategoryData[]> {
    const query = this.categoryRepository.createQueryBuilder('category');
    if (category) {
      query.where('LOWER(category.category) LIKE LOWER(:category)', {
        category: `%${category}%`,
      });
    }
    const allCategories = await query.getMany();
    if (allCategories.length == 0) return null;
    return allCategories.map((category) => this.findCategory(category));
  }
  async findCategoryById(id: number): Promise<CategoryData> {
    const categoryFind = await this.categoryRepository.findOneBy({ id });
    if (!categoryFind) return null;
    return this.findCategory(categoryFind);
  }
  async findCategoryByName(category: string): Promise<any> {
    const categoryFind = await this.categoryRepository
      .createQueryBuilder('category')
      .where('LOWER(category.category) = LOWER(:category)', { category })
      .getOne();
    if (!categoryFind) return null;
    return categoryFind;
  }
  async updateCategory(data: CategoryUpdateDTO): Promise<void> {
    const { id, category } = data;
    await this.categoryRepository.update({ id }, { category });
  }
  async deleteById(id: number): Promise<number> {
    const del = await this.categoryRepository.delete({ id });
    return del.affected;
  }

  private findCategory(category: CategoryModel): CategoryData {
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
