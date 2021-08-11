/// <reference types="node" />
import { EventEmitter } from 'events';
interface SubscriptionEvents<TOutput> {
    data: (data: TOutput) => void;
    destroy: () => void;
    error: (error: Error) => void;
}
declare interface SubscriptionEventEmitter<TOutput> {
    on<U extends keyof SubscriptionEvents<TOutput>>(event: U, listener: SubscriptionEvents<TOutput>[U]): this;
    once<U extends keyof SubscriptionEvents<TOutput>>(event: U, listener: SubscriptionEvents<TOutput>[U]): this;
    emit<U extends keyof SubscriptionEvents<TOutput>>(event: U, ...args: Parameters<SubscriptionEvents<TOutput>[U]>): boolean;
}
declare class SubscriptionEventEmitter<TOutput> extends EventEmitter {
}
declare type UnsubscribeFn = () => void;
declare type EmitFn<TOutput> = (data: TOutput) => void;
export declare type SubscriptionEmit<TOutput> = {
    data: EmitFn<TOutput>;
    error: EmitFn<Error>;
};
export declare type SubscriptionCallback<TOutput> = (emit: SubscriptionEmit<TOutput>) => UnsubscribeFn | Promise<UnsubscribeFn>;
export declare class Subscription<TOutput = unknown> {
    private readonly events;
    private callback;
    private isDestroyed;
    constructor(callback: SubscriptionCallback<TOutput>);
    destroy(): void;
    start(): Promise<void>;
    /**
     * @deprecated This method is just here to help with `inferSubscriptionOutput` which I can't get working without it
     */
    output(): TOutput;
    /**
     * Emit data
     */
    emitOutput(data: TOutput): void;
    /**
     * Emit error
     */
    emitError(err: Error): void;
    on(...args: Parameters<SubscriptionEventEmitter<TOutput>['on']>): SubscriptionEventEmitter<TOutput>;
    off(...args: Parameters<SubscriptionEventEmitter<TOutput>['off']>): SubscriptionEventEmitter<TOutput>;
}
export declare function subscriptionPullFactory<TOutput>(opts: {
    /**
     * The interval of how often the function should run
     */
    intervalMs: number;
    pull(emit: SubscriptionEmit<TOutput>): void | Promise<void>;
}): Subscription<TOutput>;
export {};
