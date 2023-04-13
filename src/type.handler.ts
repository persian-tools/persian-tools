import { throwError } from "./error-handler";
import { StringNumber } from "./types";

export const toString = (value: StringNumber | null | undefined, origin = ""): string => {
	if (!["string", "number"].includes(typeof value)) {
		throwError(origin, "The input must be string or number");
	}
	return String(value);
};

export const toStringOrNull = (value: StringNumber | null | undefined): string | null => {
	return !["string", "number"].includes(typeof value) ? null : String(value);
};

export const toStringOrEmpty = (value: StringNumber | null | undefined): string => {
	return !["string", "number"].includes(typeof value) ? "" : String(value);
};
