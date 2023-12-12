import { ProductsRepository } from '../repositories/products.repository.js';



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

  
}
