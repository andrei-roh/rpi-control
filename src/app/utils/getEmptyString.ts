import { STRING_LENGTH } from "src/app/constants";

export const getEmptyString = () => {
    let empty = [];
    let strLenght = STRING_LENGTH;
  
    while (strLenght > 0) {
      empty.push(' ')
      strLenght -= 1;
    }
  
   return empty.join('');
  }