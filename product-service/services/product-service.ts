import { parseaAddProductBodyDTO } from "../dtos/add-product-to-store-dto";
import { parseProductDTO } from "../dtos/create-product-dto";
import { Product } from "../models/domain-product";
import * as productRepository from "../repositories/product-repository"
import { HandleResponse, err, success } from "../utils/return-pattern";

export async function createProduct(product: unknown): Promise<HandleResponse<Product>> {
  const [errProductDTO, productDTO] = parseProductDTO(product);  
  if (errProductDTO) return err(errProductDTO)

  const [createError, createdProduct] = await productRepository.create(productDTO);
  if (createError) return err(createError)

  return success(createdProduct);
}

export async function addProductToStore(body: unknown): Promise<HandleResponse<null>> {
  const [errAddProductDTO, addProductDTO] = parseaAddProductBodyDTO(body);
  if(errAddProductDTO) return err(errAddProductDTO);

  const [updateError, _] = await productRepository.updateProductQuantity(addProductDTO.productId, addProductDTO.quantity);
  if(updateError) return err(updateError);

  return success(null)
}
