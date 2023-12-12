import { ProductsRepository } from '../repositories/products.repository.js';
import * as HttpStatus from '../errors/http-status.error.js';

export class ProductsService {
  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  readMany = async({sort}) => {
    
    const products = await this.productsRepository.readMany({sort});

    return products;
  }

  createOne = async ({title, userId, description, userName}) => {
    const product = await this.productsRepository.createOne(title, description, userId);

    return { ...product, userName };
  };

  readOne = async ({id}) => {
    
    const product = await this.productsRepository.readOneById({id});

    if (!product) {
      throw new HttpStatus.NotFound('상품 조회에 실패했습니다.');
    }

    return product;
  };

}
