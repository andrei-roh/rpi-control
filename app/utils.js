import * as i2c from 'i2c-bus';
import {
    I2C_BUS_NUMBER, 
    LCD_BACKLIGHT, 
    LCD_ENABLE, 
    LCD_I2C_ADDRESS, 
    LCD_REGISTER_SELECT_CHAR, 
    LCD_REGISTER_SELECT_CMND,
    STRING_LENGTH,
  } from './constants.js';

const i2c_bus = i2c.open(I2C_BUS_NUMBER, function (err) {
  if (err) {
    console.log("Error opening I2C bus: ", err);
    process.exit(1);
  }

  initializeLCD();
});

function handleI2CError(err, bytesWritten, buffer) {
    if (err) {
      console.log("Error writing to I2C bus: ", err);
    }
}

function rawTimedWrite(dataInUpperNibble, cmndOrChar) {
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

function initializeLCD() {
  setTimeout(() => {
    rawTimedWrite(0x30, LCD_REGISTER_SELECT_CMND);
    }, 100)

  setTimeout(() => {
    rawTimedWrite(0x30, LCD_REGISTER_SELECT_CMND);
  }, 100)

  setTimeout(() => {
    rawTimedWrite(0x30, LCD_REGISTER_SELECT_CMND);
    rawTimedWrite(0x20, LCD_REGISTER_SELECT_CMND);

    rawTimedWrite(0x20, LCD_REGISTER_SELECT_CMND);

    rawTimedWrite(0x80, LCD_REGISTER_SELECT_CMND);
    rawTimedWrite(0x00, LCD_REGISTER_SELECT_CMND);
    rawTimedWrite(0xc0, LCD_REGISTER_SELECT_CMND);
    rawTimedWrite(0x00, LCD_REGISTER_SELECT_CMND);
    rawTimedWrite(0x10, LCD_REGISTER_SELECT_CMND);
    rawTimedWrite(0x00, LCD_REGISTER_SELECT_CMND);

    rawTimedWrite(0x60, LCD_REGISTER_SELECT_CMND);
  }, 4000)
}

export function positionCursor(line, column) {
  let cleanLine = line & 1;
  let cleanColumn = column & 0xf;
  rawTimedWrite(0x80 | (cleanLine << 6), LCD_REGISTER_SELECT_CMND);
  rawTimedWrite(cleanColumn << 4, LCD_REGISTER_SELECT_CMND);
}

export function writeStringToLCD(stringToDisplay) {
  stringToDisplay.split("").forEach((element) => {
    let dataToSend = element.charCodeAt(0);
    rawTimedWrite(dataToSend & 0xf0, LCD_REGISTER_SELECT_CHAR);
    rawTimedWrite((dataToSend << 4) & 0xf0, LCD_REGISTER_SELECT_CHAR);
  });
}

export function backLightControl(condition) {
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

export function getEmptyString() {
  let empty = [];
  let strLenght = STRING_LENGTH;

  while (strLenght > 0) {
    empty.push(' ')
    strLenght -= 1;
  }

 return empty.join('');
}