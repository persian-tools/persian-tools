type ToPositive = (n: number) => number;

const toPositive: ToPositive = Math.abs;

export { toPositive, ToPositive };
