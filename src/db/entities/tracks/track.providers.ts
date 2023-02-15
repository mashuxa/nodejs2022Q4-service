import { DataSource } from 'typeorm';
import { TRACK_REPOSITORY } from './constants';
import { DATA_SOURCE } from '../../constants';
import { Track } from './track';

export default [
  {
    provide: TRACK_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Track),
    inject: [DATA_SOURCE],
  },
];
