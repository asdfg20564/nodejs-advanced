import { ProductsService } from '../services/products.service.js';

export class ProductsController {

  //service 를 멤버 변수로 할당
  productsService = new ProductsService();

  getProducts = async (req, res, next) => {
    try {
      const products = await this.productsService.findAllProducts();

      return res.status(200).json({ data: products });
    } catch (err) {
      next(err);
    }
  };

  createProduct = async (req, res, next) => {
    try {
      const { nickname, password, title, content } = req.body;

      const createdProducts = await this.productsService.createProducts(
        nickname,
        password,
        title,
        content,
      );

      return res.status(201).json({ data: createdProducts });
    } catch (err) {
      next(err);
    }
  };

  detailProducts = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await this.productsService.findOneProduct(
       productId,
      );

      return res.status(200).json({ data: product });
    } catch (err) {
      next(err);
    }
  };
}