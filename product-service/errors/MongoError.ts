import { Err } from "../utils/err";
import { APIErrors } from "./api-errors";

export const MongoError = (e: Error): Err =>
({
  name: APIErrors.MongoServerError,
  message: e.message ?? "Non identified Mongo server error",
  stack: e.stack ?? ""
})