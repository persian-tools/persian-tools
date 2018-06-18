import { digitsFaToEn, isPersian } from '../';

/**
 * Add Commas into number
 * @method addCommas
 * @param   {Number}  number [input number, like this: 300000]
 * @return  {String}  		 [returned String, like this: 30,000]
 */
const addCommas = number => {
    number = '' + number;
    number = isPersian(number) ? digitsFaToEn(number) : number;

    return number && number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export default addCommas;
