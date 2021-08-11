/// <reference types="node" />
import http from 'http';
import ws from 'ws';
import { CreateContextFn } from '../http';
import { BaseHandlerOptions } from '../internals/BaseHandlerOptions';
import { AnyRouter } from '../router';
/**
 * Web socket server handler
 */
export declare type WSSHandlerOptions<TRouter extends AnyRouter> = {
    wss: ws.Server;
    createContext: CreateContextFn<TRouter, http.IncomingMessage, ws>;
    process?: NodeJS.Process;
} & BaseHandlerOptions<TRouter, http.IncomingMessage>;
export declare function applyWSSHandler<TRouter extends AnyRouter>(opts: WSSHandlerOptions<TRouter>): {
    broadcastReconnectNotification: () => void;
};
