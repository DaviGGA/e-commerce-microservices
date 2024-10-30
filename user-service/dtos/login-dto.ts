import { z } from "zod"
import * as E from "fp-ts/Either";
import { Err } from "../utils/err";
import { handleDTO } from "./handle-dto";

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})

export type LoginDTO = {
  username: string,
  password: string
}

export function parseLoginDTO(login: unknown): E.Either<Err, LoginDTO> {
  return handleDTO(login, loginSchema);
}

