import { MiddlewareFunction, ProcedureType } from './router';
export declare type ProcedureInputParserZodEsque<TInput = unknown> = {
    parse: (input: any) => TInput;
};
export declare type ProcedureInputParserCustomValidatorEsque<TInput = unknown> = (input: unknown) => TInput;
export declare type ProcedureInputParserYupEsque<TInput = unknown> = {
    validateSync: (input: unknown) => TInput;
};
export declare type ProcedureInputParser<TInput = unknown> = ProcedureInputParserZodEsque<TInput> | ProcedureInputParserYupEsque<TInput> | ProcedureInputParserCustomValidatorEsque<TInput>;
export declare type ProcedureResolver<TContext = unknown, TInput = unknown, TOutput = unknown> = (opts: {
    ctx: TContext;
    input: TInput;
    type: ProcedureType;
}) => Promise<TOutput> | TOutput;
interface ProcedureOptions<TContext, TInput, TOutput> {
    middlewares: MiddlewareFunction<TContext>[];
    resolver: ProcedureResolver<TContext, TInput, TOutput>;
    inputParser: ProcedureInputParser<TInput>;
}
export interface ProcedureCallOptions<TContext> {
    ctx: TContext;
    input: unknown;
    path: string;
    type: ProcedureType;
}
export declare abstract class Procedure<TContext = unknown, TInput = unknown, TOutput = unknown> {
    private middlewares;
    private resolver;
    private readonly inputParser;
    private parse;
    constructor(opts: ProcedureOptions<TContext, TInput, TOutput>);
    private parseInput;
    /**
     * Trigger middlewares in order, parse raw input & call resolver
     */
    call({ ctx, input: rawInput, type, path, }: ProcedureCallOptions<TContext>): Promise<TOutput>;
    /**
     * Create new procedure with passed middlewares
     * @param middlewares
     */
    inheritMiddlewares(middlewares: MiddlewareFunction<TContext>[]): this;
}
export declare class ProcedureWithoutInput<TContext, TOutput> extends Procedure<TContext, undefined, TOutput> {
}
export declare class ProcedureWithInput<TContext, TInput, TOutput> extends Procedure<TContext, TInput, TOutput> {
}
export declare type CreateProcedureWithInput<TContext, TInput, TOutput> = {
    input: ProcedureInputParser<TInput>;
    resolve: ProcedureResolver<TContext, TInput, TOutput>;
};
export declare type CreateProcedureWithoutInput<TContext, TOutput> = {
    resolve: ProcedureResolver<TContext, undefined, TOutput>;
};
export declare type CreateProcedureOptions<TContext = unknown, TInput = unknown, TOutput = unknown> = CreateProcedureWithInput<TContext, TInput, TOutput> | CreateProcedureWithoutInput<TContext, TOutput>;
export declare function createProcedure<TContext, TInput, TOutput>(opts: CreateProcedureWithInput<TContext, TInput, TOutput>): ProcedureWithInput<TContext, TInput, TOutput>;
export declare function createProcedure<TContext, TOutput>(opts: CreateProcedureWithoutInput<TContext, TOutput>): ProcedureWithoutInput<TContext, TOutput>;
export declare function createProcedure<TContext, TInput, TOutput>(opts: CreateProcedureOptions<TContext, TInput, TOutput>): Procedure<TContext, TInput, TOutput>;
export declare type inferProcedureFromOptions<TOptions extends CreateProcedureOptions<any, any, any>> = TOptions extends CreateProcedureWithInput<infer TContext, infer TInput, infer TOutput> ? ProcedureWithInput<TContext, TInput, TOutput> : TOptions extends CreateProcedureWithoutInput<infer TContext, infer TOutput> ? ProcedureWithoutInput<TContext, TOutput> : Procedure<unknown, unknown>;
export {};
