import { DBEntity } from './DBEntity';
import { User } from '../../entities/users/interface/user.interface';

export class DBUsers extends DBEntity<User> {
  constructor() {
    super();
  }
}
