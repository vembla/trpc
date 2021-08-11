'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./index-11521c2d.cjs.prod.js');
var router = require('./router-704c3208.cjs.prod.js');
var subscription = require('./subscription-1c0cb2b8.cjs.prod.js');
var http = require('http');
var url = require('url');
var callProcedure = require('./callProcedure-2adb03c7.cjs.prod.js');
require('./codes-573d1c50.cjs.prod.js');
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
