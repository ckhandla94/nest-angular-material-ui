import { Injectable } from '@nestjs/common';
import { getConnection, getRepository, ConnectionOptions, createConnection } from 'typeorm';
import { Entities } from './entities';
import * as chalk from 'chalk';
import { ConfigService } from '@nestjs/config';
import { createDefaultUsers } from './users/user.seeder';

@Injectable()
export class SeederService {
    connection: any;
    log = console.log;

    constructor(
        private configService: ConfigService
    ) {

    }

    async run() {
        try {
            // Connect to database
            await this.createConnection();

            // Reset database to start with new, fresh data
            await this.resetDatabase();

            // Seed data with mock / fake data
            await this.seedData();

            console.log('Database Seed completed');
        } catch (error) {
            this.handleError(error);
        }
    }

    seedData() {
        createDefaultUsers(this.connection);
    }

    private async createConnection() {
        try {
            this.connection = getConnection();
        } catch (error) {
            this.log('NOTE: DATABASE CONNECTION DOES NOT EXIST YET. NEW ONE WILL BE CREATED!');
        }

        if (!this.connection || !this.connection.isConnected) {
            try {
                this.log(chalk.green(`CONNECTING TO DATABASE ...`));

                this.connection = await createConnection({
                    ...this.configService.get('database'),
                    entities: Entities,
                } as ConnectionOptions);
            } catch (error) {
                this.handleError(error, 'Unable to connect to database');
            }
        }
    }

    private async getEntities() {
        const entities = [];
        try {
            this.connection.entityMetadatas.forEach((entity) =>
                entities.push({
                    name: entity.name,
                    tableName: entity.tableName
                })
            );
            return entities;
        } catch (error) {
            this.handleError(error, 'Unable to retrieve database metadata');
        }
    }

    private async resetDatabase() {
        const entities = await this.getEntities();
        await this.cleanAll(entities);
        //await loadAll(entities);
        this.log(chalk.green(`✅ RESET DATABASE SUCCESSFUL`));
    }

    private async cleanAll(entities) {
        try {
            for (const entity of entities) {
                const repository = getRepository(entity.name);
                await repository.query(
                    `TRUNCATE ${entity.tableName};`
                );
            }
        } catch (error) {
            this.handleError(error, 'Unable to clean database');
        }
    }

    private handleError(error: Error, message?: string): void {
        this.log(
            chalk.bgRed(
                `🛑 ERROR: ${message ? message + '-> ' : ''} ${
                error ? error.message : ''
                }`
            )
        );
        throw error;
    }

}
