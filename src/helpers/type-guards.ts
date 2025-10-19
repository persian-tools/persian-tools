/**
 * Determines the type of the given value as a string.
 *
 * @param {any} value - The value to check the type of.
 * @return {string} The type of the value as a lowercase string.
 */
export function kindOf(value: any): string {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

/**
 * Determines whether the provided value is a string.
 *
 * @param value - The value to be checked.
 * @return Returns true if the provided value is a string; otherwise, false.
 */
export function isString(value: any): value is string {
	return kindOf(value) === "string";
}

/**
 * Checks if the provided value is a number.
 *
 * @param {any} value - The value to be checked.
 * @return {boolean} Returns `true` if the value is a number, otherwise `false`.
 */
export function isNumber(value: any): value is number {
	return kindOf(value) === "number";
}

/**
 * Checks if the provided value is null or undefined.
 *
 * @param {any} value - The value to check.
 * @return {boolean} Returns true if the value is null or undefined, otherwise false.
 */
export function isNullish(value: any): value is null | undefined {
	return value === null || value === undefined;
}

/**
 * Determines if a given value is "truthy". A value is considered truthy if it is neither nullish (null or undefined) nor evaluates to false when coerced to a boolean.
 *
 * @param {any} value - The value to evaluate for truthiness.
 * @return {boolean} Returns true if the value is truthy, otherwise false.
 */
export function isTruthy(value: any): boolean {
	return !isNullish(value) && !!value;
}

/**
 * Type guard that checks if the given input is an Error object.
 *
 * @example
 * ```typescript
 * declare const maybeErr: Error | string;
 *
 * if (isError(maybeErr)) {
 *   // `maybeErr` is now typed as `Error`
 *   console.error(maybeErr.message);
 * } else {
 *   // `maybeErr` is now typed as `string`
 *   console.log(maybeErr);
 * }
 * ```
 *
 * @param input - The value to check.
 * @returns `true` if `value` is an Error object, otherwise `false`.
 */
export const isError = (input: unknown): input is Error => {
	return kindOf(input) === "error";
};
