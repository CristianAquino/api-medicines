import { ICategoryRepository } from '@category/domain/repositories/categoryRepository.interface';
import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';

export class DeleteCategoryUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: ICategoryRepository,
  ) {}
  async execute(id: number) {
    const { category } = await this.categoryRepository.deleteById(id);
    if (!category) {
      this.logger.warn(
        'DeleteCategoryUseCase',
        'Category not found, please check the information',
      );
      throw new NotFoundException(
        'Category not found, please check the information',
      );
    }
    this.logger.log(
      'DeleteCategoryUseCase',
      `Category ${category} have been deleted`,
    );
    return `Category ${category} have been deleted`;
  }
}
