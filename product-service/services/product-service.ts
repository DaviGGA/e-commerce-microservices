import { parseProductDTO } from "../dtos/create-product-dto";
import { APIErrors } from "../errors/api-errors";
import { Product } from "../models/domain-product";
import * as productRepository from "../repositories/product-repository"
import { HandleResponse, err, success } from "../utils/return-pattern";

export async function createProduct(product: unknown): Promise<HandleResponse<Product>> {
  const [errProductDTO, productDTO] = parseProductDTO(product);
  
  if (errProductDTO) {
    return err(errProductDTO.message, errProductDTO.stack, errProductDTO.name as APIErrors)
  }

  const [createError, createdProduct] = await productRepository.create(productDTO);

  if (createError) {
    return err(createError.message, createError.stack, createError.name as APIErrors)
  }

  return success(createdProduct);
}

