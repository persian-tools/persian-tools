import verifyCardNumber from './verifyCardNumber';
import banksCode from '../dummy/banksCode.json';

function getBankNameFromCardNumber(digits) {
    if (digits) {
        if (verifyCardNumber(digits)) {
            let code = digits.toString().substr(0, 6);
            try {
                let findBank = banksCode.find(bank => bank.code === code);

                if (findBank) {
                    return findBank.name;
                }

                throw new Error('Not found any matches bank with your card number');
            } catch (error) {
                return error;
            }
        } else {
            return { error: -1, message: 'Invalid Card-Number!' };
        }
    }
}

export default getBankNameFromCardNumber;
