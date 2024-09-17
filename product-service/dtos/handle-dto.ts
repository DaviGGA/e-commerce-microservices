import { z } from "zod";
import { HandleResponse, err, success } from "../utils/return-pattern";
import { APIErrors } from "../errors/api-errors";

export function handleDTO<DTO, Schema extends z.ZodRawShape>
(
  data: unknown,
  schema: z.ZodObject<Schema>
): HandleResponse<DTO> 
{
  const validateSchema = schema.safeParse(data) as z.SafeParseReturnType<unknown, DTO>;
  if (validateSchema.error) {
    return err({
      message: getZodMessages(validateSchema.error.issues),
      stack: "",
      name: APIErrors.ZodParseError
    })
  }

  return success(validateSchema.data)
}

function getZodMessages(issues: z.ZodIssue[]) {
  return issues
    .map(issue => issue.message)
    .join(", ")
}