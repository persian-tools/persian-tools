// Utilities
import { isError } from "./type-guards";

/**
 * PersianToolsTypeError is a specialized error class extending the native JavaScript `TypeError` class.
 * It is used for expressing errors specific to the PersianTools library, providing additional context
 * about the error through the `subject` and an optional `cause`.
 */
export class PersianToolsTypeError extends TypeError {
	subject: string;

	constructor(subject: string, message?: string, cause?: Error | unknown) {
		const trueProto = new.target.prototype;

		super(message);

		this.subject = subject;
		if (isError(cause)) {
			this.cause = cause;
		} else {
			this.cause = new Error(cause as string);
		}
		this.name = trueProto.constructor.name;

		Object.setPrototypeOf(this, trueProto);
		Error.captureStackTrace(this, this.constructor);
	}
}

/**
 * Represents a custom error specific to the PersianTools library.
 * This class extends the built-in Error object and adds additional
 * context through the `subject` property and an optional `cause`.
 */
export class PersianToolsError extends Error {
	subject: string;

	constructor(subject: string, message?: string, cause?: Error | unknown) {
		const trueProto = new.target.prototype;

		super(message);

		this.subject = subject;
		if (isError(cause)) {
			this.cause = cause;
		} else {
			this.cause = new Error(cause as string);
		}
		this.name = trueProto.constructor.name;

		Object.setPrototypeOf(this, trueProto);
		Error.captureStackTrace(this, this.constructor);
	}
}
