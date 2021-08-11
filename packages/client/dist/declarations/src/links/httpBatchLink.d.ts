import { AnyRouter } from '@trpc/server';
import { HttpLinkOptions, TRPCLink } from './core';
export declare function httpBatchLink<TRouter extends AnyRouter>(opts: HttpLinkOptions): TRPCLink<TRouter>;
