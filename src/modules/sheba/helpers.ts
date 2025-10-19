/**
 * @private
 * @since 1.7.1
 */
export function shebaIso7064Mod97(iban: string): number {
	let remainder = iban,
		block;

	while (remainder.length > 2) {
		block = remainder.slice(0, 9);
		remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
	}

	return parseInt(remainder, 10) % 97;
}
