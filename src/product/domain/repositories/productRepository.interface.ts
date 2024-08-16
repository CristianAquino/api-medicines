import {
  ProductDTO,
  UpdateProductDTO,
} from '@product/infrastructure/controller/dto';

export interface IProductRepository {
  createProduct(product: any): Promise<void>;
  getAllProducts(): Promise<ProductDTO[]>;
  updateProduct(data: UpdateProductDTO): Promise<void>;
  updateProductCategory(product: any): Promise<any>;
  findById(id: string): Promise<any>;
  deleteById(id: string): Promise<number>;
}
