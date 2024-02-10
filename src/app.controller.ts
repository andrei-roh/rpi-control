import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('led/control/use')
  pushButton(): string {
    return this.appService.pushButton();
  }

  @Get('led/control/stop')
  stopPushingButton(): string {
    return this.appService.stopPushingButton();
  }

  @Get('led/flowing/use')
  flowingLeds(): string {
    return this.appService.flowingLeds();
  }

  @Get('led/flowing/stop')
  stopFlowingLeds(): string {
    return this.appService.stopFlowingLeds();
  }
}
