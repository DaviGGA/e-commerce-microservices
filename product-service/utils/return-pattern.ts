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

//Experiments
export class Response<T> {
  private _data: T | null
  private _err: Err | null

  private constructor (data:T | null ,err: Err | null) {
    this._data = data
    this._err = err
  }

  static success<T>(data: T): Response<T> {
    return new Response(data, null)
  }

  static err<T>(err: Err): Response<T> {
    return new Response(null, err) as Response<T>
  }

  bind<R>(func: (res: Response<T>) => Response<R> ): Response<R> {
    if (this._err) {
      return Response.err(this._err) as Response<R>;
    }

    return func(this);
  }

  async bindAsync<R>(func: (res: Response<T>) => Promise<Response<R>>): Promise<Response<R>> {
    if (this._err) {
      return Response.err(this._err) as Response<R>;
    }

    return await func(this);
  }

  data(): T | null {
    return this._data;
  }

  err(): Err | null {
    return this._err;
  }

  divide(): HandleResponse<T> {
    if (this._data) return [null, this._data];
    return [this._err as Err, null];
  }

}
