import { TRPC_ERROR_CODE_KEY } from './rpc/codes';
export declare class TRPCError extends Error {
    readonly originalError?: unknown;
    readonly code: "INTERNAL_SERVER_ERROR" | "PARSE_ERROR" | "BAD_REQUEST" | "METHOD_NOT_FOUND" | "UNAUTHORIZED" | "FORBIDDEN" | "PATH_NOT_FOUND" | "METHOD_NOT_SUPPORTED" | "TIMEOUT" | "PAYLOAD_TOO_LARGE" | "CLIENT_CLOSED_REQUEST";
    constructor({ message, code, originalError, }: {
        message?: string;
        code: TRPC_ERROR_CODE_KEY;
        originalError?: unknown;
    });
}
