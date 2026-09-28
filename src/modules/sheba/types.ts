export interface ShebaProcess {
	normal: string;
	formatted: string;
}

type ShebaBaseResult = {
	name: string;
	code: string;
	nickname: string;
	persianName: string;
};

export type ShebaResultWithAccountNumber = ShebaBaseResult & {
	accountNumber: string;
	accountNumberAvailable: true;
	formattedAccountNumber: string;
};

export type ShebaResultWithoutAccountNumber = ShebaBaseResult & {
	accountNumberAvailable: false;
};

/** Detailed Iranian IBAN bank information with its packaged SVG logo. */
export type IbanInfoWithLogo = (ShebaResultWithAccountNumber | ShebaResultWithoutAccountNumber) & {
	logo: string;
};

export type ShebaMapValue =
	| {
			nickname: string;
			name: string;
			persianName: string;
	  }
	| {
			nickname: string;
			name: string;
			persianName: string;
			process: (str: string) => ShebaProcess;
	  };
