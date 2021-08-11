import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { CreateContextFn, CreateContextFnOptions } from '../';
import { BaseHandlerOptions } from '../internals/BaseHandlerOptions';
import { AnyRouter } from '../router';
export declare type CreateNextContextOptions = CreateContextFnOptions<NextApiRequest, NextApiResponse>;
export declare type CreateNextContextFn<TRouter extends AnyRouter> = CreateContextFn<TRouter, NextApiRequest, NextApiResponse>;
export declare function createNextApiHandler<TRouter extends AnyRouter>(opts: {
    createContext: CreateNextContextFn<TRouter>;
} & BaseHandlerOptions<TRouter, NextApiRequest>): NextApiHandler;
