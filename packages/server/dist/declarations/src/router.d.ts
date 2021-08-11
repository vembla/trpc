import { TRPCError } from './TRPCError';
import { CreateProcedureWithInput, CreateProcedureWithoutInput, inferProcedureFromOptions, Procedure, ProcedureWithInput } from './procedure';
import { TRPCErrorShape, TRPC_ERROR_CODE_KEY, TRPC_ERROR_CODE_NUMBER } from './rpc';
import { Subscription } from './subscription';
import { CombinedDataTransformer, DataTransformerOptions } from './transformer';
import { flatten, Prefixer, ThenArg } from './types';
export declare type ProcedureType = 'query' | 'mutation' | 'subscription';
export declare type ProcedureRecord<TContext = any, TInput = any, TOutput = any> = Record<string, Procedure<TContext, TInput, TOutput>>;
export declare type inferProcedureInput<TProcedure extends Procedure<any, any, any>> = TProcedure extends ProcedureWithInput<any, infer Input, any> ? Input : undefined;
export declare type inferAsyncReturnType<TFunction extends (...args: any) => any> = ThenArg<ReturnType<TFunction>>;
export declare type inferProcedureOutput<TProcedure extends Procedure> = inferAsyncReturnType<TProcedure['call']>;
export declare type inferSubscriptionOutput<TRouter extends AnyRouter, TPath extends keyof TRouter['_def']['subscriptions']> = ReturnType<inferAsyncReturnType<TRouter['_def']['subscriptions'][TPath]['call']>['output']>;
export declare type inferHandlerInput<TProcedure extends Procedure> = TProcedure extends ProcedureWithInput<any, infer TInput, any> ? undefined extends TInput ? unknown extends TInput ? [(null | undefined)?] : [(TInput | null | undefined)?] : [TInput] : [(undefined | null)?];
declare type inferHandlerFn<TProcedures extends ProcedureRecord> = <TProcedure extends TProcedures[TPath], TPath extends keyof TProcedures & string>(path: TPath, ...args: inferHandlerInput<TProcedure>) => Promise<inferProcedureOutput<TProcedures[TPath]>>;
export declare type inferRouterContext<TRouter extends AnyRouter> = Parameters<TRouter['createCaller']>[0];
export declare type AnyRouter<TContext = any> = Router<TContext, any, any, any, any>;
export declare type inferRouterError<TRouter extends AnyRouter> = ReturnType<TRouter['getErrorShape']>;
export declare type ErrorFormatter<TContext, TOutput extends TRPCErrorShape<number, unknown>> = ({ error, }: {
    error: TRPCError;
    type: ProcedureType | 'unknown';
    path: string | undefined;
    input: unknown;
    ctx: undefined | TContext;
    shape: DefaultErrorShape;
}) => TOutput;
interface DefaultErrorData {
    code: TRPC_ERROR_CODE_KEY;
    path?: string;
    stack?: string;
}
export interface DefaultErrorShape extends TRPCErrorShape<TRPC_ERROR_CODE_NUMBER, DefaultErrorData> {
    message: string;
    code: TRPC_ERROR_CODE_NUMBER;
}
export declare type MiddlewareFunction<TContext> = (opts: {
    ctx: TContext;
    type: ProcedureType;
    path: string;
}) => Promise<void> | void;
export declare class Router<TContext, TQueries extends ProcedureRecord<TContext>, TMutations extends ProcedureRecord<TContext>, TSubscriptions extends ProcedureRecord<TContext, unknown, Subscription<unknown>>, TErrorShape extends TRPCErrorShape<number, unknown>> {
    readonly _def: Readonly<{
        queries: Readonly<TQueries>;
        mutations: Readonly<TMutations>;
        subscriptions: Readonly<TSubscriptions>;
        middlewares: MiddlewareFunction<TContext>[];
        errorFormatter: ErrorFormatter<TContext, TErrorShape>;
        transformer: CombinedDataTransformer;
    }>;
    constructor(def?: {
        queries?: TQueries;
        mutations?: TMutations;
        subscriptions?: TSubscriptions;
        middlewares?: MiddlewareFunction<TContext>[];
        errorFormatter?: ErrorFormatter<TContext, TErrorShape>;
        transformer?: CombinedDataTransformer;
    });
    private static prefixProcedures;
    query<TPath extends string, TInput, TOutput>(path: TPath, procedure: CreateProcedureWithInput<TContext, TInput, TOutput>): Router<TContext, flatten<TQueries, Record<TPath, inferProcedureFromOptions<typeof procedure>>>, TMutations, TSubscriptions, TErrorShape>;
    query<TPath extends string, TOutput>(path: TPath, procedure: CreateProcedureWithoutInput<TContext, TOutput>): Router<TContext, flatten<TQueries, Record<TPath, inferProcedureFromOptions<typeof procedure>>>, TMutations, TSubscriptions, TErrorShape>;
    mutation<TPath extends string, TInput, TOutput>(path: TPath, procedure: CreateProcedureWithInput<TContext, TInput, TOutput>): Router<TContext, TQueries, flatten<TMutations, Record<TPath, inferProcedureFromOptions<typeof procedure>>>, TSubscriptions, TErrorShape>;
    mutation<TPath extends string, TOutput>(path: TPath, procedure: CreateProcedureWithoutInput<TContext, TOutput>): Router<TContext, TQueries, flatten<TMutations, Record<TPath, inferProcedureFromOptions<typeof procedure>>>, TSubscriptions, TErrorShape>;
    /**
     * ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
     *  **Experimental.** API might change without major version bump
     * ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠
     */
    subscription<TPath extends string, TInput, TOutput extends Subscription<unknown>>(path: TPath, procedure: CreateProcedureWithInput<TContext, TInput, TOutput>): Router<TContext, TQueries, TMutations, TSubscriptions & Record<TPath, inferProcedureFromOptions<typeof procedure>>, TErrorShape>;
    /**
     * ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
     *  **Experimental.** API might change without major version bump
     * ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠
     */
    subscription<TPath extends string, TOutput extends Subscription<unknown>>(path: TPath, procedure: CreateProcedureWithoutInput<TContext, TOutput>): Router<TContext, TQueries, TMutations, TSubscriptions & Record<TPath, inferProcedureFromOptions<typeof procedure>>, TErrorShape>;
    /**
     * Merge router with other router
     * @param router
     */
    merge<TChildRouter extends AnyRouter<TContext>>(router: TChildRouter): Router<TContext, flatten<TQueries, TChildRouter['_def']['queries']>, flatten<TMutations, TChildRouter['_def']['mutations']>, flatten<TSubscriptions, TChildRouter['_def']['subscriptions']>, TErrorShape>;
    /**
     * Merge router with other router
     * @param prefix Prefix that this router should live under
     * @param router
     */
    merge<TPath extends string, TChildRouter extends AnyRouter<TContext>>(prefix: TPath, router: TChildRouter): Router<TContext, flatten<TQueries, Prefixer<TChildRouter['_def']['queries'], `${TPath}`>>, flatten<TMutations, Prefixer<TChildRouter['_def']['mutations'], `${TPath}`>>, flatten<TSubscriptions, Prefixer<TChildRouter['_def']['subscriptions'], `${TPath}`>>, TErrorShape>;
    /**
     * Invoke procedure. Only for internal use within library.
     */
    private invoke;
    createCaller(ctx: TContext): {
        query: inferHandlerFn<TQueries>;
        mutation: inferHandlerFn<TMutations>;
        subscription: inferHandlerFn<TSubscriptions>;
    };
    /**
     * Function to be called before any procedure is invoked
     * Can be async or sync
     * @link https://trpc.io/docs/middlewares
     */
    middleware(middleware: MiddlewareFunction<TContext>): Router<TContext, TQueries, TMutations, TSubscriptions, TErrorShape>;
    /**
     * Format errors
     * @link https://trpc.io/docs/error-formatting
     */
    formatError<TErrorFormatter extends ErrorFormatter<TContext, any>>(errorFormatter: TErrorFormatter): Router<TContext, TQueries, TMutations, TSubscriptions, ReturnType<TErrorFormatter>>;
    getErrorShape(opts: {
        error: TRPCError;
        type: ProcedureType | 'unknown';
        path: string | undefined;
        input: unknown;
        ctx: undefined | TContext;
    }): TErrorShape;
    /**
     * Add data transformer to serialize/deserialize input args + output
     * @link https://trpc.io/docs/data-transformers
     */
    transformer(_transformer: DataTransformerOptions): Router<TContext, TQueries, TMutations, TSubscriptions, TErrorShape>;
}
export declare function router<TContext>(): Router<TContext, {}, {}, {}, DefaultErrorShape>;
export {};
