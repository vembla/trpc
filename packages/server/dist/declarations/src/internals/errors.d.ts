import { TRPCError } from '../TRPCError';
export declare function getMessageFromUnkownError(err: unknown, fallback: string): string;
export declare function getErrorFromUnknown(originalError: unknown): TRPCError;
