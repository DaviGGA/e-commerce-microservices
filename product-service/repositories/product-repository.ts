import { MongoServerError } from "mongodb";
import { createProductDTO } from "../dtos/create-product-dto";
import { Product } from "../models/domain-product";
import { mongooseProduct } from "../models/mongoose-product";
import { HandleResponse, err, success } from "../utils/return-pattern";
import { APIErrors } from "../errors/api-errors";

export async function create(product: createProductDTO): Promise<HandleResponse<Product>> {

  try {
    const createdProduct = await mongooseProduct.create(product);

    return success({
      id: String(createdProduct._id),
      name: createdProduct.name,
      price: createdProduct.price
    })
    
  } catch (error: unknown) {
    if (error instanceof MongoServerError) {
      return err(error.errmsg, "", APIErrors.MongoServerError);
    }

    return err("Internal Server Error", "", APIErrors.InternalServerError)
  }

}


export async function findById(id: string): Promise<Product | null> {
  const product = await mongooseProduct.findById(id);
  return  product ? 
  {
    id: String(product._id),
    name: product.name,
    price: product.price
  } : null;
}