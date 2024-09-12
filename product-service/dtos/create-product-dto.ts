import * as z from "zod";

const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required."),
  price: z
    .number()
    .positive("Price can't be zero or lower.")
    .min(1, "Price is required.")
})

export type createProductDTO = {
  name: string,
  price: number
}

export function parseProductDTO(product: unknown): z.SafeParseReturnType<unknown, createProductDTO> {
  return createProductSchema.safeParse(product);
}