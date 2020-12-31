import { shebaHashTable, ShebaResult } from "./codes.skip";

class Sheba {
	// Local variables
	private readonly shebaCode: string;
	/**
	 * @public
	 * @since v1.4.2
	 */
	public readonly pattern = /IR[0-9]{24}/;
	/**
	 * @public
	 * @since v1.4.2
	 */
	public readonly pattern_code = /IR[0-9]{2}([0-9]{3})[0-9]{19}/;

	constructor(shebaCode: string) {
		this.shebaCode = shebaCode;
	}

	private iso7064Mod97_10(iban: string): number {
		let remainder = iban,
			block;

		while (remainder.length > 2) {
			block = remainder.slice(0, 9);
			remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
		}

		return parseInt(remainder, 10) % 97;
	}

	public validate(): boolean {
		const $shebaCode = this.shebaCode;

		if ($shebaCode.length !== 26) {
			return false;
		}

		if (!this.pattern.test($shebaCode)) {
			return false;
		}

		const d1 = $shebaCode.charCodeAt(0) - 65 + 10;
		const d2 = $shebaCode.charCodeAt(1) - 65 + 10;

		let newStr = $shebaCode.substr(4);
		newStr += d1.toString() + d2.toString() + $shebaCode.substr(2, 2);

		const remainder = this.iso7064Mod97_10(newStr);

		if (remainder !== 1) {
			return false;
		}

		return true;
	}

	public recognize(): ShebaResult | null {
		const $shebaCode = this.shebaCode;

		if (!this.validate()) {
			return null;
		}

		const res = this.pattern_code.exec($shebaCode);
		const code = res?.[1] ?? "";
		const bank = shebaHashTable[code] as ShebaResult;

		// TODO: we have to generate a valid sheba code which there is no related bank for that number to pass our test.
		if (!bank) {
			return null;
		}

		if (bank.accountNumberAvailable) {
			const data = bank.process?.($shebaCode);
			bank.accountNumber = data?.normal;
			bank.formattedAccountNumber = data?.formatted;
		}

		delete bank.process;

		return bank;
	}
}

export default Sheba;
export * from "./codes.skip";
