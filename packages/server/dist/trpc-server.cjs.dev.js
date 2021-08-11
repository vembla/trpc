'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./index-e4015f05.cjs.dev.js');
var router = require('./router-25f07e2e.cjs.dev.js');
var subscription = require('./subscription-90e5403f.cjs.dev.js');
var http = require('http');
var url = require('url');
var callProcedure = require('./callProcedure-ae40050c.cjs.dev.js');
require('./codes-ae6b5aa8.cjs.dev.js');
require('events');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var http__default = /*#__PURE__*/_interopDefault(http);
var url__default = /*#__PURE__*/_interopDefault(url);

/* istanbul ignore next */

/**
 * @deprecated
 */

const httpError = {
  /**
   * @deprecated use `new TRPCError({ code: 'FORBIDDEN', message: '... })`
   */
  forbidden: message => new callProcedure.TRPCError({
    message,
    code: 'FORBIDDEN'
  }),

  /**
   * @deprecated use `new TRPCError({ code: 'UNAUTHORIZED', message: '... })`
   */
  unauthorized: message => new callProcedure.TRPCError({
    message,
    code: 'UNAUTHORIZED'
  }),

  /**
   * @deprecated use `new TRPCError({ code: 'BAD_REQUEST', message: '... })`
   */
  badRequest: message => new callProcedure.TRPCError({
    message,
    code: 'BAD_REQUEST'
  }),

  /**
   * @deprecated use `new TRPCError({ code: 'METHOD_NOT_FOUND', message: '... })`
   */
  notFound: message => new callProcedure.TRPCError({
    message,
    code: 'PATH_NOT_FOUND'
  })
};

/* eslint-disable @typescript-eslint/no-non-null-assertion */
function createHttpHandler(opts) {
  return async (req, res) => {
    const endpoint = url__default['default'].parse(req.url).pathname.substr(1);
    await index.requestHandler({ ...opts,
      req,
      res,
      path: endpoint
    });
  };
}
function createHttpServer(opts) {
  const handler = createHttpHandler(opts);
  const server = http__default['default'].createServer((req, res) => handler(req, res));
  return {
    server,

    listen(port) {
      server.listen(port);
      const actualPort = port === 0 ? server.address().port : port;
      return {
        port: actualPort
      };
    }

  };
}

exports.assertNotBrowser = index.assertNotBrowser;
exports.requestHandler = index.requestHandler;
exports.Router = router.Router;
exports.router = router.router;
exports.Subscription = subscription.Subscription;
exports.subscriptionPullFactory = subscription.subscriptionPullFactory;
exports.TRPCError = callProcedure.TRPCError;
exports.createHttpHandler = createHttpHandler;
exports.createHttpServer = createHttpServer;
exports.httpError = httpError;
