import { Gpio } from 'onoff';

export const getLedControl = (): Gpio[] => {
  const led04 = new Gpio(4, 'out');
  const button = new Gpio(17, 'in', 'both');

  return [led04, button];
};

export const getFlowingControls = (): Gpio[] => {
  const led04 = new Gpio(4, 'out');
  const led17 = new Gpio(17, 'out');
  const led27 = new Gpio(27, 'out');
  const led22 = new Gpio(22, 'out');
  const led18 = new Gpio(18, 'out');
  const led23 = new Gpio(23, 'out');
  const led24 = new Gpio(24, 'out');
  const led25 = new Gpio(25, 'out');

  return [led04, led17, led27, led22, led18, led23, led24, led25];
};
