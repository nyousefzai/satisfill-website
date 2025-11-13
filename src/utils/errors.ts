interface ValidationError {
  target: { email?: string; password?: string };
  value: string;
  property: string;
  children: any[];
  constraints: Record<string, string>;
}

interface ErrorResponse {
  message: ValidationError[];
  error: string;
  statusCode: number;
}

export function getErrorMessage(
  errorResponse: ErrorResponse
): Record<string, string> {
  const errors: Record<string, string> = {};

  errorResponse.message.forEach((error) => {
    const { property, constraints } = error;
    if (constraints) {
      errors[property] = Object.values(constraints).join(", ");
    }
  });

  return errors;
}

/**
 * Handles errors and parses readable error to the user.
 *
 * @example
 * onError: (error: any) => {
 *   notification.error({
 *     message: parseError(error.response.data, "Something went wrong"),
 *   });
 * }
 *
 * @param error - The error object containing response data.
 */
export function parseError(
  errorResponse: any,
  defaultMessage?: string
): string {
  const err = errorResponse as ErrorResponse;
  const errors: string[] = [];

  if (typeof err === "string") {
    return err;
  }

  if (typeof err?.message === "string") {
    return err?.message;
  }

  err?.message?.forEach((error) => {
    const { constraints } = error;
    if (constraints) {
      errors.push(
        ...Object.values(constraints).map(
          (msg) => msg.charAt(0).toUpperCase() + msg.slice(1)
        )
      );
    }
  });

  if (errors.length === 0) {
    return defaultMessage ?? "";
  }

  return errors.join(", ");
}
