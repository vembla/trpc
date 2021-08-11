import type { AnyRouter } from '@trpc/server';
import { CreateTRPCClientOptions, TRPCClient as Client } from './internals/TRPCClient';
export declare function createTRPCClient<TRouter extends AnyRouter>(opts: CreateTRPCClientOptions<TRouter>): Client<TRouter>;
export type { CreateTRPCClientOptions } from './internals/TRPCClient';
export declare type TRPCClient<TRouter extends AnyRouter> = Client<TRouter>;
export type { TRPCRequestOptions } from './internals/TRPCClient';
