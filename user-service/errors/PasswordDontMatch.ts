import { Err } from "../utils/err";
import { APIErrors } from "./api-errors";

export const PasswordDontMatch: Err = {
  name: APIErrors.PasswordDontMatch,
  message: "password and confirmPassword must be equal."
}