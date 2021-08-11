'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../../dist/index-11521c2d.cjs.prod.js');
require('url');
require('../../../dist/callProcedure-2adb03c7.cjs.prod.js');
require('../../../dist/codes-573d1c50.cjs.prod.js');

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
