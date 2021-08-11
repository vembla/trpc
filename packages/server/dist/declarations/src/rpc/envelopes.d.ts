import { ProcedureType } from '../router';
import { TRPC_ERROR_CODE_NUMBER } from './codes';
declare type JSONRPC2RequestId = number | string | null;
/**
 * All requests/responses extends this shape
 */
interface JSONRPC2BaseEnvelope {
    id: JSONRPC2RequestId;
    jsonrpc?: '2.0';
}
interface JSONRPC2BaseRequest<TMethod extends string = string> extends JSONRPC2BaseEnvelope {
    method: TMethod;
}
interface JSONRPC2Request<TMethod extends string = string, TParams = unknown> extends JSONRPC2BaseRequest<TMethod> {
    params: TParams;
}
interface JSONRPC2ResultResponse<TResult = unknown> extends JSONRPC2BaseEnvelope {
    result: TResult;
}
export interface TRPCErrorShape<TCode extends number = TRPC_ERROR_CODE_NUMBER, TData = never> {
    code: TCode;
    message: string;
    data: TData;
}
/**
 * The result data wrapped
 */
export declare type TRPCResult<TData = unknown> = {
    type: 'data';
    data: TData;
} | {
    type: 'started';
} | {
    type: 'stopped';
};
/**
 * Request envelope
 */
export declare type TRPCRequest = JSONRPC2Request<'subscription.stop'> | JSONRPC2Request<ProcedureType, {
    path: string;
    input: unknown;
}>;
/**
 * OK response
 */
export declare type TRPCResultResponse<TData = unknown> = JSONRPC2ResultResponse<TRPCResult<TData>>;
/**
 * Generic response wrapper that is either a result or error
 */
export declare type TRPCResponse<TData = unknown, TError extends TRPCErrorShape = TRPCErrorShape> = TRPCResultResponse<TData> | TRPCErrorResponse<TError>;
/**
 * Error response
 */
export interface TRPCErrorResponse<TError extends TRPCErrorShape = TRPCErrorShape> extends JSONRPC2BaseEnvelope {
    error: TError;
}
/**
 * The server asked the client to reconnect - useful when restarting/redeploying service
 */
export interface TRPCReconnectNotification extends JSONRPC2BaseRequest<'reconnect'> {
    id: null;
}
/**
 * The client's incoming request types
 */
export declare type TRPCClientIncomingRequest = TRPCReconnectNotification;
/**
 * The client's received messages shape
 */
export declare type TRPCClientIncomingMessage = TRPCResponse | TRPCClientIncomingRequest;
export {};