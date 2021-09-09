type KindOf = (inp: unknown) => string;

const kindOf: KindOf = (inp) => Object.prototype.toString.call(inp).slice(8, -1).toLowerCase();

export { kindOf, KindOf };
