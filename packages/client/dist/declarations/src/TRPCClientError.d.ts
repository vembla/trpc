import { AnyRouter, Maybe } from '@trpc/server';
import { TRPCErrorShape, TRPCErrorResponse } from '@trpc/server/rpc';
export declare class TRPCClientError<TRouter extends AnyRouter, TErrorShape extends TRPCErrorShape = ReturnType<TRouter['getErrorShape']>> extends Error {
    readonly originalError: Maybe<Error>;
    readonly shape: Maybe<TErrorShape>;
    /**
     * Fatal error - expect no more results after this error
     * Used for when WebSockets disconnect prematurely.
     */
    readonly isDone: boolean;
    constructor(message: string, { originalError, isDone, result, }: {
        result: Maybe<TRPCErrorResponse<TErrorShape>>;
        originalError: Maybe<Error>;
        isDone?: boolean;
    });
    static from<TRouter extends AnyRouter>(result: Error | TRPCErrorResponse<any>, opts?: {
        isDone?: boolean;
    }): TRPCClientError<TRouter>;
}
