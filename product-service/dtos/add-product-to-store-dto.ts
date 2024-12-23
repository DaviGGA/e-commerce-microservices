import * as z from "zod";
import { handleDTO } from "./handle-dto";
import * as E from "fp-ts/Either";
import { Err } from "../utils/err";

const addProductToStoreSchema = z.object({
  productId: z
    .string()
    .length(24, "Product id must have 24 characters"),
  quantity: z
    .number()
    .positive("Quantity can't be zero or lower")
})

export type addProductToStoreDTO = {
  productId: string,
  quantity: number
}

export function parseaAddProductBodyDTO(body: unknown): E.Either<Err, addProductToStoreDTO> {
  return handleDTO(body, addProductToStoreSchema);
}