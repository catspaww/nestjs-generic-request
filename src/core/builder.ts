import { FilterBy, OrderBy, RequestBuilderResult } from '../types/builder.type';
import { EntityKey, Type } from '../types/common.type';
export class RequestBuilder<Entity> {
  private fields?: EntityKey<Entity>[];

  private filters?: FilterBy<Entity>[];

  private sorts?: OrderBy<Entity>;

  private take: number;

  private skip: number;

  private constructor() {
    this.fields = [];
    this.sorts = {} as OrderBy<Entity>;
    this.filters = [];
    this.take = 10;
    this.skip = 0;
  }

  static create<Entity = any>(classRef?: Type<Entity>): RequestBuilder<Entity> {
    return new RequestBuilder<Entity>();
  }

  setFields(fields: EntityKey<Entity>[]): this {
    this.fields = fields;
    return this;
  }

  setFilters(filters: FilterBy<Entity>[]): this {
    this.filters = filters;
    return this;
  }

  setSort(sorts: OrderBy<Entity>): this {
    this.sorts = sorts;
    return this;
  }

  setLimit(take: number): this {
    this.take = take;
    return this;
  }

  setPage(page: number): this {
    this.skip = (page - 1) * this.take;
    return this;
  }

  addFields(fields: EntityKey<Entity>[]): this {
    this.fields.push(...fields);
    return this;
  }

  addFilters(filters: FilterBy<Entity>[]): this {
    this.filters.push(...filters);
    return this;
  }

  addSorts(sorts: OrderBy<Entity>): this {
    Object.assign(this.sorts, sorts);
    return this;
  }

  build(): RequestBuilderResult<Entity> {
    return {
      skip: this.skip,
      take: this.take,
      fields: this.fields,
      filters: this.filters,
      sorts: this.sorts,
    };
  }
}
