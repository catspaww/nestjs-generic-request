import { BuilderOperator } from '../types/builder.type';
import { ValidationOptions, ValidateBy, isIn, buildMessage } from 'class-validator';

export function ValueChecker(
  validateFunc: (...agrs: any[]) => boolean,
  valueOptions: any,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: 'valueChecker',
      constraints: [valueOptions],
      validator: {
        validate: (value, args): boolean => validateFunc(value.value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property is not valid constraints',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

export function TypeChecker(
  validateFunc: (...agrs: any[]) => boolean,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: 'typeChecker',
      validator: {
        validate: (value, args): boolean => validateFunc(value.value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property is invalid input type',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

export function InOperators(
  values: readonly BuilderOperator[],
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: 'inOperators',
      constraints: [values],
      validator: {
        validate: (value, args): boolean => isIn(value.operator, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must be one of the following values: $constraint1',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
