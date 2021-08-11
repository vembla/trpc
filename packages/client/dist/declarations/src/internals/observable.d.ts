export interface ObservableCallbacks<TValue, TError> {
    onNext?: (opts: TValue) => void;
    onError?: (opts: TError) => void;
    onDone?: () => void;
}
export interface ObservableLike<TValue, TError = unknown> {
    subscribe(callbacks: ObservableCallbacks<TValue, TError>): UnsubscribeFn;
    next(value: TValue): void;
    done(): void;
    error(error: TError): void;
}
export interface ObservableSubject<TValue, TError = unknown> extends ObservableLike<TValue, TError> {
    get(): TValue;
}
export declare type UnsubscribeFn = () => void;
export declare function observable<TValue, TError = unknown>(): ObservableLike<TValue, TError>;
export declare function observableSubject<TValue, TError = unknown>(initialValue: TValue): ObservableSubject<TValue, TError>;