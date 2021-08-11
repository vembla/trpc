import { AnyRouter } from '@trpc/server';
import { HttpLinkOptions, TRPCLink } from './core';
export declare function httpLink<TRouter extends AnyRouter>(opts: HttpLinkOptions): TRPCLink<TRouter>;
