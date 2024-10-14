import { identity, pipe } from "fp-ts/lib/function";
import { parseaAddProductBodyDTO } from "../dtos/add-product-to-store-dto";
import { parseProductDTO } from "../dtos/create-product-dto";
import { Product } from "../models/domain-product";
import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"
import * as productRepository from "../repositories/product-repository"
import { Err } from "../utils/return-pattern";

export function createProduct(product: unknown): TE.TaskEither<Err,Product> {
  return pipe(
    product,
    parseProductDTO,
    TE.fromEither,
    TE.flatMap(product => productRepository.create(product))
  )
}

export function findProduct(productId: string): TE.TaskEither<Err,Product> {
  return pipe(
    productId,
    productRepository.findById,
    TE.chain(
      O.match(
        () => TE.left(({message: "Product not Found", stack: "", name: "NotFoundError"} as Err)),
        product => TE.right(product)
      )
    )
  )
}

// export async function addProductToStore(body: unknown): Promise<HandleResponse<null>> {
//   const [errAddProductDTO, addProductDTO] = parseaAddProductBodyDTO(body);
//   if(errAddProductDTO) return err(errAddProductDTO);

//   const [updateError, _] = await productRepository.updateProductQuantity(addProductDTO.productId, addProductDTO.quantity);
//   if(updateError) return err(updateError);

//   return success(null)
// }
