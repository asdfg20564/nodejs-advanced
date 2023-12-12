import db from '../../models/index.cjs';
import { Sequelize } from 'sequelize';
const { Products, Users } = db;

export class ProductsRepository {
  createOne = async ({ title, description, userId }) => {
    const product = (
      await Products.create({ title, description, userId })
    ).toJSON();
    return product;
  };

  readMany = async ({sort}) =>{
    const products = await Products.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'status',
        'userId',
        [Sequelize.col('user.name'), 'userName'],
        'createdAt',
        'updatedAt',
      ],
      order: [['createdAt', sort]],
      include: { model: Users, as: 'user', attributes: [] },
    });

    return products.map(product => product.toJSON());
  }
}
