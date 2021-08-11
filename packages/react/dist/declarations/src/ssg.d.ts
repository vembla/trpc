import { AnyRouter, ClientDataTransformerOptions, inferHandlerInput, inferRouterContext } from '@trpc/server';
import { InfiniteData, QueryClient } from 'react-query';
import { DehydratedState, DehydrateOptions } from 'react-query/hydration';
declare type QueryClientConfig = ConstructorParameters<typeof QueryClient>[0];
export interface CreateSSGHelpersOptions<TRouter extends AnyRouter> {
    router: TRouter;
    ctx: inferRouterContext<TRouter>;
    transformer?: ClientDataTransformerOptions;
    queryClientConfig?: QueryClientConfig;
}
/**
 * Create functions you can use for server-side rendering / static generation
 */
export declare function createSSGHelpers<TRouter extends AnyRouter>({ router, transformer, ctx, queryClientConfig, }: CreateSSGHelpersOptions<TRouter>): {
    prefetchQuery: <TPath extends keyof TRouter["_def"]["queries"] & string, TProcedure extends TRouter["_def"]["queries"][TPath]>(path: TPath, ...args: inferHandlerInput<TProcedure>) => Promise<void>;
    prefetchInfiniteQuery: <TPath_1 extends keyof TRouter["_def"]["queries"] & string, TProcedure_1 extends TRouter["_def"]["queries"][TPath_1]>(path: TPath_1, ...args: inferHandlerInput<TProcedure_1>) => Promise<void>;
    fetchQuery: <TPath_2 extends keyof TRouter["_def"]["queries"] & string, TProcedure_2 extends TRouter["_def"]["queries"][TPath_2], TOutput extends import("@trpc/server").ThenArg<ReturnType<TProcedure_2["call"]>>>(path: TPath_2, ...args: inferHandlerInput<TProcedure_2>) => Promise<TOutput>;
    fetchInfiniteQuery: <TPath_3 extends keyof TRouter["_def"]["queries"] & string, TProcedure_3 extends TRouter["_def"]["queries"][TPath_3], TOutput_1 extends import("@trpc/server").ThenArg<ReturnType<TProcedure_3["call"]>>>(path: TPath_3, ...args: inferHandlerInput<TProcedure_3>) => Promise<InfiniteData<TOutput_1>>;
    dehydrate: (opts?: DehydrateOptions) => DehydratedState;
    queryClient: QueryClient;
};
export {};