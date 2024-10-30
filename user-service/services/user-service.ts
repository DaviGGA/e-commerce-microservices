import { identity, pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"
import * as userRepository from "../repositories/user-repository"
import { Err } from "../utils/err";
import { createUserDTO, parseUserDTO } from "../dtos/create-user-dto";
import { User } from "../models/domain-user";
import { PasswordDontMatch } from "../errors/PasswordDontMatch";
import { LoginDTO, parseLoginDTO } from "../dtos/login-dto";
import { UserNotFound } from "../errors/UserNotFound";
import jwt from "jsonwebtoken";

export function createUser(user: unknown): TE.TaskEither<Err, User> {
const checkConfirmPassword = (user: createUserDTO) => user.password === user.confirmPassowrd;

  return pipe(
    user,
    parseUserDTO,
    TE.fromEither,
    TE.chain((userDTO: createUserDTO) => 
    TE.fromPredicate(
      checkConfirmPassword, 
      () => PasswordDontMatch)(userDTO)
    ),
    TE.flatMap(userRepository.create)
  )
}

export function login(loginUser: unknown): TE.TaskEither<Err,{token: string}> {

  return pipe(
    loginUser,
    parseLoginDTO,
    TE.fromEither,
    TE.chain((loginUser: LoginDTO) => 
      userRepository.findBy({username: loginUser.username})),
    TE.chain(userExistOrErr),
    TE.chain((foundUser: User) => verifyPassword(foundUser, loginUser as LoginDTO)),
    TE.chain(signToken),
  )
}

const userExistOrErr = (userOption: O.Option<User>): TE.TaskEither<Err,User> =>
  pipe(
    userOption,
    O.match(
      () => TE.left(UserNotFound),
      (user) => TE.right(user)
    )
  )

const verifyPassword = (foundUser: User, loginUser: LoginDTO) => TE.fromPredicate(
  () => foundUser.password === loginUser.password,
  () => UserNotFound  
)(foundUser);

const signToken = (user: User) =>
  jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    "super safe secret key",
    {expiresIn: '1d'}
  )