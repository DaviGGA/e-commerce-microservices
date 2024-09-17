import { APIErrors } from "../errors/api-errors";

type SuccessResponse<T> = [null, T];

export function success<T>(data: T): SuccessResponse<T> {
  return [null, data];
}

type Err = {message: string, stack: string, name: APIErrors}

type ErrResponse = [Err, null];

export function err(error: Err): ErrResponse {
  return [error, null];
}

export type HandleResponse<T> = SuccessResponse<T> | ErrResponse; 
