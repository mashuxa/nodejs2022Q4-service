import { DataSource } from 'typeorm';
import { TRACK_REPOSITORY } from './constants';
import { DATA_SOURCE } from '../../db/constants';
import { TrackEntity } from './track.entity';

export default [
  {
    provide: TRACK_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TrackEntity),
    inject: [DATA_SOURCE],
  },
];
