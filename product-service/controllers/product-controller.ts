import { Request, Response } from "express"
import * as service from "../services/product-service"
import { errorToCode } from "../errors/api-error-to-code";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither"
import { StatusCode } from "../errors/status-code";
import { Err } from "../utils/err";
import { Product } from "../models/domain-product";

export function createProduct(req: Request,res: Response) {
  return pipe(
    service.createProduct(req.body),
    TE.fold(
      (err: Err) => TE.fromIO(() => res.status(errorToCode[err.name]).send(err)),
      (data: Product) => TE.fromIO(() => res.status(StatusCode.CREATED).send(data))
    )
  )()
}

export function findProduct(req: Request, res: Response) {
  return pipe(
    service.findProduct(req.params.id),
    TE.fold(
      (err: Err) => TE.fromIO(() => res.status(errorToCode[err.name]).send(err)),
      (data: Product) => TE.fromIO(() => res.status(StatusCode.OK).send(data))
    )
  )()
}