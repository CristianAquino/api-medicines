import { ICategoryRepository } from '@category/domain/repositories/categoryRepository.interface';
import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';

export class DeleteCategoryUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: ICategoryRepository,
  ) {}
  async execute(id: number) {
    const del = await this.categoryRepository.deleteById(id);
    if (del == 0) {
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
      `Category ${id} have been deleted`,
    );
    return `Category ${id} have been deleted`;
  }
}
