import { r as requestHandler } from '../../../dist/index-a273ce95.esm.js';
import '../../../dist/router-74aeea7f.esm.js';
import 'events';
import 'http';
import 'url';
import { T as TRPCError } from '../../../dist/callProcedure-94240708.esm.js';
import '../../../dist/codes-02fc3a5f.esm.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
function createNextApiHandler(opts) {
  return async (req, res) => {
    function getPath() {
      if (typeof req.query.trpc === 'string') {
        return req.query.trpc;
      }

      if (Array.isArray(req.query.trpc)) {
        return req.query.trpc.join('/');
      }

      return null;
    }

    const path = getPath();

    if (path === null) {
      const error = opts.router.getErrorShape({
        error: new TRPCError({
          message: 'Query "trpc" not found - is the file named `[trpc]`.ts or `[...trpc].ts`?',
          code: 'INTERNAL_SERVER_ERROR'
        }),
        type: 'unknown',
        ctx: undefined,
        path: undefined,
        input: undefined
      });
      const json = {
        id: -1,
        error
      };
      res.statusCode = 500;
      res.json(json);
      return;
    }

    await requestHandler({ ...opts,
      req,
      res,
      path
    });
  };
}

export { createNextApiHandler };
