/* eslint-disable */

/**
 * toPersianChars
 *
 * Description: Replaces all instances of ي and ك withی and ک,
 * respectively. It should not make any ch anges to Arabic text
 * surrounded by appropriate templates.
 *
 * @method toPersianChars
 * @param arabic characters
 * @return cleaned characters of arabic characters
 */
function toPersianChars(str: string): string | undefined {
	if (!str) return;

	let old = "";

	// Do not touch the text inside links, images, categories
	while (old != str) {
		old = str;

		str = str.replace(
			/\{\{(عەرەبی|بە عەرەبی|بە ئویغوری)\|(.*?)ى(.*?)\}\}/g,
			"{{$1|$2\u200b\u200b\u200bی\u200b\u200b\u200b$3}}",
		);
		str = str.replace(/\{\{(بە سیندی)\|(.*?)ه(.*?)\}\}/g, "{{$1|$2\u200f\u200f\u200fھ\u200f\u200f\u200f$3}}");
		str = str.replace(/\{\{(بە پەشتۆ)\|(.*?)ي(.*?)\}\}/g, "{{$1|$2\u200b\u200b\u200bی\u200b\u200b\u200b$3}}");
		str = str.replace(/\[\[([^\]]*?\:[^\]]*?)ي(.*?)\]\]/g, "[[$1\u200f\u200f\u200fی\u200f\u200f\u200f$2]]");
		str = str.replace(/\[\[([^\]]*?\:[^\]]*?)ى(.*?)\]\]/g, "[[$1\u200b\u200b\u200bی\u200b\u200b\u200b$2]]");
		str = str.replace(/\[\[([^\]]*?\:[^\]]*?)ك(.*?)\]\]/g, "[[$1\u200f\u200f\u200fک\u200f\u200f\u200f$2]]");
		str = str.replace(/\[\[([^\]]*?\:[^\]]*?)ه‌(.*?)\]\]/g, "[[$1\u200f\u200f\u200fە\u200f\u200f\u200f$2]]");
		str = str.replace(/\[\[([^\]]*?\:[^\]]*?)ه(.*?)\]\]/g, "[[$1\u200f\u200f\u200fھ\u200f\u200f\u200f$2]]");
	}

	// Replace every ي and ك with ی and ک, respectively
	// NOTE: This WILL mess with images, links, categories
	// but we will undo it later
	str = str.replace(/ي/g, "ی");
	str = str.replace(/ك/g, "ک");
	str = str.replace(/ى/g, "ی");
	str = str.replace(new RegExp("ه($|[^ء-يٱ-ە])", "g"), "ە$1");
	str = str.replace(/ە‌/g, "ە");
	str = str.replace(/ه/g, "ھ");

	// NOTE: This will also undo changes to categories which is not good
	// but we will undo that later
	str = str.replace(/\u200f\u200f\u200fی\u200f\u200f\u200f/g, "ي");
	str = str.replace(/\u200b\u200b\u200bی\u200b\u200b\u200b/g, "ى");
	str = str.replace(/\u200f\u200f\u200fک\u200f\u200f\u200f/g, "ك");
	str = str.replace(/\u200f\u200f\u200fه\u200f\u200f\u200f/g, "ه‌");
	str = str.replace(/\u200f\u200f\u200fھ\u200f\u200f\u200f/g, "ه");

	old = "";
	// Replace every ي and ك in categories with ی and ک, respectively
	while (old != str) {
		old = str;
		str = str.replace(/\[\[(پۆل|[Cc]ategory):(.*?)(ى|ي)(.*?)\]\]/g, "[[$1:$2ی$4]]");
		str = str.replace(/\[\[(پۆل|[Cc]ategory):(.*?)ك(.*?)\]\]/g, "[[$1:$2ک$3]]");
		str = str.replace(/\[\[(پۆل|[Cc]ategory):(.*?)ه‌(.*?)\]\]/g, "[[$1:$2$3ە]]");
		str = str.replace(/\[\[(پۆل|[Cc]ategory):(.*?)ه(.*?)\]\]/g, "[[$1:$2ھ$3]]");
	}

	// Finally, replace every ی and ک in Arabic text with ي and ك, respectively
	old = "";
	while (old != str) {
		old = str;
		str = str.replace(
			/\{\{(عەرەبی|سەرەتای عەرەبی)\}\}([^\}]*)ی([^\{]*)\{\{کۆتایی\sعەرەبی\}\}/g,
			"{{$1}}$2ي$3{{کۆتایی عەرەبی}}",
		);
		str = str.replace(
			/\{\{(عەرەبی|سەرەتای عەرەبی)\}\}([^\}]*)ک([^\{]*)\{\{کۆتایی\sعەرەبی\}\}/g,
			"{{$1}}$2ك$3{{کۆتایی عەرەبی}}",
		);
		str = str.replace(
			/\{\{(عەرەبی|سەرەتای عەرەبی)\}\}([^\}]*)ە([^\{]*)\{\{کۆتایی\sعەرەبی\}\}/g,
			"{{$1}}$2ه$3{{کۆتایی عەرەبی}}",
		);
		str = str.replace(
			/\{\{(عەرەبی|سەرەتای عەرەبی)\}\}([^\}]*)ھ([^\{]*)\{\{کۆتایی\sعەرەبی\}\}/g,
			"{{$1}}$2ه$3{{کۆتایی عەرەبی}}",
		);
		str = str.replace(/\{\{(بە پەشتۆ)\|(.*?)ى(.*?)\}\}/g, "{{$1|$2ي$3}}");
		str = str.replace(/\{\{(عەرەبی|بە عەرەبی|بە سیندی|بە ئویغوری)\|(.*?)ی(.*?)\}\}/g, "{{$1|$2ي$3}}");
		str = str.replace(/\{\{(عەرەبی|بە عەرەبی|بە ئویغوری)\|(.*?)ک(.*?)\}\}/g, "{{$1|$2ك$3}}");
		str = str.replace(/\{\{(عەرەبی|بە عەرەبی|فارسی|بە فارسی|ن.فارسی|بە پەشتۆ)\|(.*?)ە(.*?)\}\}/g, "{{$1|$2ه$3}}");
		str = str.replace(/\{\{(عەرەبی|بە عەرەبی|فارسی|بە فارسی|ن.فارسی|بە پەشتۆ)\|(.*?)ھ(.*?)\}\}/g, "{{$1|$2ه$3}}");
	}

	return str;
}

export default toPersianChars;
