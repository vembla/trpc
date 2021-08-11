/**
 * JSON-RPC 2.0 Error codes
 *
 * `-32000` to `-32099` are reserved for implementation-defined server-errors.
 * For tRPC we're copying the last digits of HTTP 4XX errors.
 */
export declare const TRPC_ERROR_CODES_BY_KEY: {
    /**
     * Invalid JSON was received by the server.
     * An error occurred on the server while parsing the JSON text.
     */
    readonly PARSE_ERROR: -32700;
    /**
     * The JSON sent is not a valid Request object.
     */
    readonly BAD_REQUEST: -32600;
    /**
     * The method does not exist / is not available.
     */
    readonly METHOD_NOT_FOUND: -32601;
    /**
     * Internal JSON-RPC error.
     */
    readonly INTERNAL_SERVER_ERROR: -32603;
    readonly UNAUTHORIZED: -32001;
    readonly FORBIDDEN: -32003;
    readonly PATH_NOT_FOUND: -32004;
    readonly METHOD_NOT_SUPPORTED: -32005;
    readonly TIMEOUT: -32008;
    readonly PAYLOAD_TOO_LARGE: -32013;
    readonly CLIENT_CLOSED_REQUEST: -32099;
};
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
export declare type TRPC_ERROR_CODE_KEY = keyof typeof TRPC_ERROR_CODES_BY_KEY;
export {};
