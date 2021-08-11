import { CancelFn, PromiseAndCancel } from '../links/core';
declare type BatchLoadFn<TKey, TValue> = (keys: TKey[]) => {
    promise: Promise<TValue[]>;
    cancel: CancelFn;
};
/**
 * Dataloader that's very inspired by https://github.com/graphql/dataloader
 * Less configuration, no caching, and allows you to cancel requests
 * When cancelling a single fetch the whole batch will be cancelled only when _all_ items are cancelled
 */
export declare function dataLoader<TKey, TValue>(fetchMany: BatchLoadFn<TKey, TValue>): {
    load: (key: TKey) => PromiseAndCancel<TValue>;
};
export {};
