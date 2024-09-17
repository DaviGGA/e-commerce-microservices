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
      price: createdProduct.price,
      quantity: createdProduct.quantity
    })
    
  } catch (error: unknown) {
    if (error instanceof MongoServerError) {
      return err({
        message: error.errmsg,
        stack: "",
        name: APIErrors.MongoServerError
      })
    }

    return err({
      message: "Internal Server Error",
      stack: "",
      name: APIErrors.InternalServerError
    })
  }

}


export async function findById(id: string): Promise<HandleResponse<Product | null>> {
  try {
    const foundProduct = await mongooseProduct.findById(id);

    return foundProduct ?
    success({
      id: String(foundProduct._id),
      name: foundProduct.name,
      price: foundProduct.price,
      quantity: foundProduct.quantity
    }) : success (null)

  } catch (error) {
    return err({
      message: "Internal Server Error",
      stack: "",
      name: APIErrors.InternalServerError
    })
  }

}

export async function findBy(condition: Partial<Product>): Promise<HandleResponse<Product | null>> {
  try {
    const foundProduct = await mongooseProduct.findOne(condition);

    return foundProduct ?
    success({
      id: String(foundProduct._id),
      name: foundProduct.name,
      price: foundProduct.price,
      quantity: foundProduct.quantity
    }) : success (null)

  } catch (error) {
    return err({
      message: "Internal Server Error",
      stack: "",
      name: APIErrors.InternalServerError
    })
  }

}

export async function updateProductQuantity(productId: string, quantity: number): Promise<HandleResponse<null>> {
  try {
    await mongooseProduct.updateOne(
      {_id: productId},
      {quantity}
    )
    return success(null)
  } catch (error) {
    return err({
      message: "Internal Server Error",
      stack: "",
      name: APIErrors.InternalServerError
    })
  }

  
}