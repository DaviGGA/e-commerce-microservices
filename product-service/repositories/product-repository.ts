import { createProductDTO } from "../dtos/create-product-dto";
import { Product } from "../models/domain-product";
import { mongooseProduct } from "../models/mongoose-product";

export async function create(product: createProductDTO): Promise<Product> {
  const createdProduct = await mongooseProduct.create(product);
  return {
    id: String(createdProduct._id),
    name: createdProduct.name,
    price: createdProduct.price
  }
}


export async function findById(id: string): Promise<Product | null> {
  const product = await mongooseProduct.findById(id);
  return  product ? 
  {...product, id: String(product._id)} : null;
}