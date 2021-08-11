declare type KeyFromValue<V, T extends Record<PropertyKey, PropertyKey>> = {
    [K in keyof T]: V extends T[K] ? K : never;
}[keyof T];
declare type Invert<T extends Record<PropertyKey, PropertyKey>> = {
    [V in T[keyof T]]: KeyFromValue<V, T>;
};
export declare function invert<T extends Record<PropertyKey, PropertyKey>>(obj: T): Invert<T>;
export {};