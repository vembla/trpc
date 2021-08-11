'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../../dist/index-e4015f05.cjs.dev.js');
require('../../../dist/router-25f07e2e.cjs.dev.js');
require('events');
require('http');
require('url');
var callProcedure = require('../../../dist/callProcedure-ae40050c.cjs.dev.js');
require('../../../dist/codes-ae6b5aa8.cjs.dev.js');

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
        error: new callProcedure.TRPCError({
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

    await index.requestHandler({ ...opts,
      req,
      res,
      path
    });
  };
}

exports.createNextApiHandler = createNextApiHandler;
