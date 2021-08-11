import { AnyRouter, ProcedureType } from '../router';
import { Subscription } from '../subscription';
export declare function callProcedure<TRouter extends AnyRouter<TContext>, TContext>(opts: {
    path: string;
    input: unknown;
    router: TRouter;
    ctx: TContext;
    type: ProcedureType;
}): Promise<unknown | Subscription<TRouter>>;
