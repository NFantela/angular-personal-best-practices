export type EmptyObject = { [K in string | number]: never };
export type Primitive =
    | null
    | undefined
    | string
    | number
    | boolean
    | symbol
    | bigint;

export const isFunction = (value: unknown): value is Function => typeof value === 'function';

export const isDateObject = (value: unknown): value is Date => value instanceof Date;

export const isObjectType = (value: unknown) => typeof value === 'object';

// this works only with == not with ===
export const isNullOrUndefined = (value: unknown): value is null | undefined => value == null;

export const isObject = <T extends object>(value: unknown): value is T =>
    !isNullOrUndefined(value) &&
    !Array.isArray(value) &&
    isObjectType(value) &&
    !isDateObject(value);

export const isEmptyObject = (value: unknown): value is EmptyObject => isObject(value) && !Object.keys(value).length;

export const isPrimitive = (value: unknown): value is Primitive => isNullOrUndefined(value) || !isObjectType(value);

export default function cloneObjectWithoutFunctions<T>(data: T): T {
    let copy: any;
    const isArray = Array.isArray(data);

    if (data instanceof Date) {
        copy = new Date(data);
    } else if (data instanceof Set) {
        copy = new Set(data);
    } else if (isArray || isObject(data)) {
        // array or object
        // if we find function we break out...
        // else we recursevly copy all
        copy = isArray ? [] : {};
        for (const key in data) {
            if (isFunction(data[key])) {
                copy = data;
                break;
            }
            copy[key] = cloneObjectWithoutFunctions(data[key]);
        }
    } else {
        return data;
    }

    return copy;
}
