import { ProcedureType } from '@trpc/server';
import { TRPCResponse } from '@trpc/server/rpc';
import { LinkRuntimeOptions, PromiseAndCancel } from '../links/core';
export declare function httpRequest<TResponseShape = TRPCResponse>(props: {
    runtime: LinkRuntimeOptions;
    type: ProcedureType;
    path: string;
    url: string;
} & ({
    inputs: unknown[];
} | {
    input: unknown;
})): PromiseAndCancel<TResponseShape>;
