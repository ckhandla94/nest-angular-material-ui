import { Injectable } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserService } from './users/user.service';

@Injectable()
export class AppService {
  constructor(
    private readonly seedDataService: SeederService,
    private readonly userService: UserService
  ) {
    this.seedDBIfEmpty();
  }

  getHello() {
    return'Welcome to api!' ;
  }

  private async seedDBIfEmpty() {
    const count = await this.userService.count();
    console.log(`Found ${count} users in DB`);
    if (count === 0) {
      await this.seedDataService.run();
    }
  }
}
