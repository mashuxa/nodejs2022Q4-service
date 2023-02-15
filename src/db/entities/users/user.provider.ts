import { DataSource } from 'typeorm';
import { USER_REPOSITORY } from './constants';
import { DATA_SOURCE } from '../../constants';
import { User } from './user';

export default [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
