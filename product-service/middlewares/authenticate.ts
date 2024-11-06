import { NextFunction, Request, Response } from "express";
import * as TE from "fp-ts/TaskEither"
import * as T from 'fp-ts/Task'
import { InvalidTokenError } from "../errors/InvalidTokenError";
import { pipe } from "fp-ts/lib/function";
import { Err } from "../utils/err";
import jwt from "jsonwebtoken";
import { errorToCode } from "../errors/api-error-to-code";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  return pipe (
    req.headers.authorization,
    validateToken,
    TE.flatMap(verifyToken),
    TE.fold(
      err => T.of(res.status(errorToCode[err.name]).send(err.message)),
      _ => () => next() as any
    )
  )()
}


const validateToken = (token?: string): TE.TaskEither<Err, string> =>
  pipe(
    token,
    TE.fromNullable(InvalidTokenError),
    TE.map(token => token.split(' ')[1]),
    TE.flatMap(TE.fromNullable(InvalidTokenError))
  )


const verifyToken = (token: string) => 
  TE.tryCatch(
    () => Promise.resolve(jwt.verify(token, "super safe secret key")),
    () => InvalidTokenError
  )