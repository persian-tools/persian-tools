import banks from "./data.skip.json" assert { type: "json" };

export function getBanksRegex() {
	return banks;
}

export function getIndexedBanksByName() {
	const banksByNameMap = new Map<string, (typeof banks)[0]>();

	banks.forEach((bank) => banksByNameMap.set(bank.bank_name, bank));

	return banksByNameMap;
}

export function getBanksByName(name: string) {
	return getIndexedBanksByName().get(name);
}

export function getIndexBanksByCardNo() {
	const banksByCardNoMap = new Map<number, (typeof banks)[0]>();
	banks.forEach((bank) => bank.card_no && banksByCardNoMap.set(bank.card_no, bank));

	return banksByCardNoMap;
}

export function getIndexedBanksByIbanCode() {
	const banksByIbanMap = new Map<string, (typeof banks)[0]>();

	banks.forEach((bank) => bank.iban && banksByIbanMap.set(bank.iban, bank));

	return banksByIbanMap;
}

export function getBanksByIbanCode(iban: string) {
	return getIndexedBanksByIbanCode().get(iban);
}
