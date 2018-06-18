import banksCode from "../dummy/banksCode.json";

function getBankNameFromCardNumber(digits) {
	if (digits && digits.length === 6) {
		let code = digits.toString().substr(0, 6);
		let findBank = banksCode.find(bank => bank.code === code);

		if (findBank) {
			return findBank.name;
		} else {
			return null;
		}
	} else {
		return null;
	}
}

export default getBankNameFromCardNumber;
