import { Decimal } from "@prisma/client/runtime/library";
import { RefinementCtx, z } from "zod";

const transformDecimal = (value: string, ctx: RefinementCtx) => {
  try {
    return new Decimal(value);
  } catch {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not a valid decimal number",
    });
    return z.NEVER;
  }
};

export default transformDecimal;
