import { DataSource } from 'typeorm';
import { ARTIST_REPOSITORY } from './constants';
import { DATA_SOURCE } from '../../constants';
import { Artist } from './artist';

export default [
  {
    provide: ARTIST_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Artist),
    inject: [DATA_SOURCE],
  },
];
