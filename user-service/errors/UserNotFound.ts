import { Err } from "../utils/err";
import { APIErrors } from "./api-errors";

export const UserNotFound: Err = {
  name: APIErrors.UserNotFound,
  message: "Product not Found."
}