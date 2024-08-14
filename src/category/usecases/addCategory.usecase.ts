import { ICategoryRepository } from '@category/domain/repositories/categoryRepository.interface';
import { CategoryDTO } from '@category/infrastructure/controller/dto';
import { ILogger } from '@common/logger/logger.interface';

export class AddCategoryUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(category: CategoryDTO) {
    const findCategory = await this.categoryRepository.findByCategoryName(
      category.category,
    );
    if (findCategory) {
      this.logger.warn(
        'AddCategoryUseCase',
        `The category ${category.category} already exists`,
      );
      throw new Error('Category already exists');
    }
    await this.categoryRepository.insert(category);
    this.logger.log(
      'AddCategoryUseCase execute',
      'New category have been added',
    );
    return 'New category have been added';
  }
}
