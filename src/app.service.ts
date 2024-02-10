import { Injectable } from '@nestjs/common';
import { Message } from 'src/types';
import { getGpioControls } from 'src/utils';

@Injectable()
export class AppService {
  getHello(): string {
    const [led, button] = getGpioControls();

    led.writeSync(0);
    led.unexport();
    button.unexport();

    return Message.Start;
  }

  pushButton(): string {
    const [led, button] = getGpioControls();

    button.watch((err, value) => {
      if (err) {
        console.error(err);

        return;
      }

      led.writeSync(value);
    });

    return Message.Control;
  }
}
