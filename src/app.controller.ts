import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './entities/auth/decorators/Public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
