import { Schema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware(schema: Schema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);

    if (validationResult.success) {
      next();
    } else {
      const errorMessages = (validationResult.error as ZodError).issues.map(
        (issue) => {
          const field = issue.path.join(".");
          return `${field} ${issue.message}`;
        }
      );

      res
        .status(400)
        .json({ message: "Validation error", errors: errorMessages });
    }
  };
}
