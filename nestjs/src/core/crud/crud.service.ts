
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
	DeepPartial,
	DeleteResult,
	FindConditions,
	FindManyOptions,
	FindOneOptions,
	Repository,
	UpdateResult
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { mergeMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Base } from '../entities/base';
import { ICrudService } from './icrud.service';
import { IPagination } from './pagination';
import * as bcrypt from 'bcryptjs';
import { ITryRequest } from './try-request';

export abstract class CrudService<T extends Base> implements ICrudService<T> {
	
	protected constructor(protected readonly repository: Repository<T>) {
		
	}

	public async count(filter?: FindManyOptions<T>): Promise<number> {
		return await this.repository.count(filter);
	}

	public async findAll(filter?: FindManyOptions<T>): Promise<IPagination<T>> {
		const total = await this.repository.count(filter);
		const items = await this.repository.find(filter);
		return { items, total };
	}

	public async findOneOrFail(
		id: string | number | FindOneOptions<T> | FindConditions<T>,
		options?: FindOneOptions<T>
	): Promise<ITryRequest> {
		try {
			const record = await this.repository.findOneOrFail(
				id as any,
				options
			);
			return {
				success: true,
				record
			};
		} catch (error) {
			return {
				success: false,
				error
			};
		}
	}

	public async findOne(
		id: string | number | FindOneOptions<T> | FindConditions<T>,
		options?: FindOneOptions<T>
	): Promise<T> {
		const record = await this.repository.findOne(id as any, options);
		if (!record) {
			throw new NotFoundException(`The requested record was not found`);
		}
		return record;
	}

	public async create(entity: DeepPartial<T>, ...options: any[]): Promise<T> {
		const obj = this.repository.create(entity);
		try {
			return await this.repository.save(obj as any);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	async getPasswordHash(password: string): Promise<string> {
		return bcrypt.hash(password, process.env.APP_KEY);
	}

	public async update(
		id: string | number | FindConditions<T>,
		partialEntity: QueryDeepPartialEntity<T>,
		...options: any[]
	): Promise<UpdateResult | T> {
		try {
			// method getPasswordHash is copied from AuthService
			// try if can import somehow the service and use its method

			if (partialEntity['hash']) {
				const hashPassword = await this.getPasswordHash(
					partialEntity['hash']
				);
				partialEntity['hash'] = hashPassword;
			}

			return await this.repository.update(id, partialEntity);
		} catch (err) {
			throw new BadRequestException(err);
		}
	}

	public async delete(
		criteria: string | number | FindConditions<T>,
		...options: any[]
	): Promise<DeleteResult> {
		try {
			return await this.repository.delete(criteria);
		} catch (err) {
			throw new NotFoundException(`The record was not found`, err);
		}
	}

	/**
	 * e.g., findOneById(id).pipe(map(entity => entity.id), entityNotFound())
	 */
	private entityNotFound() {
		return (stream$) =>
			stream$.pipe(
				mergeMap((signal) => {
					if (!signal) {
						return throwError(
							new NotFoundException(
								`The requested record was not found`
							)
						);
					}
					return of(signal);
				})
			);
	}
}
