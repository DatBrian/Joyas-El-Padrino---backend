import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsEmailOrNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEmailOrNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Verifica si el valor es un correo electrónico o un número
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const numberRegex = /^\d+$/;
          return emailRegex.test(value) || numberRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'El valor debe ser un correo electrónico válido o un número de identificación.';
        },
      },
    });
  };
}
