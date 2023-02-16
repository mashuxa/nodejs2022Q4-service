import { DataSource } from 'typeorm';
import { FAVORITES_REPOSITORY } from './constants';
import { DATA_SOURCE } from '../../db/constants';
import { FavoritesEntity } from './favorites.entity';

export default [
  {
    provide: FAVORITES_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FavoritesEntity),
    inject: [DATA_SOURCE],
  },
];
