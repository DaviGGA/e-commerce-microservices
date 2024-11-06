import { StatusCode } from "./status-code";

export const errorToCode = {
  ZodParseError: StatusCode.VALIDATION_ERROR,
  MongoServerError: StatusCode.INTERNAL_SERVER_ERROR,
  InternalServerError: StatusCode.INTERNAL_SERVER_ERROR,
  NotFoundError: StatusCode.NOT_FOUND,
  PasswordDontMatch: StatusCode.BAD_REQUEST,
  UserNotFound: StatusCode.NOT_FOUND,
  HashingPasswordError: StatusCode.INTERNAL_SERVER_ERROR
}