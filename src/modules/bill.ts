type BillFaType =
	| "آب"
	| "برق"
	| "گاز"
	| "تلفن ثابت"
	| "تلفن همراه"
	| "عوارض شهرداری"
	| "سازمان مالیات"
	| "جرایم راهنمایی و رانندگی"
	| "-";
type Currency = "toman" | "rial";

interface IBillTypes {
	[key: number]: BillFaType;
}

interface IValidation {
	status?: number;
	isValid: boolean;
}

interface IBillData {
	// bill amount
	amount: number;

	// bill type
	type: string;

	// bill barcode
	barcode: string;

	// bill validation
	isValid: boolean;

	// is valid bill id that should be true if bill id and true
	isValidBillId: IValidation;

	// id valid bill payment code
	isValidBillPayment: IValidation;
}

class Bill {
	barcode: string | null;
	currency: Currency;
	billTypes: IBillTypes;
	billId: string;
	billPayment: string;

	constructor(billId: number | string, paymentId: number | string, currency?: Currency) {
		this.barcode = null;
		this.currency = currency || "toman";
		this.billId = "";
		this.billPayment = "";
		this.billTypes = {
			1: "آب",
			2: "برق",
			3: "گاز",
			4: "تلفن ثابت",
			5: "تلفن همراه",
			6: "عوارض شهرداری",
			8: "سازمان مالیات",
			9: "جرایم راهنمایی و رانندگی",
		};

		if (billId && paymentId) {
			this.setId(String(billId));
			this.setPeymentId(String(paymentId));
		}
	}
	private setId(billId: string): void {
		this.billId = billId;
	}
	private setPeymentId(billPayment: string): void {
		this.billPayment = billPayment;
	}
	public setBarcode(barcode: string): void {
		this.barcode = barcode;
	}
	public getBillAmount(): number {
		const currency = this.currency == "rial" ? 1000 : 100;
		const amount = parseInt(String(this.billPayment).slice(0, -5)) * currency;

		return amount;
	}

	public getBillType(): BillFaType {
		// @ts-ignore
		return this.billTypes[String(this.billId)?.slice(-2, -1)] ?? "-";
	}

	public getBarcode(): string {
		return this.billId + "000" + this.billPayment;
	}
	public findByBarcode(): void {
		if (this.barcode) {
			this.billId = this.barcode.substr(0, 13);
			this.billPayment = this.barcode.split(this.billId)[1];
		}
	}
	private verificationBillPayment(): IValidation {
		let payId = parseInt(this.billPayment, 10).toString();
		const billId = parseInt(this.billId, 10).toString();
		let result = false;
		if (!payId || payId.length < 6) {
			return { isValid: result };
		}
		const firstControllBit = payId.charAt(payId.length - 2) + "";
		const secondControlBit = payId.charAt(payId.length - 1) + "";
		payId = payId.substr(0, payId.length - 2);
		result =
			this.CalTheBit(payId) === Number(firstControllBit) &&
			this.CalTheBit(billId + payId + firstControllBit) === Number(secondControlBit);
		return { isValid: result };
	}
	private verificationBillId(): IValidation {
		let newBillId = parseInt(this.billId, 10).toString();

		let result = false;
		if (!newBillId || newBillId.length < 6) {
			return {
				isValid: false,
			};
		}
		const controlBit = newBillId.substr(newBillId.length - 1);
		newBillId = newBillId.substr(0, newBillId.length - 1);
		const tempResult = this.CalTheBit(newBillId);
		result = tempResult === Number(controlBit);
		const billType = this.getBillType();
		return {
			isValid: result && billType !== "-",
		};
	}

	private CalTheBit(num: string): number {
		let sum = 0;
		let Base = 2;
		for (let i = 0; i < num.length; i++) {
			if (Base === 8) {
				Base = 2;
			}
			const subString = num.substring(num.length - 1 - i, num.length - i);
			sum += Number(subString) * Base;
			Base++;
		}
		sum %= 11;
		if (sum < 2) sum = 0;
		else sum = 11 - sum;
		return sum;
	}

	private verificationBill(): boolean {
		return this.verificationBillPayment().isValid && this.verificationBillId().isValid;
	}

	// private verification(sum: string, checkId: number): IValidation {
	// 	let base = 2;
	// 	const totalSum = sum
	// 	.split("")
	// 	.reverse()
	// 	.join("")
	// 	.split("")
	// 	.map(n => Number(n))
	// 	.reduce((acc, current) => {
	// 		acc += base * current;
	// 		base = base >= 7 ? 2 : base + 1;

	// 		return acc;
	// 	}, 0);
	// 	const modify = totalSum % 11;
	// 	const status = modify < 2 ? 0 : 11 - modify;

	// 	return { status, isValid: status === checkId };
	// }

	public getData(): IBillData {
		return {
			// bill amount
			amount: this.getBillAmount(),

			// bill type
			type: this.getBillType(),

			// bill barcode
			barcode: this.getBarcode(),

			// bill validation
			isValid: this.verificationBill(),

			// is valid bill id that should be true if bill id and true
			isValidBillId: this.verificationBillId(),

			// id valid bill payment code
			isValidBillPayment: this.verificationBillPayment(),
		};
	}
}

// new Bill(772263113142, 2510006).getData();

export default Bill;
