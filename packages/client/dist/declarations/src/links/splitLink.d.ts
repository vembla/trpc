import { AnyRouter } from '@trpc/server';
import { TRPCLink, Operation } from './core';
export declare function splitLink<TRouter extends AnyRouter = AnyRouter>(opts: {
    condition: (op: Operation) => boolean;
} & ({
    /**
     * The link to execute next if the test function returns `true`.
     */
    left: TRPCLink<TRouter>;
    /**
     * The link to execute next if the test function returns `false`.
     */
    right: TRPCLink<TRouter>;
} | {
    /**
     * The link to execute next if the test function returns `true`.
     */
    true: TRPCLink<TRouter>;
    /**
     * The link to execute next if the test function returns `false`.
     */
    false: TRPCLink<TRouter>;
})): TRPCLink<TRouter>;
