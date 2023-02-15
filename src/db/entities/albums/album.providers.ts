import { DataSource } from 'typeorm';
import { ALBUM_REPOSITORY } from './constants';
import { DATA_SOURCE } from '../../constants';
import { Album } from './album';

export default [
  {
    provide: ALBUM_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Album),
    inject: [DATA_SOURCE],
  },
];
