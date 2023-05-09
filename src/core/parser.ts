import { BuilderOperator, FilterBy, OrderBy, RequestBuilderResult } from '../types/builder.type';
import { EntityKey, Type } from '../types/common.type';
import { FindManyOptions, FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { ParserOperator } from '../types/parser.type';

export class RequestParser<Entity = any> {
  private fields?: EntityKey<Entity>[];

  private filters?: FilterBy<Entity>[];

  private sorts?: OrderBy<Entity>;

  private take: number;

  private skip: number;

  private constructor(data: RequestBuilderResult<Entity>) {
    Object.assign(this, data);
  }

  static initialize<Entity>(
    classRef: Type<Entity>,
    data: RequestBuilderResult<Entity>,
  ): RequestParser<Entity> {
    return new RequestParser<Entity>(data);
  }

  parse(): FindManyOptions<Entity> {
    const where: FindOptionsWhere<Entity>[] = this.filters.reduce((arr, item) => {
      const keys = Object.keys(item).reduce((obj, key) => {
        const filter = item[key];
        const value = Array.isArray(filter['value']) ? filter['value'] : [filter['value']];

        Object.assign(obj, { [key]: ParserOperator[filter['operator']](...value) });

        return obj;
      }, {});

      arr.push(keys);

      return arr;
    }, []);

    return {
      skip: this.skip,
      take: this.take,
      select: this.fields,
      order: this.sorts as FindOptionsOrder<Entity>,
      where,
    };
  }
}
