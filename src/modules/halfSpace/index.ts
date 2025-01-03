/**
 * Replace halfSpace in string(Zero-width non-joiner)
 *
 * @method halfSpace
 * @return clean entered persian string
 * @param str
 */
const halfSpace = (str: string): string => {
	if (typeof str !== "string") {
		throw new TypeError("the input must be string");
	}

	return str
		.replace(/\u00ad/g, "‌")
		.replace(/\u200C{2,}/g, "‌")
		.replace(/([۰-۹0-9إأةؤورزژاآدذ،؛,:«»\\/@#$٪×*()ـ\-=|])\u200c/g, "$1")
		.replace(/\u200c([\u064e\u0650\u064f\u064b\u064d\u064C\u0651\u06C0])/g, "$1")
		.replace(/\u200c([\w])/g, "$1")
		.replace(/([\w])\u200c/g, "$1")
		.replace(/\u200c([\n\s[].،«»:()؛؟?;$!@-=+\\])/g, "$1")
		.replace(/([\n\s[.،«»:()؛؟?;$!@\-=+\\])\u200c/g, "$1")
		.replace(/\s+\u200C|\u200C\s+/g, " ")
		.replace(/((\s|^)ن?می)\u0020/g, "$1‌")
		.replace(/((\s|^)بی)\u0020/g, "$1‌")
		.replace(/\u0020((ام|ات|اش|ای|اید|ایم|اند)\s)/g, "‌$1")
		.replace(/([ادذرزژو])\u0020(ها(ی)?(?:$|[ ،؛:»؟!)]))/g, "$1$2")
		.replace(/\u0020(ها(ی)?(?:$|[ ،؛:»؟!)]))/g, "‌$1")
		.replace(/([ادذرزژو])\u0020(تر((ی)|(ین))?(?:$|[ ،؛:»؟!)]))/g, "$1$2")
		.replace(/\u0020(تر((ی)|(ین))?(?:$|[ ،؛:»؟!)]))/g, "‌$1")
		.replace(/([ادذرزژو])\u0020((هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)(?:$|[ ،؛:»؟!)]))/g, "$1$2")
		.replace(/\u0020((هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)(?:$|[ ،؛:»؟!)]))/g, "‌$1");
};

export default halfSpace;
