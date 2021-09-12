export type KindOf = (inp: unknown) => string;

export const kindOf: KindOf = (inp) => Object.prototype.toString.call(inp).slice(8, -1).toLowerCase();
