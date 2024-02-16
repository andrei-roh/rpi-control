import { LCD_LINE1, LCD_LINE2 } from "src/app/constants";
import { backLightControl } from "./backLightControl";
import { getEmptyString } from "./getEmptyString";
import { positionCursor } from "./positionCursor";
import { writeStringToLCD } from "./writeStringToLCD";

const date = new Date();
const emptyString = getEmptyString();

export const rootReducer = (url: string): void => {
    switch (url) {
      case "/lcd_off":
        backLightControl(false);
        url = "/";
        break;
      case "/lcd_on":
        backLightControl(true);
        url = "/";
        break;
      case "/show_date":
        positionCursor(LCD_LINE1, 0);
        writeStringToLCD(`Date: ${date.toLocaleDateString()}`);
        positionCursor(LCD_LINE2, 0);
        writeStringToLCD(emptyString);
        url = "/";
        break;
      case "/show_time":
        positionCursor(LCD_LINE1, 0);
        writeStringToLCD(`Time: ${date.toLocaleTimeString()}`);
        positionCursor(LCD_LINE2, 0);
        writeStringToLCD(emptyString);
        url = "/";
        break;
      case "/show_date_and_time":
        positionCursor(LCD_LINE1, 0);
        writeStringToLCD(`Date: ${date.toLocaleDateString()}`);
        positionCursor(LCD_LINE2, 0);
        writeStringToLCD(`Time: ${date.toLocaleTimeString()}`);
        url = "/";
        break;
      case "/clear":
        positionCursor(LCD_LINE1, 0);
        writeStringToLCD(emptyString);
        positionCursor(LCD_LINE2, 0);
        writeStringToLCD(emptyString);
        url = "/";
        break;
      default:
      break;
    }
}