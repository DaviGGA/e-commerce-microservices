import { Err } from "../utils/err";
import { APIErrors } from "./api-errors";

export const HashingPasswordError: Err = {
  name: APIErrors.HashingPasswordError,
  message: "An error ocurred at the password hashing."
}