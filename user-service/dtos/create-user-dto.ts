import * as z from "zod";
import { handleDTO } from "./handle-dto";
import * as E from "fp-ts/Either";
import { Err } from "../utils/err";

const passwordValidation = z
  .string()
  .min(8, "Password must have atleast eight characters")
  .refine( password =>
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  , "Password must have atleast one s")
  .refine( password =>
    /\d/.test(password)
  , "Password must contain atleast one digit")

const createProductSchema = z.object({
  username: z
    .string()
    .min(1, "Name is required."),
  password: passwordValidation,
  confirmPassword: passwordValidation
})

export type createUserDTO = {
  username: string,
  password: string,
  confirmPassowrd: string
}

export function parseUserDTO(user: unknown): E.Either<Err, createUserDTO> {
  return handleDTO(user, createProductSchema);
}