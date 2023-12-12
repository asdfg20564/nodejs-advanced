import { Router } from 'express';
import { Sequelize } from 'sequelize';
import { needSignin } from '../middlewares/need-signin.middleware.js';
import db from '../models/index.cjs';

import { ProductsController } from '../controllers/products.controller.js';

const productsRouter = Router();
const { Products, Users } = db;

const productsController = new ProductsController();

// 생성
productsRouter.post('', needSignin, productsController.createOne);

// 목록 조회
productsRouter.get('', productsController.readMany);

// 상세 조회
productsRouter.get('/:productId', productsController.readOne);

// 수정
productsRouter.put('/:productId', needSignin, productsController.updateOne);

// 삭제
productsRouter.delete('/:productId', needSignin, async (req, res) => {
  try {
    const { productId } = req.params;
    const { id: userId, name: userName } = res.locals.user;

    // 일치하는 상품이 존재하지 않는 경우
    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: '상품 조회에 실패했습니다.',
      });
    }

    // 작성자ID와 인증 정보의 사용자ID가 다른 경우
    const isProductOwner = product.userId === userId;
    if (!isProductOwner) {
      return res.status(403).json({
        success: false,
        message: '상품 삭제 권한이 없습니다.',
      });
    }

    await product.destroy({ where: { id: productId } });

    const deletedProduct = {
      ...product.toJSON(),
      userName,
    };

    return res.status(200).json({
      success: true,
      message: '상품 삭제에 성공했습니다.',
      data: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
    });
  }
});

export { productsRouter };
