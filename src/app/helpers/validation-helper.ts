import { AbstractControl } from '@angular/forms';

// Helper function to validate non-negative numbers
export class ValidationHelper {
  public static validateNumberValue(value: number, valueName: string, pattern: ValidationPattern): void {
    // Capitalize first letter
    valueName = valueName.charAt(0).toUpperCase() + valueName.slice(1);

    switch (pattern) {
      case ValidationPattern.NonNegative:
        // validate if number is not less than zero
        if (value < 0) { throw new Error(`${valueName} cannot be less than zero.`); }
        // validate if number is not Infinity or NaN
        if (!isFinite(value)) { throw new Error(`${valueName} cannot be less than zero.`); }
        break;

      case ValidationPattern.Positive:
        // validate if number is not less than zero
        if (value <= 0) { throw new Error(`${valueName} must be more than zero.`); }
        // validate if number is not Infinity or NaN
        if (!isFinite(value)) { throw new Error(`${valueName} must be more than zero.`); }
        break;
    }
  }

  public static getNumericValue(control: AbstractControl) : number | null {
    return control.valid ? parseFloat(control.value) : null;
  }

  public static getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }
}

export enum ValidationPattern {
  NonNegative,
  Positive
}
