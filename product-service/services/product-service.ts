import { parseProductDTO } from "../dtos/create-product-dto";
import { Product } from "../models/domain-product";
import * as productRepository from "../repositories/product-repository"

export async function createProduct(product: unknown): Promise<Product> {
  const productDTO = parseProductDTO(product);

  const createdProduct = await productRepository.create(productDTO.data);
  return createdProduct;
}