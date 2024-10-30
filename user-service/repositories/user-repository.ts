import { createUserDTO } from "../dtos/create-user-dto";
import * as TE from "fp-ts/TaskEither";
import * as O from "fp-ts/Option"
import { Err } from "../utils/err";
import { User } from "../models/domain-user";
import { MongooseUser, mongooseUser } from "../models/mongoose-user";
import { pipe } from "fp-ts/lib/function";
import { MongoError } from "../errors/MongoError";

const toDomainUser = (user: MongooseUser): User => ({
  id: String(user._id),
  username: user.username,
  password: user.password
})

export function create(user: createUserDTO): TE.TaskEither<Err, User> {
  const createTE: TE.TaskEither<Error, MongooseUser> = TE.tryCatch(
    () => mongooseUser.create(user),
    (err) => new Error(String(err))
  )

  return pipe(
    createTE,
    TE.bimap(MongoError, toDomainUser)
  )
}

export function findBy(condition: Partial<User>): TE.TaskEither<Err,O.Option<User>> {
  const findByTE = pipe(
    TE.tryCatch(
      () => mongooseUser.findOne(condition),
      (err) => new Error(String(err))
    ),
    TE.map(O.fromNullable)
  )

  return pipe(
    findByTE,
    TE.bimap(MongoError, O.map(toDomainUser))
  )
}