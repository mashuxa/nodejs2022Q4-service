import { DATA_SOURCE } from './constants';
import dataSource from './dataSource';

export default {
  provide: DATA_SOURCE,
  useFactory: async () => dataSource.initialize(),
};
