import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class AllowedDateConstraint implements ValidatorConstraintInterface {
  validate(dateExpired: any) {
    if (!(dateExpired instanceof Date)) {
      return false;
    }
    const currentDate = new Date();
    const expirationDate = new Date(dateExpired);
    return expirationDate > currentDate;
  }

  defaultMessage() {
    return 'The date entered must be a date after the current one';
  }
}

export function AllowedDate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: AllowedDateConstraint,
    });
  };
}
