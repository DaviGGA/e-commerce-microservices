import { APIErrors } from "../errors/api-errors";

export type Err = {
  message: string, 
  stack: string | undefined, 
  name: typeof APIErrors[keyof typeof APIErrors]
}

