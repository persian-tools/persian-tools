/**
 * **Zero-pads** a numeric string to at least two digits.
 * e.g. "6" => "06"
 */
export function zeroPad(numStr: string): string {
	return numStr.length === 1 ? "0" + numStr : numStr;
}
