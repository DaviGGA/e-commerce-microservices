import { APIErrors } from "../errors/api-errors";

export type Err = {
  message: string, 
  stack?: string, 
  name: typeof APIErrors[keyof typeof APIErrors]
}

