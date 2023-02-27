import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth.service';
import errorMessages from '../../../../constants/errorMessages';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.replace('Bearer ', '');

    if (!request.body.refreshToken) {
      throw new HttpException(
        errorMessages.unauthorized,
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.authService.verifyRefreshToken(token);

    return true;
  }
}
