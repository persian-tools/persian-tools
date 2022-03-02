export type Trim = (str: string) => string;
export const trim: Trim = (str) => str.replace(/^\s+|\s+$/g, "");
