// Helper function to validate non-negative numbers
export function validateNumberValue(value: number, valueName: string): void {
  // Capitalize first letter
  valueName = valueName.charAt(0).toUpperCase() + valueName.slice(1);

  // validate if number is 0 or more
  if (value < 0) { throw new Error(`${valueName} cannot be less than zero.`); }
  // validate if number is not Infinity or NaN
  if (!isFinite(value)) { throw new Error(`${valueName} cannot be less than zero.`); }
}
