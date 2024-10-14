import { z, ZodError } from "zod";
import * as E from "fp-ts/Either";
import { APIErrors } from "../errors/api-errors";
import { pipe } from "fp-ts/lib/function";
import { makeMatch } from "ts-adt/MakeADT";
import { Err } from "../utils/return-pattern";

export function handleDTO<DTO, Schema extends z.ZodRawShape>
(
  data: unknown,
  schema: z.ZodObject<Schema>
): E.Either<Err, DTO> 
{
  //const validateSchema = schema.safeParse(data) as z.SafeParseReturnType<unknown, DTO>;
  const validateSchemaTK = E.tryCatch(
    () => schema.parse(data),
    e => {
      return e instanceof ZodError ?
      e as ZodError : new Error(String(e)) 
    }
  )

  const matchError = makeMatch("name");

  return pipe(
    validateSchemaTK,
    E.bimap(
      matchError({
        ZodError: e => ({message: e.message, stack: e.stack, name: APIErrors.ZodParseError}),
        Error: e => ({message: e.message, stack: e.stack, name: APIErrors.InternalServerError})
      }),
      data => data as DTO
    )
  )
}

function getZodMessages(issues: z.ZodIssue[]) {
  return issues
    .map(issue => issue.message)
    .join(", ")
}