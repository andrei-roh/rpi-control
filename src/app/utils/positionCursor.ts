import { LCD_REGISTER_SELECT_CMND } from "src/app/constants";
import { rawTimedWrite } from "./rawTimedWrite";

export const positionCursor = (line: number, column: number) => {
    let cleanLine = line & 1;
    let cleanColumn = column & 0xf;
    rawTimedWrite(0x80 | (cleanLine << 6), LCD_REGISTER_SELECT_CMND);
    rawTimedWrite(cleanColumn << 4, LCD_REGISTER_SELECT_CMND);
  }
  