type Trim = (str: string) => string;
const trim: Trim = (str) => str.replace(/^\s+|\s+$/g, "");

export { trim, Trim };
