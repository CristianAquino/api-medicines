import { Category, Product } from '@common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductRepository } from 'src/product/domain/repositories/productRepository.interface';
import { Repository } from 'typeorm';
import { ProductDTO } from '../controller/dto';

export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productEntityRepository: Repository<Product>,
  ) {}

  async createProduct(data: any): Promise<void> {
    const product = this.productEntityRepository.create(data);
    await this.productEntityRepository.save(product);
  }
  async getAllProducts(): Promise<ProductDTO[]> {
    const allProducts = await this.productEntityRepository.find({
      relations: { category: true },
    });
    return allProducts.map((product) => this.findAllProducts(product));
  }
  async updateProduct(data: any): Promise<void> {
    const { id, ...content } = data;
    await this.productEntityRepository.update({ id }, content);
  }
  async updateProductCategory(product: any) {
    await this.productEntityRepository.save(product);
  }
  async findById(id: string): Promise<any> {
    const product = await this.productEntityRepository.findOneBy({ id });
    if (!product) return null;
    return this.findProduct(product);
  }
  async deleteById(id: string): Promise<number> {
    const del = await this.productEntityRepository.delete({ id });
    return del.affected;
  }

  private findProduct(product: Product): ProductDTO {
    const productFound = new Product();
    productFound.id = product.id;
    productFound.name = product.name;
    productFound.sku = product.sku;
    productFound.stock = product.stock;
    productFound.available = product.available;
    productFound.unit_price = product.unit_price;
    productFound.expiration_date = product.expiration_date;
    productFound.description = product.description;
    return productFound;
  }
  private findAllProducts(product: Product): ProductDTO {
    const allProducts = this.findProduct(product) as Product;
    allProducts.category = this.category(product.category);
    return allProducts;
  }

  private category(category: Category): any {
    const categoryFound = new Category();
    categoryFound.id = category.id;
    categoryFound.category = category.category;
    return categoryFound;
  }
}
