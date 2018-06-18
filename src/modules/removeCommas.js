/**
 * Remove all commas in String
 * @param  {[number]} number
 * @return {[string]}
 */
const removeCommas = number => {
	if (!number) {
		return;
	}

	if (number.toString(16).indexOf(",") !== -1) {
		number = number.replace(/,\s?/g, "");
	}

	return typeof number === "number" ? number : parseInt(number, 10);
};

export default removeCommas;
