import {
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	HttpStatus,
	HttpCode
} from '@nestjs/common';
import { Base } from '../entities/base';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ICrudService } from './icrud.service';
import { IPagination, PaginationParams } from './pagination';

export abstract class CrudController<T extends Base> {
	protected constructor(private readonly crudService: ICrudService<T>) {}

	@Get()
	async findAll(filter?: PaginationParams<T>): Promise<IPagination<T>> {
		return this.crudService.findAll(filter);
	}

	@Get(':id')
	async findById(@Param('id') id: string): Promise<T> {
		return this.crudService.findOne(id);
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(
		@Body() entity: DeepPartial<T>,
		...options: any[]
	): Promise<T> {
		return this.crudService.create(entity);
	}

	@HttpCode(HttpStatus.ACCEPTED)
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() entity: QueryDeepPartialEntity<T>,
		...options: any[]
	): Promise<any> {
		return this.crudService.update(id, entity);
	}

	@HttpCode(HttpStatus.ACCEPTED)
	@Delete(':id')
	async delete(@Param('id') id: string, ...options: any[]): Promise<any> {
		return this.crudService.delete(id);
	}
}
