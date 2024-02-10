import { Gpio } from 'onoff';

export const getGpioControls = (): Gpio[] => {
  const led = new Gpio(4, 'out');
  const button = new Gpio(17, 'in', 'both');

  return [led, button];
};
