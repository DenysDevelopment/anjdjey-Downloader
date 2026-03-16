import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

interface ValidationSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

interface ValidationErrorDetail {
  path: (string | number)[];
  message: string;
}

export function validate(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: ValidationErrorDetail[] = [];

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (result.success) {
        req.params = result.data as typeof req.params;
      } else {
        collectErrors(result.error, 'params', errors);
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        collectErrors(result.error, 'query', errors);
      }
    }

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (result.success) {
        req.body = result.data;
      } else {
        collectErrors(result.error, 'body', errors);
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Ошибка валидации',
          details: errors,
        },
      });
      return;
    }

    next();
  };
}

function collectErrors(
  zodError: ZodError,
  source: string,
  errors: ValidationErrorDetail[],
): void {
  for (const issue of zodError.issues) {
    errors.push({
      path: [source, ...issue.path.map((p) => (typeof p === 'symbol' ? String(p) : p))],
      message: issue.message,
    });
  }
}
