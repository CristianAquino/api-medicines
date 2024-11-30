import { ProductModel } from '@common/entities/models';
import {
  AllProductsData,
  FindAllProductsDTO,
  UpdateProductDTO,
} from '@product/infrastructure/controller/dto';

export interface IProductRepository {
  addProduct(product: any): Promise<void>;
  findAllProducts(
    findAllProductsDTO: FindAllProductsDTO,
  ): Promise<AllProductsData>;
  findById(id: string): Promise<ProductModel>;
  updateProduct(data: UpdateProductDTO): Promise<void>;
  updateProductCategory(product: any): Promise<any>;
  deleteById(id: string): Promise<ProductModel>;
}
