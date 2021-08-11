import { CreateTRPCClientOptions, TRPCClient, TRPCClientError, TRPCRequestOptions } from '@trpc/client';
import type { AnyRouter, inferHandlerInput, inferProcedureInput } from '@trpc/server';
import { ReactNode } from 'react';
import { QueryClient, QueryKey, UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions, UseQueryResult } from 'react-query';
import { DehydratedState } from 'react-query/hydration';
import { TRPCContextState } from './internals/context';
export declare type OutputWithCursor<TData, TCursor extends any = any> = {
    cursor: TCursor | null;
    data: TData;
};
export interface TRPCUseQueryBaseOptions extends TRPCRequestOptions {
    /**
     * Opt out of SSR for this query by passing `ssr: false`
     */
    ssr?: boolean;
}
export interface UseTRPCQueryOptions<TInput, TError, TOutput> extends UseQueryOptions<TInput, TError, TOutput, QueryKey>, TRPCUseQueryBaseOptions {
}
export interface UseTRPCInfiniteQueryOptions<TInput = unknown, TError = unknown, TOutput = TInput> extends UseInfiniteQueryOptions<TInput, TError, TOutput, TOutput, QueryKey>, TRPCUseQueryBaseOptions {
}
export interface UseTRPCMutationOptions<TInput, TError, TOutput> extends UseMutationOptions<TOutput, TError, TInput>, TRPCUseQueryBaseOptions {
}
export declare function createReactQueryHooks<TRouter extends AnyRouter>(): {
    Provider: ({ client, queryClient, children, isPrepass, }: {
        queryClient: QueryClient;
        client: TRPCClient<TRouter>;
        children: ReactNode;
        isPrepass?: boolean | undefined;
    }) => JSX.Element;
    createClient: (opts: CreateTRPCClientOptions<TRouter>) => import("packages/client/src/internals/TRPCClient").TRPCClient<TRouter>;
    useContext: () => TRPCContextState<TRouter>;
    useQuery: <TPath extends keyof TRouter["_def"]["queries"] & string, TProcedure extends TRouter["_def"]["queries"][TPath], TOutput extends import("@trpc/server").ThenArg<ReturnType<TProcedure["call"]>>>(pathAndInput: [path: TPath, ...args: inferHandlerInput<TProcedure>], opts?: UseTRPCQueryOptions<inferProcedureInput<TRouter["_def"]["queries"][TPath]>, TRPCClientError<TRouter, ReturnType<TRouter["getErrorShape"]>>, TOutput> | undefined) => UseQueryResult<TOutput, TRPCClientError<TRouter, ReturnType<TRouter["getErrorShape"]>>>;
    useMutation: <TPath_1 extends keyof TRouter["_def"]["mutations"] & string, TInput extends inferProcedureInput<TRouter["_def"]["mutations"][TPath_1]>, TOutput_1 extends import("@trpc/server").ThenArg<ReturnType<TRouter["_def"]["mutations"][TPath_1]["call"]>>>(path: TPath_1, opts?: UseTRPCMutationOptions<TInput, TRPCClientError<TRouter, ReturnType<TRouter["getErrorShape"]>>, TOutput_1> | undefined) => import("react-query").UseMutationResult<TOutput_1, TRPCClientError<TRouter, ReturnType<TRouter["getErrorShape"]>>, TInput, unknown>;
    useSubscription: <TPath_2 extends keyof TRouter["_def"]["subscriptions"] & string, TOutput_2 extends ReturnType<import("@trpc/server").ThenArg<ReturnType<TRouter["_def"]["subscriptions"][TPath_2]["call"]>>["output"]>>(pathAndInput: [path: TPath_2, ...args: inferHandlerInput<TRouter["_def"]["subscriptions"][TPath_2]>], opts: {
        enabled?: boolean | undefined;
        onError?: ((err: TRPCClientError<TRouter, ReturnType<TRouter["getErrorShape"]>>) => void) | undefined;
        onNext: (data: TOutput_2) => void;
    }) => void;
    useDehydratedState: (client: TRPCClient<TRouter>, trpcState: DehydratedState | undefined) => DehydratedState | undefined;
    useInfiniteQuery: <TPath_3 extends keyof TRouter["_def"]["queries"] & string, TInput_1 extends inferProcedureInput<TRouter["_def"]["queries"][TPath_3]> & {
        cursor: TCursor;
    }, TOutput_3 extends import("@trpc/server").ThenArg<ReturnType<TRouter["_def"]["queries"][TPath_3]["call"]>>, TCursor extends unknown>(pathAndInput: [TPath_3, Omit<TInput_1, "cursor">], opts?: UseTRPCInfiniteQueryOptions<TOutput_3, TRPCClientError<TRouter, ReturnType<TRouter["getErrorShape"]>>, TOutput_3> | undefined) => import("react-query").UseInfiniteQueryResult<TOutput_3, TRPCClientError<TRouter, ReturnType<TRouter["getErrorShape"]>>>;
};
