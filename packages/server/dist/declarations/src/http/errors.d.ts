import { TRPCError } from '../TRPCError';
/**
 * @deprecated
 */
export declare const httpError: {
    /**
     * @deprecated use `new TRPCError({ code: 'FORBIDDEN', message: '... })`
     */
    forbidden: (message?: string | undefined) => TRPCError;
    /**
     * @deprecated use `new TRPCError({ code: 'UNAUTHORIZED', message: '... })`
     */
    unauthorized: (message?: string | undefined) => TRPCError;
    /**
     * @deprecated use `new TRPCError({ code: 'BAD_REQUEST', message: '... })`
     */
    badRequest: (message?: string | undefined) => TRPCError;
    /**
     * @deprecated use `new TRPCError({ code: 'METHOD_NOT_FOUND', message: '... })`
     */
    notFound: (message?: string | undefined) => TRPCError;
};
