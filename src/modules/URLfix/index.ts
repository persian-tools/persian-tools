/**
 * Used for fix Persian characters in URL
 *
 * @method URLfix
 * @param URL string
 * @return A string of fixed URL
 */
const URLfix = (value?: string): string | undefined => {
	if (!value) {
		return;
	}

	// Replace every %20 with _ to protect them from decodeURI
	let old = "";
	while (old !== value) {
		old = value;
		value = value.replace(/(http\S+?)%20/g, "$1\u200c\u200c\u200c_\u200c\u200c\u200c");
	}

	// Decode URIs
	// NOTE: This would convert all %20's to _'s which could break some links
	// but we will undo that later on
	// Revive all instances of %20 to make sure no links is broken
	return value.replace(/(http\S+)/g, (_, p) => decodeURI(p)).replace(/\u200c\u200c\u200c_\u200c\u200c\u200c/g, "%20");
};

export default URLfix;
