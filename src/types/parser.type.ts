import { BuilderOperator } from './builder.type';
import { Equal, Not, MoreThan, LessThan, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';

export const ParserOperator = {
  [BuilderOperator.BETWEEN]: Between,
  [BuilderOperator.EQUAL]: Equal,
  [BuilderOperator.GREATER_THAN]: MoreThan,
  [BuilderOperator.GREATER_THAN_OR_EQUAL]: MoreThanOrEqual,
  [BuilderOperator.LOWER_THAN]: LessThan,
  [BuilderOperator.NOT_EQUAL]: Not,
  [BuilderOperator.LOWER_THAN_OR_EQUAL]: LessThanOrEqual,
};
