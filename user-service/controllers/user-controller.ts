import { Request, Response } from "express"
import * as service from "../services/user-service"
import { errorToCode } from "../errors/api-error-to-code";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither"
import { StatusCode } from "../errors/status-code";
import { Err } from "../utils/err";
import { User } from "../models/domain-user";

export function createUser(req: Request,res: Response) {
  return pipe(
    service.createUser(req.body),
    TE.fold(
      (err: Err) => TE.fromIO(() => res.status(errorToCode[err.name]).send(err)),
      (data: User) => TE.fromIO(() => res.status(StatusCode.CREATED).send(data))
    )
  )()
}

export function login(req: Request, res: Response) {
  
}