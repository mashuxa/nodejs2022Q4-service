import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth.service';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const token = context
      .switchToHttp()
      .getRequest()
      .headers.authorization.replace('Bearer ', '');

    await this.authService.verifyRefreshToken(token);

    return true;
  }
}
