import { AnyRouter, ProcedureType } from '@trpc/server';
import { TRPCResult } from '@trpc/server/rpc';
import { TRPCErrorResponse } from '@trpc/server/rpc';
import { ObservableCallbacks, UnsubscribeFn } from '../internals/observable';
import { retryDelay } from '../internals/retryDelay';
import { TRPCClientError } from '../TRPCClientError';
import { TRPCLink } from './core';
declare type Operation = {
    id: number | string;
    type: ProcedureType;
    input: unknown;
    path: string;
};
export interface WebSocketClientOptions {
    url: string;
    WebSocket?: WebSocket;
    retryDelayMs?: typeof retryDelay;
}
export declare function createWSClient(opts: WebSocketClientOptions): {
    close: () => void;
    request: (op: Operation, callbacks: ObservableCallbacks<TRPCResult<unknown>, TRPCClientError<AnyRouter<any>, any> | TRPCErrorResponse<import("@trpc/server/rpc").TRPCErrorShape<import("@trpc/server/rpc").TRPC_ERROR_CODE_NUMBER, never>>>) => UnsubscribeFn;
    getConnection(): WebSocket;
};
export declare type TRPCWebSocketClient = ReturnType<typeof createWSClient>;
export interface WebSocketLinkOptions {
    client: TRPCWebSocketClient;
}
export declare function wsLink<TRouter extends AnyRouter>(opts: WebSocketLinkOptions): TRPCLink<TRouter>;
export {};
