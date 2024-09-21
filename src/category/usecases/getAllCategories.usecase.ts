import { ICategoryRepository } from '@category/domain/repositories/categoryRepository.interface';
import { CategoryData } from '@category/infrastructure/controller/dto';
import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';

export class GetAllCategoriesUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(category: string): Promise<CategoryData[]> {
    const allCategories = await this.categoryRepository.findAllCategories(
      category,
    );
    if (!allCategories) {
      this.logger.warn(
        'GetAllCategoriesUseCase',
        `Categories ${category ?? ''} not found`,
      );
      throw new NotFoundException(`Categories ${category ?? ''} not found`);
    }
    this.logger.log('GetAllCategoriesUseCase', 'Return all categories');
    return allCategories;
  }
}
