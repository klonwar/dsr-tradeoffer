import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const IsPhotoPath = <T>(validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhotoPathConstraint,
    });
  };
};

@ValidatorConstraint({ name: `IsPhotoPath` })
export class IsPhotoPathConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return value.endsWith(`.jpg`) || value.endsWith(`.png`);
  }

  defaultMessage(args: ValidationArguments) {
    const [constraintProperty]: Date[] = args.constraints;
    return `${args.property} must not be bigger than ${constraintProperty}`;
  }
}
