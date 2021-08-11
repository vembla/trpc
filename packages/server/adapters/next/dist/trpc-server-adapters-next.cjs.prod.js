'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../../dist/index-11521c2d.cjs.prod.js');
require('../../../dist/router-704c3208.cjs.prod.js');
require('events');
require('http');
require('url');
var callProcedure = require('../../../dist/callProcedure-2adb03c7.cjs.prod.js');
require('../../../dist/codes-573d1c50.cjs.prod.js');

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
