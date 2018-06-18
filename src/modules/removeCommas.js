/**
 * Remove all commas in String``
 * @param  {[number]} number
 * @return {[string]}
 */
const removeCommas = number => {
	if (number.toString(16).indexOf(",") !== -1) {
		number = number.replace(/,\s?/g, "");
	}

	return number;
};

export default removeCommas;
