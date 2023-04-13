import { shebaMapCodes, ShebaResult } from "./codes.skip";

/**
 * @public
 * @since v1.4.2
 */
export const shebaPattern = /IR[0-9]{24}/;

/**
 * @public
 * @since v1.4.2
 */
export const shebaPatternCode = /IR[0-9]{2}([0-9]{3})[0-9]{19}/;

/**
 * @public
 * @since 1.7.1
 */
export function getShebaInfo(shebaCode: string): ShebaResult | null {
	if (!isShebaValid(shebaCode)) {
		return null;
	}

	const res = shebaPatternCode.exec(shebaCode);
	const codeAsString = res?.[1] ?? "";
	const code = parseInt(codeAsString, 10);
	const bank = {
		...(shebaMapCodes[code] || {}),
	};

	if (bank.accountNumberAvailable) {
		const data = bank.process?.(shebaCode);
		bank.accountNumber = data?.normal;
		bank.formattedAccountNumber = data?.formatted;
	}

	delete bank.process;
	return bank;
}

/**
 * @private
 * @since 1.7.1
 */
export const shebaIso7064Mod97 = (iban: string): number => {
	let remainder = iban;
	let block;

	while (remainder.length > 2) {
		block = remainder.slice(0, 9);
		remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
	}

	return parseInt(remainder, 10) % 97;
};

/**
 * @public
 * @since 1.7.1
 */
export function isShebaValid(shebaCode: string): boolean {
	shebaCode = shebaCode.toUpperCase();
	if (!shebaCode.startsWith("IR")) {
		shebaCode = `IR${shebaCode}`;
	}
	if (shebaCode.length !== 26 || !shebaPattern.test(shebaCode)) {
		return false;
	}

	const d1 = shebaCode.charCodeAt(0) - 65 + 10;
	const d2 = shebaCode.charCodeAt(1) - 65 + 10;
	const newStr = shebaCode.substring(4) + d1 + d2 + shebaCode.substring(2, 4);

	// Check reminder
	return shebaIso7064Mod97(newStr) === 1;
}

export * from "./codes.skip";
