const LIB_TAG = "PersianTools";
const SEPARATOR = " - ";

export const throwError = (category = "", msg = ""): never => {
	const errData = [category, msg].join(SEPARATOR);
	throw TypeError(`${LIB_TAG}: ${errData}`);
};
