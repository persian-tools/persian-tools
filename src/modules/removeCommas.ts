/**
 * Remove all commas in String
 * @param  {[number]} number
 * @return {[string]}
 */
const removeCommas = (number: string): number | undefined => {
	if (!number) {
		return;
	}

	if (number.toString().indexOf(",") !== -1) {
		number = number.replace(/,\s?/g, "");
	}

	return typeof number === "number" ? number : parseInt(number, 10);
};

export default removeCommas;
