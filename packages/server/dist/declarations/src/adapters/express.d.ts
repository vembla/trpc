import type * as express from 'express';
import { CreateContextFn, CreateContextFnOptions } from '../http';
import { BaseHandlerOptions } from '../internals/BaseHandlerOptions';
import { AnyRouter } from '../router';
export declare type CreateExpressContextOptions = CreateContextFnOptions<express.Request, express.Response>;
export declare type CreateExpressContextFn<TRouter extends AnyRouter> = CreateContextFn<TRouter, express.Request, express.Response>;
export declare function createExpressMiddleware<TRouter extends AnyRouter>(opts: {
    createContext: CreateExpressContextFn<TRouter>;
} & BaseHandlerOptions<TRouter, express.Request>): express.Handler;
