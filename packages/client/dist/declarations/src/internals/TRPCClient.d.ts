import { AnyRouter, ClientDataTransformerOptions, inferHandlerInput, inferProcedureInput, inferSubscriptionOutput } from '@trpc/server';
import { TRPCResult } from '@trpc/server/rpc';
import { ObservableCallbacks, UnsubscribeFn } from './observable';
import { CancelFn, HttpHeaders, LinkRuntimeOptions, OperationContext, TRPCLink } from '../links/core';
import { TRPCClientError } from '../TRPCClientError';
declare type CancellablePromise<T = unknown> = Promise<T> & {
    cancel: CancelFn;
};
export interface FetchOptions {
    fetch?: typeof fetch;
    AbortController?: typeof AbortController;
}
export declare function getRequestId(): number;
export declare type CreateTRPCClientOptions<TRouter extends AnyRouter> = {
    /**
     * Add ponyfill for fetch
     */
    fetch?: typeof fetch;
    /**
     * add ponyfill for AbortController
     */
    AbortController?: typeof AbortController;
    /**
     * headers to be set on outgoing requests / callback that of said headers
     */
    headers?: HttpHeaders | (() => HttpHeaders);
    /**
     * Data transformer
     * @link http://localhost:3000/docs/data-transformers
     **/
    transformer?: ClientDataTransformerOptions;
} & ({
    /**
     * HTTP URL of API
     **/
    url: string;
} | {
    /**
     * @link http://localhost:3000/docs/links
     **/
    links: TRPCLink<TRouter>[];
});
export interface TRPCRequestOptions {
    /**
     * Pass additional context to links
     */
    context?: OperationContext;
}
export declare class TRPCClient<TRouter extends AnyRouter> {
    private readonly links;
    readonly runtime: LinkRuntimeOptions;
    constructor(opts: CreateTRPCClientOptions<TRouter>);
    private $request;
    private requestAsPromise;
    query<TQueries extends TRouter['_def']['queries'], TPath extends string & keyof TQueries>(path: TPath, ...args: [...inferHandlerInput<TQueries[TPath]>, TRPCRequestOptions?]): CancellablePromise<import("@trpc/server").ThenArg<ReturnType<TQueries[TPath]["call"]>>>;
    mutation<TMutations extends TRouter['_def']['mutations'], TPath extends string & keyof TMutations>(path: TPath, ...args: [...inferHandlerInput<TMutations[TPath]>, TRPCRequestOptions?]): CancellablePromise<import("@trpc/server").ThenArg<ReturnType<TMutations[TPath]["call"]>>>;
    subscription<TSubscriptions extends TRouter['_def']['subscriptions'], TPath extends string & keyof TSubscriptions, TOutput extends inferSubscriptionOutput<TRouter, TPath>, TInput extends inferProcedureInput<TSubscriptions[TPath]>>(path: TPath, input: TInput, opts: TRPCRequestOptions & ObservableCallbacks<TRPCResult<TOutput>, TRPCClientError<TRouter>>): UnsubscribeFn;
}
export {};
