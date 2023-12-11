import { ProductsRepository } from '../repositories/products.repository.js';

export class ProductsService {
  productsRepository = new ProductsRepository();

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

  //인자로 받는다.
  createProducts = async (nickname, password, title, content) => {
    const createdProduct = await this.productsRepository.createProduct(
      nickname,
      password,
      title,
      content,
    );

    // 비번 빼고 보여주기
    return {
      productId: createdProduct.productId,
      nickname: createdProduct.nickname,
      title: createdProduct.title,
      content: createdProduct.content,
      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt,
    };
  };

  findOneProduct = async (productId) => {
    const product = await this.productsRepository.findOneProducts(productId);
  return {
    productId: product.productId,
    nickname: product.nickname,
    title: product.title,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }
};
}