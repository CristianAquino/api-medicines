import { ICategoryRepository } from '@category/domain/repositories/categoryRepository.interface';
import { ReturnCategory } from '@category/infrastructure/controller/dto';
import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';

export class GetAllCategoriesUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<ReturnCategory[]> {
    const allCategories = await this.categoryRepository.findAll();
    if (allCategories.length === 0) {
      this.logger.warn('GetAllCategoriesUseCase', 'Categories not found');
      throw new NotFoundException('Categories not found');
    }
    this.logger.log('GetAllCategoriesUseCase execute', 'Return all categories');
    return allCategories;
  }
}
