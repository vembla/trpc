import { TRPCResponse } from '@trpc/server/rpc';
import { TRPCClientError } from '../TRPCClientError';
import { LinkRuntimeOptions } from '../links/core';
export declare function transformRPCResponse({ envelope, runtime, }: {
    envelope: TRPCResponse;
    runtime: LinkRuntimeOptions;
}): {
    type: "started";
} | {
    type: "stopped";
} | TRPCClientError<import("@trpc/server").AnyRouter<any>, any> | {
    data: any;
    type: "data";
};
