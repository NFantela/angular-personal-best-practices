// best use case for these 2 functions are inside switch statements where we need to caver all union cases and nothing must fall trough
// only never must end up in last statement

// e.g. type AllFields = 'name' | 'age' -> with switch we need to cover both parts of union

/**
 * Strict never is used when we want to throw error and stop everything e.g. data mapping from server
 * @param x never
 */
export const isStrictNeverCheck = (x: never): never => {
    throw new Error(`Never case reached with unexpected value ${x}`);
};

/**
 * Weak never is used when we want to log locally but not throw
 * @param x never
 */
export const isWeakNeverCheck = (x: never): void => {
    console.error(`Never case reached with unexpected value ${x} in ${new Error().stack}`);
};
