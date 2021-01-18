import express from 'express';
import { assertNotBrowser } from './assertNotBrowser';
import {
  httpError,
  HTTPErrorResponseEnvelope,
  HTTPSuccessResponseEnvelope,
} from './http';
import { Router } from './router';

assertNotBrowser();

export type CreateExpressContextOptions = {
  req: express.Request;
  res: express.Response;
};
export type CreateExpressContextFn<TContext> = (
  opts: CreateExpressContextOptions,
) => Promise<TContext> | TContext;

function getQueryArgs(req: express.Request) {
  let args: unknown[] = [];

  const queryArgs = req.query.args;
  if (!queryArgs) {
    return args;
  }
  if (typeof queryArgs !== 'string') {
    throw httpError.badRequest('Expected query.args to be a JSON string');
  }
  try {
    args = JSON.parse(queryArgs);
  } catch (err) {
    throw httpError.badRequest('Expected query.args to be a JSON string');
  }

  if (!Array.isArray(args)) {
    throw httpError.badRequest('Expected query.args to be a JSON-array');
  }
  return args;
}
export function createExpressMiddleware<
  TContext,
  TRouter extends Router<TContext>
>({
  router,
  createContext,
}: {
  router: TRouter;
  createContext: CreateExpressContextFn<TContext>;
}): express.Handler {
  return async (req, res) => {
    try {
      const endpoint = req.path.substr(1);
      const ctx = await createContext({ req, res });

      let data: unknown;
      if (req.method === 'POST') {
        const handle = router.createMutationHandler(ctx);
        const args = req.body.args ?? [];
        if (!Array.isArray(args)) {
          throw httpError.badRequest('Expected body.args to be an array');
        }

        data = await handle(endpoint as any, ...(args as any));
      } else if (req.method === 'GET') {
        const handle = router.createQueryHandler(ctx);
        const args = getQueryArgs(req);

        data = await handle(endpoint as any, ...(args as any));
      } else {
        throw httpError.badRequest(`Unexpected request method ${req.method}`);
      }

      const json: HTTPSuccessResponseEnvelope<unknown> = {
        ok: true,
        statusCode: res.statusCode ?? 200,
        data,
      };
      res.status(json.statusCode).json(json);
    } catch (err) {
      const statusCode: number =
        typeof err?.statusCode === 'number' ? err.statusCode : 500;
      const message: string =
        typeof err?.message === 'string'
          ? err.message
          : 'Internal Server Error';

      const stack: string | undefined =
        process.env.NODE_ENV !== 'production' && typeof err?.stack === 'string'
          ? err.stack
          : undefined;

      const json: HTTPErrorResponseEnvelope = {
        ok: false,
        statusCode,
        error: {
          message,
          stack,
        },
      };
      res.status(json.statusCode).json(json);
    }
  };
}