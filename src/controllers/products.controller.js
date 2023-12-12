import { ProductsService } from '../services/products.service.js';


export class ProductsController {

  //service 를 멤버 변수로 할당
  constructor() {
    this.productsService = new ProductsService();
  }
  

  createOne = async (req, res) => {
    try {
      const { id: userId, name: userName } = res.locals.user;
      const { title, description } = req.body;
  
      //유효성 검사
      if (!title) {
        return res.status(400).json({
          success: false,
          message: '제목 입력이 필요합니다.',
        });
      }
  
      if (!description) {
        return res.status(400).json({
          success: false,
          message: '설명 입력이 필요합니다.',
        });
      }

      const data = await this.productsService.createOne({title, description, userId, userName});
  
      return res.status(201).json({
        success: true,
        message: '상품 생성에 성공했습니다.',
        data,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };

  readMany = async (req, res) => {
    try {
      const { sort } = req.query;
      let upperCaseSort = sort?.toUpperCase();
  
      if (upperCaseSort !== 'ASC' && upperCaseSort !== 'DESC') {
        upperCaseSort = 'DESC';
      }
  
      const data = await this.productsService.readMany({
        sort: upperCaseSort,
      });

      return res.status(200).json({
        success: true,
        message: '상품 목록 조회에 성공했습니다.',
        data,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };

  readOne = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const product = await this.productsService.readOne({id: productId});
  
      return res.status(200).json({
        success: true,
        message: '상품 목록 조회에 성공했습니다.',
        data: product,
      });
    } catch (error) {
      console.error(error);

      const statusCode = error.statusCode ?? 500;
      const message = error.message ?? '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.';
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  }
}