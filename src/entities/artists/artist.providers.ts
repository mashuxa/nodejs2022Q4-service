import { DataSource } from 'typeorm';
import { ARTIST_REPOSITORY } from './constants';
import { DATA_SOURCE } from '../../db/constants';
import { ArtistEntity } from './artist.entity';

export default [
  {
    provide: ARTIST_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ArtistEntity),
    inject: [DATA_SOURCE],
  },
];
