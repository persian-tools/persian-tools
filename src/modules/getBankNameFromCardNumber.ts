import banksCode from "../dummy/banksCode.json";

interface IBank {
	code: string;
	name: string;
}

function getBankNameFromCardNumber(digits: number): string | null | undefined {
	if (!digits) return;

	if (digits && digits.toString().length === 16) {
		let code = digits.toString().substr(0, 6);
		let findBank = (banksCode as IBank[]).find(bank => bank.code === code);

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
