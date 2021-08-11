import { AnyRouter } from '@trpc/server';
import { Operation, OperationResponse, TRPCLink } from './core';
declare type ConsoleEsque = {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
declare type EnableFnOptions<TRouter extends AnyRouter> = (Operation & {
    direction: 'up';
}) | {
    direction: 'down';
    result: OperationResponse<TRouter>;
};
declare type EnabledFn<TRouter extends AnyRouter> = (opts: EnableFnOptions<TRouter>) => boolean;
declare type LogFnOptions<TRouter extends AnyRouter> = Operation & ({
    /**
     * Request was just initialized
     */
    direction: 'up';
} | {
    /**
     * Request result
     */
    direction: 'down';
    result: OperationResponse<TRouter>;
    elapsedMs: number;
});
declare type LogFn<TRouter extends AnyRouter> = (opts: LogFnOptions<TRouter>) => void;
declare type LoggerLinkOptions<TRouter extends AnyRouter> = {
    logger?: LogFn<TRouter>;
    enabled?: EnabledFn<TRouter>;
    /**
     * Used in the built-in defaultLogger
     */
    console?: ConsoleEsque;
};
export declare function loggerLink<TRouter extends AnyRouter = AnyRouter>(opts?: LoggerLinkOptions<TRouter>): TRPCLink<TRouter>;
export {};