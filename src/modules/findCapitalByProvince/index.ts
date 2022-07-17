import { states } from './states';

/**
 * Returns the capital name of state you enter
 * @param {string} state
 * @returns {string} capital name
 */

export const findCapitalByProvince = (state: string) => {
  const arrayStates = Object.keys(states);
  
  for (let index = 0; index < arrayStates.length; index++) {
    if (state === arrayStates[index]) {
     return states[arrayStates[index]];
    }
  }
  return '404'
}

export default findCapitalByProvince;
