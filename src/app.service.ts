import { Injectable } from '@nestjs/common';
import { Direction, Message } from 'src/types';
import { getFlowingControls, getLedControl } from 'src/utils';

@Injectable()
export class AppService {
  flowInterwal = null;

  getHello(): string {
    return Message.ServiceStart;
  }

  pushButton(): string {
    const [led04, button] = getLedControl();

    button.watch((err, value) => {
      if (err) {
        console.error(err);

        return;
      }

      led04.writeSync(value);
    });

    return Message.ControlUse;
  }

  stopPushingButton(): string {
    const [led04, button] = getLedControl();

    led04.writeSync(0);
    led04.unexport();
    button.unexport();

    return Message.ControlStop;
  }

  flowingLeds(): string {
    let indexCount = 0;
    let direction = Direction.Up;
    const leds = getFlowingControls();

    const getFlowing = () => {
      leds.forEach((currentValue) => {
        currentValue.writeSync(0);
      });

      if (indexCount === 0) {
        direction = Direction.Up;
      }

      if (indexCount >= leds.length) {
        direction = Direction.Down;
      }

      if (direction === Direction.Down) {
        indexCount -= 1;
      }

      leds[indexCount].writeSync(1);

      if (direction === Direction.Up) {
        indexCount += 1;
      }
    };

    this.flowInterwal = setInterval(getFlowing, 100);

    return Message.FlowingUse;
  }

  stopFlowingLeds(): string {
    clearInterval(this.flowInterwal);
    const leds = getFlowingControls();

    leds.forEach((currentValue) => {
      currentValue.writeSync(0);
      currentValue.unexport();
    });

    return Message.FlowingStop;
  }
}
