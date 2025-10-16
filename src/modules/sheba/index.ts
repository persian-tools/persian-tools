import { shebaIso7064Mod97 } from "./helpers";
import { shebaMapCodesMap } from "./codes.skip";
// Types
import type { ShebaResultWithAccountNumber, ShebaResultWithoutAccountNumber } from "./types";

/**
 * @public
 * @since v1.4.2
 */
export const shebaPattern: RegExp = /IR[0-9]{24}/;
/**
 * @public
 * @since v1.4.2
 */
export const shebaPatternCode: RegExp = /IR[0-9]{2}([0-9]{3})[0-9]{19}/;

/**
 * Get detailed information about a Sheba (IBAN) code
 * @public
 * @since 1.7.1
 * @param shebaCode - The Sheba/IBAN code to validate and extract information from
 * @returns Detailed bank information including account number if available, or null if invalid
 */
export function getShebaInfo(shebaCode: string): ShebaResultWithAccountNumber | ShebaResultWithoutAccountNumber | null {
	if (!isShebaValid(shebaCode)) {
		return null;
	}

	const res = shebaPatternCode.exec(shebaCode);
	const codeAsString = res?.[1] ?? "";
	const bank = shebaMapCodesMap.get(codeAsString);

	if (!bank) {
		return null;
	}

	// If the process property exists, means we can extract the account number
	if ("process" in bank) {
		const data = bank.process(shebaCode);

		return {
			name: bank.name,
			nickname: bank.nickname,
			persianName: bank.persianName,
			code: codeAsString,
			accountNumberAvailable: true,
			accountNumber: data.normal,
			formattedAccountNumber: data.formatted,
		} as ShebaResultWithAccountNumber;
	}

	return {
		name: bank.name,
		nickname: bank.nickname,
		persianName: bank.persianName,
		code: codeAsString,
		accountNumberAvailable: false,
	} as ShebaResultWithoutAccountNumber;
}

/**
 * @public
 * @since 1.7.1
 */
export function isShebaValid(shebaCode: string): boolean {
	shebaCode = shebaCode.toUpperCase();

	if (!shebaCode.startsWith("IR")) shebaCode = `IR${shebaCode}`;

	if (shebaCode.length !== 26) {
		return false;
	}

	if (!shebaPattern.test(shebaCode)) {
		return false;
	}

	const d1 = shebaCode.charCodeAt(0) - 65 + 10;
	const d2 = shebaCode.charCodeAt(1) - 65 + 10;

	let newStr = shebaCode.slice(4);
	newStr += d1.toString() + d2.toString() + shebaCode.slice(2, 4);

	const remainder = shebaIso7064Mod97(newStr);

	return remainder === 1;
}

export type { ShebaResultWithAccountNumber, ShebaResultWithoutAccountNumber } from "./types";
