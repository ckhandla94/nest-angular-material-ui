export enum OrderType {
  DESC = 'DESC',
  ASC = 'ASC'
}

/**
 * Describes generic pagination params
 */
export abstract class PaginationParams<T> {
	/**
	 * Pagination limit
	 */
  readonly take = 10;

	/**
	 * Pagination offset
	 */
  readonly skip = 0;

	/**
	 * OrderBy
	 */
  abstract readonly order?: { [P in keyof T]?: OrderType };
}


/**
 * Generic pagination interface
 */
export interface IPagination<T> {
  /**
   * Items included in the current listing
   */
  readonly items: T[];

  /**
   * Total number of available items
   */
  readonly total: number;
}

