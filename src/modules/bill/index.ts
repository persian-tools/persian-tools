export type BillTypes =
	| "آب"
	| "برق"
	| "گاز"
	| "تلفن ثابت"
	| "تلفن همراه"
	| "عوارض شهرداری"
	| "سازمان مالیات"
	| "جرایم راهنمایی و رانندگی"
	| "unknown";
interface BillTypesModel {
	[key: number]: BillTypes;
}

const billTypes: BillTypesModel = {
	1: "آب",
	2: "برق",
	3: "گاز",
	4: "تلفن ثابت",
	5: "تلفن همراه",
	6: "عوارض شهرداری",
	8: "سازمان مالیات",
	9: "جرایم راهنمایی و رانندگی",
};

export type Currency = "toman" | "rial";
interface BillBarcodeModel {
	billId: number;
	paymentId: number;
}

interface BillResult {
	// bill amount
	amount: number;
	// bill type
	type: string;
	// bill barcode
	barcode: string;
	// bill validation
	isValid: boolean;
	// Bill id validation
	isValidBillId: boolean;
	// payment id validation
	isValidBillPayment: boolean;
}

interface BillParams {
	billId?: number;
	paymentId?: number;
	currency?: Currency;
	barcode?: string;
}

class Bill {
	private readonly barcode: string | null;
	private readonly currency: Currency;
	private readonly billTypes: BillTypesModel;
	private billId: number | null;
	private billPayment: number | null;

	constructor({ billId, paymentId, currency, barcode }: BillParams) {
		this.barcode = barcode || null;
		this.currency = currency || "toman";
		this.billId = null;
		this.billPayment = null;
		this.billTypes = billTypes;

		if (billId && paymentId) {
			this.setId(billId);
			this.setPaymentId(paymentId);
		}
	}

	private setId(billId: number): void {
		this.billId = billId;
	}

	private setPaymentId(billPayment: number): void {
		this.billPayment = billPayment;
	}

	public getAmount(): number {
		const currency = this.currency == "rial" ? 1000 : 100;
		const amount = parseInt(`${this.billPayment}`.slice(0, -5)) * currency;

		return amount;
	}

	public getBillType(): BillTypes {
		return this.billTypes[Number(String(this.billId)?.slice(-2, -1))] ?? "unknown";
	}

	public getBarcode(): string {
		return this.billId + "000" + this.billPayment;
	}
	public findByBarcode(barcode?: string): BillBarcodeModel {
		const $barcode = (barcode || this.barcode) as string;

		return {
			billId: Number($barcode.substr(0, 13)),
			paymentId: Number($barcode.substr(16, 10)),
		};
	}

	public verificationBillPayment(): boolean {
		const billId = `${this.billId}`;
		let paymentId = `${this.billPayment}`;

		let result = false;
		if (!paymentId || paymentId.length < 6) {
			return result;
		}
		const firstControlBit = paymentId.charAt(paymentId.length - 2) + "";
		const secondControlBit = paymentId.charAt(paymentId.length - 1) + "";
		paymentId = paymentId.substr(0, paymentId.length - 2);
		result =
			this.CalTheBit(paymentId) === Number(firstControlBit) &&
			this.CalTheBit(billId + paymentId + firstControlBit) === Number(secondControlBit);

		return result;
	}

	public verificationBillId(): boolean {
		let newBillId = `${this.billId}`;

		let result = false;
		if (!newBillId || newBillId.length < 6) {
			return false;
		}
		const controlBit = newBillId.substr(newBillId.length - 1);
		newBillId = newBillId.substr(0, newBillId.length - 1);

		const $result = this.CalTheBit(newBillId);
		result = $result === Number(controlBit);

		const billType = this.getBillType();

		return result && billType !== "unknown";
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

	public verificationBill(): boolean {
		return this.verificationBillPayment() && this.verificationBillId();
	}

	public getResult(): BillResult {
		return {
			// bill amount
			amount: this.getAmount(),
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

export default Bill;
