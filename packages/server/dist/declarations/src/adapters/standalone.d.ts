/// <reference types="node" />
import http from 'http';
import { CreateContextFn, CreateContextFnOptions } from '../http';
import { BaseHandlerOptions } from '../internals/BaseHandlerOptions';
import { AnyRouter } from '../router';
export declare type CreateHttpContextOptions = CreateContextFnOptions<http.IncomingMessage, http.ServerResponse>;
export declare type CreateHttpContextFn<TRouter extends AnyRouter> = CreateContextFn<TRouter, http.IncomingMessage, http.ServerResponse>;
export interface CreateHttpHandlerOptions<TRouter extends AnyRouter> extends BaseHandlerOptions<TRouter, http.IncomingMessage> {
    createContext: CreateHttpContextFn<TRouter>;
}
export declare function createHttpHandler<TRouter extends AnyRouter>(opts: CreateHttpHandlerOptions<TRouter>): (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void>;
export declare function createHttpServer<TRouter extends AnyRouter>(opts: CreateHttpHandlerOptions<TRouter>): {
    server: http.Server;
    listen(port?: number | undefined): {
        port: number | undefined;
    };
};
