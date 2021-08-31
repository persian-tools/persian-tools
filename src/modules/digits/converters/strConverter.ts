type StrConverter = (arg: { str: string; originCharList: string[]; destCharList: string[] }) => string;
const strConverter: StrConverter = ({ str, originCharList, destCharList }) =>
	str
		.split("")
		.map((char) => {
			const charIndex = originCharList.indexOf(char);
			return charIndex > -1 ? destCharList[charIndex] : char;
		})
		.join("");

export default strConverter;
