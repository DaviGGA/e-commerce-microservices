import * as z from "zod";
import { handleDTO } from "./handle-dto";
import * as E from "fp-ts/Either";
import { Err } from "../utils/err";

const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required."),
  price: z
    .number()
    .positive("Price can't be zero or lower.")
})

export type createProductDTO = {
  name: string,
  price: number
}

export function parseProductDTO(product: unknown): E.Either<Err, createProductDTO> {
  return handleDTO(product, createProductSchema);
}