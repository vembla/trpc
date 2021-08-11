import { AnyRouter } from '@trpc/server';
import { TRPCResult } from '@trpc/server/rpc';
import { TRPCClientError } from '../TRPCClientError';
import { Operation, OperationLink } from '../links/core';
export declare function executeChain<TRouter extends AnyRouter, TInput = unknown, TOutput = unknown>(opts: {
    links: OperationLink<TRouter, TInput, TOutput>[];
    op: Operation<TInput>;
}): import("./observable").ObservableSubject<TRPCResult<TOutput> | null, TRPCClientError<TRouter, ReturnType<TRouter["getErrorShape"]>>>;
