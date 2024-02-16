import { LCD_BACKLIGHT, LCD_I2C_ADDRESS } from "src/app/constants";
import { i2c_bus } from "./i2c_bus";
import { handleI2CError } from "./handleI2CError";

export const backLightControl = (condition: boolean) => {
    if (condition) {
      i2c_bus.i2cWrite(
        LCD_I2C_ADDRESS,
        1,
        Buffer.from([LCD_BACKLIGHT]), handleI2CError
      );
    } else {
      i2c_bus.i2cWrite(LCD_I2C_ADDRESS, 1, Buffer.from([0]), handleI2CError);
    }
  }