import * as i2c from 'i2c-bus';
import { initializeLCD } from './initializeLCD';
import { I2C_BUS_NUMBER } from 'src/app/constants';

export const i2c_bus = i2c.open(I2C_BUS_NUMBER, (err) => {
    if (err) {
      console.log("Error opening I2C bus: ", err);
      process.exit(1);
    }
  
    initializeLCD();
  });