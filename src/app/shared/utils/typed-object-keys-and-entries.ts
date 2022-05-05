type TypedObjKeys<T> = [keyof T];

type TypedObjectEntries<T, K = keyof T> = K extends keyof T ? [K, Required<T>[K]] : never;

export function typedObjectKeys<T>(someObject: T): TypedObjKeys<T> {
  return Object.keys(someObject) as TypedObjKeys<T>;
}

export function typedObjectEntries<T>(someObject: T): Array<TypedObjectEntries<T>> {
  return Object.entries(someObject) as Array<TypedObjectEntries<T>>;
}
