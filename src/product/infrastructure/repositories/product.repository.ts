import { Product } from '@common/entities';
import { CategoryModel, ProductModel } from '@common/entities/models';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductRepository } from '@product/domain/repositories/productRepository.interface';
import { Repository } from 'typeorm';
import { AllProductsData, FindAllProductsDTO } from '../controller/dto';

export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productEntityRepository: Repository<Product>,
  ) {}

  async addProduct(data: any): Promise<void> {
    const product = this.productEntityRepository.create(data);
    await this.productEntityRepository.save(product);
  }
  async findAllProducts(
    findAllProductsDTO: FindAllProductsDTO,
  ): Promise<AllProductsData> {
    const { limit, page, name: productName } = findAllProductsDTO;
    const query = this.productEntityRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category');
    if (productName) {
      query.where('LOWER(product.name) LIKE LOWER(:productName)', {
        productName: `%${productName}%`,
      });
    }
    const [products, total_products] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const last_page = Math.ceil(total_products / limit);

    return {
      data: products.map((ele) => this.findProducts(ele)),
      meta: {
        total: total_products,
        page,
        last_page,
      },
    };
  }
  async findById(id: string): Promise<ProductModel> {
    const product = await this.productEntityRepository.findOneBy({ id });
    if (!product) return null;
    return this.findProduct(product);
  }
  async updateProduct(data: any): Promise<void> {
    const { id, ...content } = data;
    await this.productEntityRepository.update({ id }, content);
  }
  async updateProductCategory(product: any) {
    await this.productEntityRepository.save(product);
  }
  async deleteById(id: string): Promise<ProductModel> {
    const product = await this.findById(id);
    if (product) {
      await this.productEntityRepository.delete({ id });
    }
    return product;
  }

  private findProduct(product: ProductModel): ProductModel {
    const productFound = new ProductModel();
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
  private findProducts(product: ProductModel): ProductModel {
    const allProducts = this.findProduct(product) as ProductModel;
    allProducts.category = this.category(product.category);
    return allProducts;
  }

  private category(category: CategoryModel): CategoryModel {
    const categoryFound = new CategoryModel();
    categoryFound.id = category.id;
    categoryFound.category = category.category;
    return categoryFound;
  }
}
