import { AnyRouter, inferRouterContext } from '../router';
import { BaseRequest, BaseResponse, BaseHandlerOptions } from '../internals/BaseHandlerOptions';
export declare type CreateContextFnOptions<TRequest, TResponse> = {
    req: TRequest;
    res: TResponse;
};
export declare type CreateContextFn<TRouter extends AnyRouter, TRequest, TResponse> = (opts: CreateContextFnOptions<TRequest, TResponse>) => inferRouterContext<TRouter> | Promise<inferRouterContext<TRouter>>;
export declare function requestHandler<TRouter extends AnyRouter, TCreateContextFn extends CreateContextFn<TRouter, TRequest, TResponse>, TRequest extends BaseRequest, TResponse extends BaseResponse>(opts: {
    req: TRequest;
    res: TResponse;
    path: string;
    createContext: TCreateContextFn;
} & BaseHandlerOptions<TRouter, TRequest>): Promise<void>;
