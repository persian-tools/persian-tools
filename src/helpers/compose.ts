type Func<I, O> = (input: I) => O;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Compose = (...functions: Func<any, any>[]) => Func<any, any>;

/**
 * Performs right-to-left function composition. The arguments
 * should be unary function
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @symb compose(f, g, h)(x) = f(g(h(x)))
 */

export const compose: Compose =
	(...functions) =>
	(arg) =>
		functions.reduceRight((prev, current) => current(prev), arg);
