export declare type Prefix<K extends string, T extends string> = `${K}${T}`;
export declare type identity<T> = T;
export declare type format<T> = {
    [k in keyof T]: T[k];
};
export declare type flatten<T, Q> = identity<{
    [k in keyof T | keyof Q]: k extends keyof T ? T[k] : k extends keyof Q ? Q[k] : never;
}>;
export declare type Prefixer<TObj extends Record<string, any>, TPrefix extends string> = format<{
    [P in keyof TObj as Prefix<TPrefix, string & P>]: TObj[P];
}>;
export declare type Maybe<T> = T | undefined | null;
export declare type ThenArg<T> = T extends PromiseLike<infer U> ? ThenArg<U> : T;
export declare type Dict<T> = Record<string, T | undefined>;
