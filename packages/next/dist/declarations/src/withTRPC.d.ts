/**
 * Heavily based on urql's ssr
 * https://github.com/FormidableLabs/urql/blob/main/packages/next-urql/src/with-urql-client.ts
 */
import { CreateTRPCClientOptions } from '@trpc/react';
import type { AnyRouter } from '@trpc/server';
import type { NextComponentType, NextPageContext } from 'next/dist/next-server/lib/utils';
import { QueryClient } from 'react-query';
declare type QueryClientConfig = ConstructorParameters<typeof QueryClient>[0];
export declare type WithTRPCConfig<TRouter extends AnyRouter> = CreateTRPCClientOptions<TRouter> & {
    queryClientConfig?: QueryClientConfig;
};
export declare function withTRPC<TRouter extends AnyRouter>(opts: {
    config: (info: {
        ctx?: NextPageContext;
    }) => WithTRPCConfig<TRouter>;
    ssr?: boolean;
}): (AppOrPage: NextComponentType<any, any, any>) => NextComponentType;
export {};
