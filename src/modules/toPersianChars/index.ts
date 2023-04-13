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
	if (!str) {
		return;
	}
	let old = "";

	// Do not touch the text inside links, images, categories
	while (old != str) {
		old = str;
		str = str
			.replace(
				/\{\{(عەرەبی|بە عەرەبی|بە ئویغوری)\|(.*?)ى(.*?)\}\}/g,
				"{{$1|$2\u200b\u200b\u200bی\u200b\u200b\u200b$3}}",
			)
			.replace(/\{\{(بە سیندی)\|(.*?)ه(.*?)\}\}/g, "{{$1|$2\u200f\u200f\u200fھ\u200f\u200f\u200f$3}}")
			.replace(/\{\{(بە پەشتۆ)\|(.*?)ي(.*?)\}\}/g, "{{$1|$2\u200b\u200b\u200bی\u200b\u200b\u200b$3}}")
			.replace(/\[\[([^\]]*?\:[^\]]*?)ي(.*?)\]\]/g, "[[$1\u200f\u200f\u200fی\u200f\u200f\u200f$2]]")
			.replace(/\[\[([^\]]*?\:[^\]]*?)ى(.*?)\]\]/g, "[[$1\u200b\u200b\u200bی\u200b\u200b\u200b$2]]")
			.replace(/\[\[([^\]]*?\:[^\]]*?)ك(.*?)\]\]/g, "[[$1\u200f\u200f\u200fک\u200f\u200f\u200f$2]]")
			.replace(/\[\[([^\]]*?\:[^\]]*?)ه‌(.*?)\]\]/g, "[[$1\u200f\u200f\u200fە\u200f\u200f\u200f$2]]")
			.replace(/\[\[([^\]]*?\:[^\]]*?)ه(.*?)\]\]/g, "[[$1\u200f\u200f\u200fھ\u200f\u200f\u200f$2]]");
	}

	// Replace every ي and ك with ی and ک, respectively
	// NOTE: This WILL mess with images, links, categories
	// but we will undo it later
	str = str
		.replace(/ي/g, "ی")
		.replace(/ك/g, "ک")
		.replace(/ى/g, "ی")
		.replace(new RegExp("([^ء-يٱ-ە]|$)ه", "g"), "ە$1")
		.replace(/ە‌/g, "ە")

		// NOTE: This will also undo changes to categories which is not good
		// but we will undo that later
		.replace(/\u200f\u200f\u200fی\u200f\u200f\u200f/g, "ي")
		.replace(/\u200b\u200b\u200bی\u200b\u200b\u200b/g, "ى")
		.replace(/\u200f\u200f\u200fک\u200f\u200f\u200f/g, "ك")
		.replace(/\u200f\u200f\u200fه\u200f\u200f\u200f/g, "ه‌")
		.replace(/\u200f\u200f\u200fھ\u200f\u200f\u200f/g, "ه");

	old = "";
	// Replace every ي and ك in categories with ی and ک, respectively
	while (old != str) {
		old = str;
		str = str
			.replace(/\[\[(پۆل|[Cc]ategory):(.*?)(ى|ي)(.*?)\]\]/g, "[[$1:$2ی$4]]")
			.replace(/\[\[(پۆل|[Cc]ategory):(.*?)ك(.*?)\]\]/g, "[[$1:$2ک$3]]")
			.replace(/\[\[(پۆل|[Cc]ategory):(.*?)ه‌(.*?)\]\]/g, "[[$1:$2$3ە]]")
			.replace(/\[\[(پۆل|[Cc]ategory):(.*?)ه(.*?)\]\]/g, "[[$1:$2ھ$3]]");
	}

	// Finally, replace every ی and ک in Arabic text with ي and ك, respectively
	old = "";
	while (old != str) {
		old = str;
		str = str
			.replace(
				/\{\{(عەرەبی|سەرەتای عەرەبی)\}\}([^\}]*)ی([^\{]*)\{\{کۆتایی\sعەرەبی\}\}/g,
				"{{$1}}$2ي$3{{کۆتایی عەرەبی}}",
			)
			.replace(
				/\{\{(عەرەبی|سەرەتای عەرەبی)\}\}([^\}]*)ک([^\{]*)\{\{کۆتایی\sعەرەبی\}\}/g,
				"{{$1}}$2ك$3{{کۆتایی عەرەبی}}",
			)
			.replace(
				/\{\{(عەرەبی|سەرەتای عەرەبی)\}\}([^\}]*)ە([^\{]*)\{\{کۆتایی\sعەرەبی\}\}/g,
				"{{$1}}$2ه$3{{کۆتایی عەرەبی}}",
			)
			.replace(
				/\{\{(عەرەبی|سەرەتای عەرەبی)\}\}([^\}]*)ھ([^\{]*)\{\{کۆتایی\sعەرەبی\}\}/g,
				"{{$1}}$2ه$3{{کۆتایی عەرەبی}}",
			)
			.replace(/\{\{(بە پەشتۆ)\|(.*?)ى(.*?)\}\}/g, "{{$1|$2ي$3}}")
			.replace(/\{\{(عەرەبی|بە عەرەبی|بە سیندی|بە ئویغوری)\|(.*?)ی(.*?)\}\}/g, "{{$1|$2ي$3}}")
			.replace(/\{\{(عەرەبی|بە عەرەبی|بە ئویغوری)\|(.*?)ک(.*?)\}\}/g, "{{$1|$2ك$3}}")
			.replace(/\{\{(عەرەبی|بە عەرەبی|فارسی|بە فارسی|ن.فارسی|بە پەشتۆ)\|(.*?)ە(.*?)\}\}/g, "{{$1|$2ه$3}}")
			.replace(/\{\{(عەرەبی|بە عەرەبی|فارسی|بە فارسی|ن.فارسی|بە پەشتۆ)\|(.*?)ھ(.*?)\}\}/g, "{{$1|$2ه$3}}");
	}
	return str;
}

export default toPersianChars;
