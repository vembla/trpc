import { TRPCResponse, TRPC_ERROR_CODES_BY_KEY } from '../../rpc';
import { CombinedDataTransformer } from '../../transformer';
export declare const TRPC_ERROR_CODES_BY_NUMBER: {
    [-32700]: "PARSE_ERROR";
    [-32600]: "BAD_REQUEST";
    [-32601]: "METHOD_NOT_FOUND";
    [-32603]: "INTERNAL_SERVER_ERROR";
    [-32001]: "UNAUTHORIZED";
    [-32003]: "FORBIDDEN";
    [-32004]: "PATH_NOT_FOUND";
    [-32005]: "METHOD_NOT_SUPPORTED";
    [-32008]: "TIMEOUT";
    [-32013]: "PAYLOAD_TOO_LARGE";
    [-32099]: "CLIENT_CLOSED_REQUEST";
};
declare type ValueOf<T> = T[keyof T];
export declare type TRPC_ERROR_CODE_NUMBER = ValueOf<typeof TRPC_ERROR_CODES_BY_KEY>;
export declare function getHTTPStatusCode(json: TRPCResponse | TRPCResponse[], transformer: CombinedDataTransformer): number;
export {};
