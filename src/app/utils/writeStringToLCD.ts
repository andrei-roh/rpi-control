import { LCD_REGISTER_SELECT_CHAR } from "src/app/constants";
import { rawTimedWrite } from "./rawTimedWrite";

export const writeStringToLCD = (stringToDisplay: string) => {
    stringToDisplay.split("").forEach((element) => {
      let dataToSend = element.charCodeAt(0);
      rawTimedWrite(dataToSend & 0xf0, LCD_REGISTER_SELECT_CHAR);
      rawTimedWrite((dataToSend << 4) & 0xf0, LCD_REGISTER_SELECT_CHAR);
    });
  }