import { LCD_REGISTER_SELECT_CMND } from "src/app/constants";
import { rawTimedWrite } from "./rawTimedWrite";

export const initializeLCD = () => {
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
  