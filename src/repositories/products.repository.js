import db from '../../models/index.cjs';

const { Products } = db;

export class ProductsRepository {
  createOne = async ({ title, description, userId }) => {
    const product = (
      await Products.create({ title, description, userId })
    ).toJSON();
    return product;
  };
}
