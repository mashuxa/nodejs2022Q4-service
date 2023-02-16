import { DataSource } from 'typeorm';
import { USER_REPOSITORY } from './constants';
import { DATA_SOURCE } from '../../db/constants';
import { UserEntity } from './user.entity';

export default [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [DATA_SOURCE],
  },
];
