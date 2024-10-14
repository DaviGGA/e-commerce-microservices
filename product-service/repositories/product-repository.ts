import { MongoServerError } from "mongodb";
import { createProductDTO } from "../dtos/create-product-dto";
import { Product } from "../models/domain-product";
import { mongooseProduct, MongooseProduct } from "../models/mongoose-product";
import { Err } from "../utils/return-pattern";
import { APIErrors } from "../errors/api-errors";
import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option"
import { pipe } from "fp-ts/lib/function";

const getMongoErr = (e: Error) => ({
  message: e.message,
  name: APIErrors.MongoServerError,
  stack: e.stack
})

const getProduct = (p: MongooseProduct) => ({
  id: String(p._id),
  name: p.name,
  price: p.price,
  quantity: p.quantity 
})

export function create(product: createProductDTO): TE.TaskEither<Err, Product> {

  const createTE: TE.TaskEither<Error, MongooseProduct> = TE.tryCatch(
    () => mongooseProduct.create(product),
    (err) => new Error(String(err))
  )

  return pipe(
    createTE,
    TE.bimap(getMongoErr, getProduct)
  )
}

export function findById(id: string): TE.TaskEither<Err,O.Option<Product>> {
  const findByIdTE = pipe(
    TE.tryCatch(
      () => mongooseProduct.findById(id),
      err => new Error(String(err)) 
    ),
    TE.map(O.fromNullable)
  )

  return pipe(
    findByIdTE,
    TE.bimap(getMongoErr, O.map(getProduct))
  )
}


// export async function findById(id: string): Promise<HandleResponse<Product | null>> {
//   try {
//     const foundProduct = await mongooseProduct.findById(id);

//     return foundProduct ?
//     success({
//       id: String(foundProduct._id),
//       name: foundProduct.name,
//       price: foundProduct.price,
//       quantity: foundProduct.quantity
//     }) : success (null)

//   } catch (error) {
//     return err({
//       message: "Internal Server Error",
//       stack: "",
//       name: APIErrors.InternalServerError
//     })
//   }

// }

// export async function findBy(condition: Partial<Product>): Promise<HandleResponse<Product | null>> {
//   try {
//     const foundProduct = await mongooseProduct.findOne(condition);

//     return foundProduct ?
//     success({
//       id: String(foundProduct._id),
//       name: foundProduct.name,
//       price: foundProduct.price,
//       quantity: foundProduct.quantity
//     }) : success (null)

//   } catch (error) {
//     return err({
//       message: "Internal Server Error",
//       stack: "",
//       name: APIErrors.InternalServerError
//     })
//   }

// }

// export async function updateProductQuantity(productId: string, quantity: number): Promise<HandleResponse<null>> {
//   try {
//     await mongooseProduct.updateOne(
//       {_id: productId},
//       {quantity}
//     )
//     return success(null)
//   } catch (error) {
//     return err({
//       message: "Internal Server Error",
//       stack: "",
//       name: APIErrors.InternalServerError
//     })
//   }

  
// }