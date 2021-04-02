/**
 * @method URLfix
 * @description Used for fix Persian characters in URL
 * @param {string} url
 * @param {string} separator - optional argument to replace character with space in URLs. by default return URL with space
 * @example
 * URLfix('https://fa.wikipedia.org/wiki/%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9%20%DA%A9%D9%88%D8%A7%D9%86%D8%AA%D9%88%D9%85%DB%8C', '_')
 * return 'https://fa.wikipedia.org/wiki/مکانیک_کوانتومی'
 * @return {string} a string of fixed URL
 */

function URLfix(url?: string, separator?: string): string | undefined {
	if (!url) return;
	url = decodeURIComponent(url);

	if (separator) return url.replace(" ", separator);

	return url;
}

export default URLfix;
