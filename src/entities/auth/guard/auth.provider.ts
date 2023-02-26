import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

export default {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
