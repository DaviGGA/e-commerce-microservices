import { Err } from "../utils/err";
import { APIErrors } from "./api-errors";

export const InvalidTokenError: Err = {
  name: APIErrors.InvalidTokenError,
  message: "This token is invalid for some reason."
}