import * as z from "zod";
import { handleDTO } from "./handle-dto";
import { HandleResponse, Response } from "../utils/return-pattern";

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

export function parseProductDTO(product: unknown): Response<createProductDTO> {
  return handleDTO(product, createProductSchema);
}