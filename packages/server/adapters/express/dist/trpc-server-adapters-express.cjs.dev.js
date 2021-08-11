'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../../dist/index-e4015f05.cjs.dev.js');
require('url');
require('../../../dist/callProcedure-ae40050c.cjs.dev.js');
require('../../../dist/codes-ae6b5aa8.cjs.dev.js');

/* eslint-disable @typescript-eslint/no-explicit-any */
function createExpressMiddleware(opts) {
  return (req, res) => {
    const endpoint = req.path.substr(1);
    index.requestHandler({ ...opts,
      req,
      res,
      path: endpoint
    });
  };
}

exports.createExpressMiddleware = createExpressMiddleware;
