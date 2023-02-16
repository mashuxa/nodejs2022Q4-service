import { DataSource } from 'typeorm';
import { ALBUM_REPOSITORY } from './constants';
import { DATA_SOURCE } from '../../db/constants';
import { AlbumEntity } from './album.entity';

export default [
  {
    provide: ALBUM_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AlbumEntity),
    inject: [DATA_SOURCE],
  },
];
