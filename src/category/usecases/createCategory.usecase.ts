import { ICategoryRepository } from '@category/domain/repositories/categoryRepository.interface';
import { CategoryDTO } from '@category/infrastructure/controller/dto';
import { ILogger } from '@common/logger/logger.interface';

export class CreateCategoryUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(category: CategoryDTO) {
    const findCategory = await this.categoryRepository.findCategoryByName(
      category.category,
    );
    if (findCategory) {
      this.logger.warn(
        'CreateCategoryUseCase',
        `The category ${category.category} already exists`,
      );
      throw new Error(`The category ${category.category} already exists`);
    }
    await this.categoryRepository.createCategory(category.category);
    this.logger.log(
      'CreateCategoryUseCase',
      `Category ${category.category} has been added`,
    );
    return `Category ${category.category} has been added`;
  }
}
