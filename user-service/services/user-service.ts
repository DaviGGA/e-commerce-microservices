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
import bcrypt from "bcrypt";

export function createUser(user: unknown): TE.TaskEither<Err, User> {
  const verifyPasswordMatching = TE.chain((userDTO: createUserDTO) => 
    TE.fromPredicate(
      isPasswordMatching, 
      () => PasswordDontMatch)(userDTO)
  )
  const isPasswordMatching = (user: createUserDTO) => user.password === user.confirmPassword;

  const userWithHashedPassword = TE.chain( (user: createUserDTO) =>
    pipe(
      encryptUserPassword(user),  
      TE.map(hashedPassword => ({...user, hashedPassword}))
    )
  )
  
  const encryptUserPassword = (user: createUserDTO): TE.TaskEither<Err,string> => TE.tryCatch(
    () => bcrypt.hash(user.password, 10),
    _ => PasswordDontMatch
  )

  return pipe(
    user,
    parseUserDTO,
    TE.fromEither,
    verifyPasswordMatching,
    userWithHashedPassword,
    TE.flatMap(user => userRepository.create({...user, password: user.hashedPassword}))
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
    TE.chain((user: User) => TE.of({ token: signToken(user)}))
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

const comparePassword = (foundUser: User, loginUser: LoginDTO): TE.TaskEither<Err, boolean> => TE.tryCatch(
  () => bcrypt.compare(foundUser.password, loginUser.password),
  () => UserNotFound
)

const verifyPassword = (foundUser: User, loginUser: LoginDTO) =>
  pipe(
    comparePassword(foundUser, loginUser),
    TE.fold(
      err => TE.left(err),
      _ => TE.right(foundUser)
    )
  )
  
const signToken = (user: User) =>
  jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    "super safe secret key",
    {expiresIn: '1d'}
  )