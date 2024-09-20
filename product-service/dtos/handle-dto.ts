import { z } from "zod";
import { HandleResponse, err, success, Response } from "../utils/return-pattern";
import { APIErrors } from "../errors/api-errors";

export function handleDTO<DTO, Schema extends z.ZodRawShape>
(
  data: unknown,
  schema: z.ZodObject<Schema>
): Response<DTO> 
{
  const validateSchema = schema.safeParse(data) as z.SafeParseReturnType<unknown, DTO>;
  if (validateSchema.error) {
    return Response.err({
      message: getZodMessages(validateSchema.error.issues),
      stack: "",
      name: APIErrors.ZodParseError
    })
  }

  return Response.success(validateSchema.data)
}

function getZodMessages(issues: z.ZodIssue[]) {
  return issues
    .map(issue => issue.message)
    .join(", ")
}