import { EntityKey } from './common.type';

export enum BuilderOperator {
  EQUAL = '$eq',
  NOT_EQUAL = '$ne',
  GREATER_THAN = '$gt',
  LOWER_THAN = '$lt',
  GREATER_THAN_OR_EQUAL = '$gte',
  LOWER_THAN_OR_EQUAL = '$lte',
  BETWEEN = '$between',
}

export enum SortDir {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type FilterByValue<Entity> =
  | {
      operator: Exclude<BuilderOperator, BuilderOperator.BETWEEN>;
      value: Entity[keyof Entity];
    }
  | {
      operator: BuilderOperator.BETWEEN;
      value: [Entity[keyof Entity], Entity[keyof Entity]];
    };

export type FilterBy<Entity> = {
  [Key in keyof Entity]: FilterByValue<Entity>;
};

export type OrderBy<Entity> = {
  [Key in keyof Entity]: SortDir;
};

export interface RequestBuilderResult<Entity> {
  fields?: EntityKey<Entity>[];

  filters?: FilterBy<Entity>[];

  sorts?: OrderBy<Entity>;

  take: number;

  skip: number;
}
