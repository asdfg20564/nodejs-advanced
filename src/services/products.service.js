import { ProductsRepository } from '../repositories/products.repository.js';



export class ProductsService {
  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  findAllProducts = async () => {
    const products = await this.productsRepository.findAllProducts();

    // 정렬
    products.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // map으로 가공
    return products.map((product) => {
      return {
        productId: product.productId,
        nickname: product.nickname,
        title: product.title,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  };

  createOne = async ({title, userId, description, userName}) => {
    const product = await this.productsRepository.createOne(title, description, userId);

    return { ...product, userName };
  };

  
}
