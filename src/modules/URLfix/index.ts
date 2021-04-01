/**
 * @method URLfix
 * @description Used for fix Persian characters in URL
 * @param {string} url
 * @return a string of fixed URL
 */
function URLfix(url?: string): string | undefined {
    if (!url) return;

    return decodeURIComponent(url);
}

export default URLfix;
