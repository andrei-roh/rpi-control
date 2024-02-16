import { LCD_BACKLIGHT, LCD_ENABLE, LCD_I2C_ADDRESS } from "src/app/constants";
import { handleI2CError } from "./handleI2CError";
import { i2c_bus } from "./i2c_bus";

export const rawTimedWrite = (dataInUpperNibble: number, cmndOrChar: number) => {
    let cleanData = dataInUpperNibble & 0xf0;
    let cleanRS = cmndOrChar & 0x1;
  
    i2c_bus.i2cWrite(
      LCD_I2C_ADDRESS,
      1,
      Buffer.from([cleanData | LCD_BACKLIGHT | cleanRS]),
      handleI2CError
    );
    i2c_bus.i2cWrite(
      LCD_I2C_ADDRESS,
      1,
      Buffer.from([cleanData | LCD_BACKLIGHT | LCD_ENABLE | cleanRS]),
      handleI2CError
    );
    i2c_bus.i2cWrite(
      LCD_I2C_ADDRESS,
      1,
      Buffer.from([cleanData | LCD_BACKLIGHT | cleanRS]),
      handleI2CError
    );
    setTimeout(() => {}, 200)
  }