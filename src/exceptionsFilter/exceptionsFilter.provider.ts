import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './exceptionsFilter.filter';

export default {
  provide: APP_FILTER,
  useClass: ExceptionsFilter,
};
