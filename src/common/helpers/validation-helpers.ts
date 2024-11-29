interface IntervalValidation {
  fieldName: string;
  minLength: number;
  maxLength: number;
}

interface StringLengthValidation extends IntervalValidation {
  value: string;
}

// interface NumberValidation extends IntervalValidation {
//   value: number;
// }

// interface ArrayValidation extends IntervalValidation {
//   value: any[];
// }

/**
 * Validates the length of a string field against minimum and maximum constraints.
 * @param value - The string value to validate
 * @param fieldName - Name of the field being validated (for error messages)
 * @param minLength - Minimum allowed length (defaults to 0)
 * @param maxLength - Maximum allowed length
 * @returns true if validation passes
 * @throws Error if validation fails with current length information
 */
export function validateStringFieldLength(params: StringLengthValidation): boolean {
  const currentLength = params.value.length;

  if (params.value.length > params.maxLength) {
    throw new Error(
      `The field ${params.fieldName} is ${currentLength} characters long but must be less than or equal to ${params.maxLength} characters`
    );
  }

  if (params.value.length < params.minLength) {
    throw new Error(
      `The field ${params.fieldName} is ${currentLength} characters long but must be at least ${params.minLength} characters`
    );
  }

  return true;
}

/**
 * Validates a string field against a regex pattern.
 * @param value - The string value to validate
 * @param fieldName - Name of the field being validated (for error messages)
 * @param pattern - Regular expression pattern to test against
 * @param customMessage - Optional custom error message
 * @returns true if validation passes
 * @throws Error if validation fails with detailed message
 */
export function validateFieldPattern(
  value: string,
  fieldName: string,
  pattern: RegExp,
  customMessage?: string
): boolean {
  // Input validation
  if (typeof value !== "string") {
    throw new TypeError(`Expected string for ${fieldName}, got ${typeof value}`);
  }

  if (!(pattern instanceof RegExp)) {
    throw new TypeError("Pattern must be a valid regular expression");
  }

  // Pattern validation
  if (!pattern.test(value)) {
    const defaultMessage = `The field ${fieldName} with value "${value}" does not match the required pattern ${pattern}`;
    throw new Error(customMessage || defaultMessage);
  }

  return true;
}
