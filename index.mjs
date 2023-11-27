
import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import {
  HTTP_PORT, 
  LCD_LINE1, 
  LCD_LINE2, 
} from './app/constants.js';
import { backLightControl, getEmptyString, positionCursor, writeStringToLCD } from './app/utils.js';

const date = new Date();
const emptyString = getEmptyString();

const httpServer = http.createServer(function (req, res) {
  switch (req.url) {
    case "/board_diode_status":
      const status = parseInt(fs.readFileSync('/sys/class/leds/PWR/brightness', { encoding:'utf8', flag:'r' }), 10);
      res.writeHead(200);
      res.end(JSON.stringify({ status }));
      break;
    case "/board_diode_off":
      fs.writeFileSync('/sys/class/leds/PWR/brightness', '0');
      req.url = "/";
      break;
    case "/board_diode_on":
      fs.writeFileSync('/sys/class/leds/PWR/brightness', '1');
      req.url = "/";
      break;
    case "/lcd_off":
      backLightControl(false);
      req.url = "/";
      break;
    case "/lcd_on":
      backLightControl(true);
      req.url = "/";
      break;
    case "/show_date":
      positionCursor(LCD_LINE1, 0);
      writeStringToLCD(`Date: ${date.toLocaleDateString()}`);
      positionCursor(LCD_LINE2, 0);
      writeStringToLCD(emptyString);
      req.url = "/";
      break;
    case "/show_time":
      positionCursor(LCD_LINE1, 0);
      writeStringToLCD(`Time: ${date.toLocaleTimeString()}`);
      positionCursor(LCD_LINE2, 0);
      writeStringToLCD(emptyString);
      req.url = "/";
      break;
    case "/show_date_and_time":
      positionCursor(LCD_LINE1, 0);
      writeStringToLCD(`Date: ${date.toLocaleDateString()}`);
      positionCursor(LCD_LINE2, 0);
      writeStringToLCD(`Time: ${date.toLocaleTimeString()}`);
      req.url = "/";
      break;
    case "/clear":
      positionCursor(LCD_LINE1, 0);
      writeStringToLCD(emptyString);
      positionCursor(LCD_LINE2, 0);
      writeStringToLCD(emptyString);
      req.url = "/";
      break;
    default:
    break;
  }

  const __dirname = path.resolve(path.dirname(''));
  const file_path = __dirname + (req.url === '/' ? '/index.html' : req.url);

  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

httpServer.listen(HTTP_PORT);
console.log(`Server started on ${HTTP_PORT} PORT`);
