import { AnyRouter, DataTransformer } from '@trpc/server';
import { TRPCResult } from '@trpc/server/rpc';
import { TRPCClientError } from '../TRPCClientError';
export declare type OperationContext = Record<string, unknown>;
export declare type Operation<TInput = unknown> = {
    id: number;
    type: 'query' | 'mutation' | 'subscription';
    input: TInput;
    path: string;
    context: OperationContext;
};
export declare type OperationResponse<TRouter extends AnyRouter, TOutput = unknown> = TRPCResult<TOutput> | TRPCClientError<TRouter>;
export declare type PrevCallback<TRouter extends AnyRouter, TOutput = unknown> = (result: OperationResponse<TRouter, TOutput>) => void;
export declare type OperationLink<TRouter extends AnyRouter, TInput = unknown, TOutput = unknown> = (opts: {
    op: Operation;
    prev: PrevCallback<TRouter, TOutput>;
    next: (op: Operation<TInput>, callback: PrevCallback<TRouter, TOutput>) => void;
    onDestroy: (callback: () => void) => void;
}) => void;
export declare type TRPCLink<TRouter extends AnyRouter> = (opts: LinkRuntimeOptions) => OperationLink<TRouter>;
export interface HttpLinkOptions {
    url: string;
}
export declare type HttpHeaders = Record<string, string | string[] | undefined>;
export declare type LinkRuntimeOptions = Readonly<{
    transformer: DataTransformer;
    headers: () => HttpHeaders;
    fetch: typeof fetch;
    AbortController?: typeof AbortController;
}>;
export declare type CancelFn = () => void;
export declare type PromiseAndCancel<TValue> = {
    promise: Promise<TValue>;
    cancel: CancelFn;
};
