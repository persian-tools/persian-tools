export const kindOf = (inp: unknown): string => Object.prototype.toString.call(inp).slice(8, -1).toLowerCase();
