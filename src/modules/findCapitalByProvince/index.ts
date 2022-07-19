import { states } from './states';
import  halfSpace  from "../halfSpace";
import  toPersianChars  from "../toPersianChars"

/**
 * Returns the capital name of province you enter
 * @param {string} state
 * @returns {string} capital name
 */

export const findCapitalByProvince = (state: string) => {
  const arrayStates = Object.keys(states);
  
  for (let index in arrayStates) { 
    if (toPersianChars(halfSpace(state)) === toPersianChars(halfSpace(arrayStates[index]))) {
     return states[arrayStates[index]];
    }
  }
  throw 'noProvinceFound'
}

export default findCapitalByProvince;