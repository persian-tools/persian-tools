/**
 * Replace halfSpace in string(Zero-width non-joiner)
 *
 * @method halfSpace
 * @param persian string
 * @return clean entered persian string
 */
const halfSpace = (str: string): string | undefined => {
	if (!str) return;

	str = str.replace(/\u00ad/g, "‌");
	str = str.replace(/\u200C{2,}/g, "‌");
	str = str.replace(/([۰-۹0-9إأةؤورزژاآدذ،؛,:«»\\/@#$٪×*()ـ\-=|])\u200c/g, "$1");
	str = str.replace(/\u200c([\u064e\u0650\u064f\u064b\u064d\u064C\u0651\u06C0])/g, "$1");
	str = str.replace(/\u200c([\w])/g, "$1");
	str = str.replace(/([\w])\u200c/g, "$1");
	str = str.replace(/\u200c([\n\s[].،«»:()؛؟?;$!@-=+\\])/g, "$1");
	str = str.replace(/([\n\s[.،«»:()؛؟?;$!@\-=+\\])\u200c/g, "$1");
	str = str.replace(/\s+\u200C|\u200C\s+/g, " ");

	str = str.replace(/((\s|^)ن?می)\u0020/g, "$1‌");
	str = str.replace(/((\s|^)بی)\u0020/g, "$1‌");
	str = str.replace(/\u0020((ام|ات|اش|ای|اید|ایم|اند)\s)/g, "‌$1");
	str = str.replace(/\u0020(ها(ی)?\s)/g, "‌$1");
	str = str.replace(/\u0020(تر((ی)|(ین))?\s)/g, "‌$1");
	str = str.replace(/\u0020((هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)\s)/g, "‌$1");

	return str;
};

export default halfSpace;
