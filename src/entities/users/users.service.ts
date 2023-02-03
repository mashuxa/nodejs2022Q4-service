import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(user: User): User {
    this.users.push(user);

    return user;
  }

  update(id: string, user: User): User {
    const userIndex = this.users.findIndex((value) => value.id === id);

    this.users[userIndex] = user;

    return user;
  }

  remove(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
